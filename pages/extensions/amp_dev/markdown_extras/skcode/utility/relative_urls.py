u"""
Relative to absolute URLs conversion utility.
"""

# Document attribute name for storing the base URL
RELATIVE_URL_BASE_ATTR_NAME = u'RELATIVE_URL_BASE'


def setup_relative_urls_conversion(document_tree, relative_url_base):
    u"""
    Setup the document for automatic relative URLs to absolute URLs conversion.
    :param document_tree: The document tree to be setup.
    :param relative_url_base: The base URL to be used for converting all relative URLs to absolute ones. Need to
    be in form ``scheme://netloc/(path/)``.
    """
    assert document_tree, u"Document tree is mandatory."
    assert document_tree.is_root, u"Document tree must be a root tree node instance."
    assert relative_url_base, u"The base URL for relative URLs conversion if mandatory."

    # Store the base URL for relative URLs
    document_tree.attrs[RELATIVE_URL_BASE_ATTR_NAME] = relative_url_base


def get_relative_url_base(document_tree):
    u"""
    Get the base URL for all relative URLs.
    :param document_tree: The document tree.
    :return: The base URL or an empty string.
    """
    return document_tree.attrs.get(RELATIVE_URL_BASE_ATTR_NAME, u'')
