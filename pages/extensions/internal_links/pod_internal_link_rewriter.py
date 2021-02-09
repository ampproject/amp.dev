import os
import re
import traceback
from .component_version_resolver import ComponentVersionResolver
from grow.pods.pods import Pod
from grow.documents.document import Document
from grow.cache.object_cache import ObjectCache

# find all <a href without a : in the link and not ending with /
LINK_PATTERN = re.compile(r'<a\s+(?:[^>]+\s)?href\s*=\s*"((?:[^"#?](?!:))*?[^"/])((?:\?[^"]*)?(?:#[^"]*)?)"',
                          re.IGNORECASE)

# paths to static files should not be rewritten
STATIC_PATH = '/static'

class PodInternalLinkRewriter(object):

  pod = None  # type: Pod

  def __init__(self, doc, link_cache, component_version_resolver):
    """
    :type doc: Document
    :type pod: Pod
    :type link_cache: ObjectCache
    :type component_version_resolver: ComponentVersionResolver
    """
    self.doc = doc
    self.pod = doc.pod
    self.locale = doc.locale
    self.link_cache = link_cache
    self.component_version_resolver = component_version_resolver

  def rewrite_pod_internal_links(self, content):
    """
    :type content: str
    """
    try:
      pos = 0
      result = ''

      match = LINK_PATTERN.search(content)
      while match:
        result = result + content[pos: match.start(1)]

        # group 1 is the link, group 2 is the optional query and anchor part
        result = result + self.rewrite_link(match.group(1), match.group(2))
        result = result + content[match.end(2):match.end(0)]

        pos = match.end(0)
        match = LINK_PATTERN.search(content, match.end(0))

      result = result + content[pos: ]
      return result

    except Exception as err:
      stack = traceback.format_exc()
      self.pod.logger.error('Error while trying to rewrite internal links for doc {}: {}\n{}'
                            .format(self.doc.pod_path, err, stack))
      return content

  def rewrite_link(self, internal_link, query_and_anchor):
    """
    :type query_and_anchor: str
    :type internal_link: str
    """
    try:
      result = self.get_site_link(internal_link)

    except Exception as err:
      self.pod.logger.warn('Unable to rewrite internal link {} in {}'.format(internal_link, self.doc.pod_path))
      result = internal_link

    if query_and_anchor:
      result = result + query_and_anchor
    return result

  def get_site_link(self, internal_link):
    # Static files are located inside the pod which will make Grow
    # create virtual docs when calling get_doc with such a path.
    # This will make doc.exists equal True while doc.url.path only returns
    # garbage. To work around this only further check for docs in '/content'
    if internal_link.startswith(STATIC_PATH) or '{{' in internal_link or '[=' in internal_link:
      return internal_link

    internal_path = internal_link
    if not internal_path.startswith('/'):
      internal_path = os.path.abspath(os.path.join(
        PodInternalLinkRewriter.get_folder(self.doc.pod_path), internal_path))

    cache_key = '{}:{}'.format(self.locale, internal_path)
    result = self.link_cache.get(cache_key)
    if not result:
      target_doc = self.pod.get_doc(internal_path, self.locale)
      if not target_doc.exists:
        result = self.get_latest_component_doc_link(internal_path)
        if not result:
          result = internal_link
      else:
        result = target_doc.url.path
      self.link_cache.add(cache_key, result)

    return result

  def get_latest_component_doc_link(self, absolute_component_path):
    """
    :param absolute_component_path:
    :return: The link for the latest version if the path is a component doc
    """
    if self.component_version_resolver:
      version_path = self.component_version_resolver.\
        find_latest_for_component_with_no_version(absolute_component_path)
      if version_path:
        version_doc = self.pod.get_doc(version_path, self.locale)
        return version_doc.url.path
    return None

  @staticmethod
  def get_folder(path):
    """
    :type path: str
    """
    idx = path.rfind('/')
    if idx < 0:
      return path
    return path[:idx]
