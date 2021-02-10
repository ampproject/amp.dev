# -*- coding: utf-8 -*-
from grow import extensions
from grow.documents import document, static_document
from grow.extensions import hooks
from .amp_dependencies import AmpDependencies
from .auto_dependency_injector import AutoDependencyInjector

# Used to determine where to print the script tags
PLACEHOLDER = '__AMP__DEPENDENCIES__'


class AmpDependenciesPreRenderHook(hooks.PreRenderHook):
  """Handle the post-render hook."""

  def should_trigger(self, previous_result, doc, original_body, *_args,
                       **_kwargs):
    """Only run for documents with contents"""

    # Check that it's not a StaticDocument
    if isinstance(doc, static_document.StaticDocument):
      return False

    return True

  def trigger(self, previous_result, doc, raw_content, *_args, **_kwargs):
    amp_dependencies = AmpDependencies(doc.pod)
    setattr(doc, 'amp_dependencies', amp_dependencies)

    return previous_result if previous_result else raw_content


class AmpDependenciesPostRenderHook(hooks.PostRenderHook):
  """Handle the post-render hook."""

  def should_trigger(self, previous_result, doc, original_body, *_args,
                       **_kwargs):
    """Only needs to trigger if pre-render hook added a dependency set
    and there is content to render"""
    # Do not run for empty documents
    content = previous_result if previous_result else original_body
    if content is None:
      return False

    # Check that it's not a StaticDocument
    if isinstance(doc, static_document.StaticDocument):
      return False

    return True

  def trigger(self, previous_result, doc, raw_content, *_args, **_kwargs):
    content = previous_result if previous_result else raw_content

    amp_deps = getattr(doc, 'amp_dependencies')

    AutoDependencyInjector.add_auto_imports(doc, content, amp_deps)

    content = amp_deps.inject(content)

    return content


class AmpDependenciesExtension(extensions.BaseExtension):
  """AMP Dependencies Extension."""

  def __init__(self, pod, config):
    super(AmpDependenciesExtension, self).__init__(pod, config)

  @property
  def available_hooks(self):
    """Returns the available hook classes."""
    return [
      AmpDependenciesPreRenderHook,
      AmpDependenciesPostRenderHook,
    ]
