# -*- coding: utf-8 -*-
import re

from grow.documents import document, static_document
from amp_dependencies import AmpDependencies

# we only auto import amp-anim, amp-youtube and amp-iframe
ELEMENT_REGEX = re.compile(r"<(amp-(?:anim|youtube|iframe)*?)(>|\s)")
PRE_CODE_REGEX = re.compile(r"<pre(?:\s[^>]*)?>.+?</pre>|<code(?:\s[^>]*)?>.+?</code>")
COMMENTS_REGEX = re.compile(r"<!--.*?-->", re.DOTALL | re.MULTILINE)


class AutoDependencyInjector(object):

  @staticmethod
  def add_auto_imports(doc, content, amp_dependencies):
    """
    :type doc: document.Document
    :type content: str
    :type amp_dependencies: AmpDependencies
    """

    if not AutoDependencyInjector.should_do_auto_import(doc, content):
      return

    dependencies = AutoDependencyInjector.find_dependencies(content)

    for dependency in dependencies:
      # calling add without version will use an existing version, or the default version
      # we explicitly disable any warning output for the missing version
      amp_dependencies.add(dependency, no_version_warn=True)

  @staticmethod
  def should_do_auto_import(doc, content):
    """
    :type doc: document.Document
    :type content: str
    :rtype: bool
    """
    # Do not run for empty documents
    if content is None:
      return False

    content = content.encode('utf-8')

    # Check that it's not a StaticDocument
    if isinstance(doc, static_document.StaticDocument):
      return False

    # Check if the document opted out of injection
    if not doc.fields.get('$$injectAmpDependencies', True):
      return False

    # Quick check if the page is really a AMP page
    if not any(marker in content for marker in ['<html amp'.encode('utf-8'), '<html ⚡'.encode('utf-8')]):
      return False

    # And has a head element
    if '</head>'.encode('utf-8') not in content:
      return False

    return True

  @staticmethod
  def find_dependencies(content):
    """Checks the generated output for possible AMP dependencies."""

    # Remove code snippets from content before searching for deps
    stripped_content = re.sub(PRE_CODE_REGEX, '', content)
    # Remove html comments
    stripped_content = re.sub(COMMENTS_REGEX, '', stripped_content)

    dependencies = []

    # Finds all allowed <amp-> component tags
    for element in re.findall(ELEMENT_REGEX, stripped_content):
      # The first capturing group will be the component name
      component_name = element[0]
      dependencies.append(component_name)

    return dependencies

