from grow import extensions
from grow.documents import static_document
from grow.extensions import hooks
from .pod_internal_link_rewriter import PodInternalLinkRewriter
from .component_version_resolver import ComponentVersionResolver

class PodInternalLinkPostRenderHook(hooks.PostRenderHook):
  """Handle the post-render hook."""

  def __init__(self, extension):
    super(PodInternalLinkPostRenderHook, self).__init__(extension)
    self.link_cache = extension.pod.podcache.get_object_cache('pod_site_link_map')

  def should_trigger(self, previous_result, doc, original_body, *_args,
                     **_kwargs):
    content = previous_result if previous_result else original_body
    if content is None:
      return False

    # Check that it's not a StaticDocument
    if isinstance(doc, static_document.StaticDocument):
      return False

    return True

  def trigger(self, previous_result, doc, raw_content, *_args, **_kwargs):
    content = previous_result if previous_result else raw_content

    link_rewriter = PodInternalLinkRewriter(doc, self.link_cache, self.extension.component_version_resolver);
    content = link_rewriter.rewrite_pod_internal_links(content)

    return content


class PodInternalLinkExtension(extensions.BaseExtension):

  def __init__(self, pod, config):
    super(PodInternalLinkExtension, self).__init__(pod, config)
    if 'component_path' in config:
      self.component_version_resolver = ComponentVersionResolver(pod, config['component_path'])
    else:
      self.component_version_resolver = None

  @property
  def available_hooks(self):
    """Returns the available hook classes."""
    return [
      PodInternalLinkPostRenderHook,
    ]
