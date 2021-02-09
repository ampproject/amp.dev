# -*- coding: utf-8 -*-
from grow import extensions
from .custom_toc_tree_processor import CustomTocTreeProcessor


class MarkdownTocPatchExtension(extensions.BaseExtension):
  """
  The extension class has no logic.
  But we hook other classes when this file is loaded.

  - CustomTocTreeProcessor replaces the markdown TocTreeProcessor class to remove html from toc item names

  """
  pass

CustomTocTreeProcessor.connect_hook()

