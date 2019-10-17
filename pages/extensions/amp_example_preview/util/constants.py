# attribute to transfer the imports from the preprocessor to the post processor
ATTRIBUTE_EXAMPLE_IMPORTS = 'example_imports'

# attribute to transfer the imports from the preprocessor to the post processor
ATTRIBUTE_EXAMPLE_TEMPLATES = 'example_templates'

# attribute set in the preprocessor and used in the docs-detail.j2 template to include additional css
ATTRIBUTE_HAS_INLINE_PREVIEW = 'has_inline_preview'

FORMAT_TYPE_IDS = {
  'websites',
  'email',
  'ads',
  'stories',
}

DEFAULT_FORMAT = 'websites'

PREVIEW_INLINE = 'inline'
PREVIEW_TOP_FRAME = 'top-frame'
PREVIEW_SIDE_FRAME = 'side-frame'
PREVIEW_NONE = 'none'

PREVIEW_MODES = [
  PREVIEW_INLINE,
  PREVIEW_TOP_FRAME,
  PREVIEW_SIDE_FRAME,
  PREVIEW_NONE,
]

PREVIEW_MODES_IN_IFRAME = [
  PREVIEW_TOP_FRAME,
  PREVIEW_SIDE_FRAME
]
