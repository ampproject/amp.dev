u"""
SkCode tools code.
"""

from __future__ import absolute_import
import re
import unicodedata

from html import escape as escape_html
from urlparse import urlsplit, urlunsplit, urljoin


# URL charset regex for cleaning URL
URL_CHARSET_SUB = re.compile(ur'[^a-zA-Z0-9-~+_.?#=!&;,/:%@$\|*\'()\[\]\x80-\xff]')


def escape_attribute_value(value):
    u"""
    Escape the given value and return it escaped and wrapped in simple or double quotes.
    Try to avoid escape sequence as much as possible to make the value more user-friendly.
    :param value: The input attribute value (unescaped).
    :return The attribute value escaped, with surrounding quotes if required.
    """
    if u"'" in value and u'"' in value:
        return u'"{}"'.format(value.replace(u'\\', u'\\\\').replace(u'"', u'\\"'))
    elif u'"' in value:
        return u"'{}'".format(value)
    else:
        return u'"{}"'.format(value)


def sanitize_url(url, default_scheme=u'http',
                 allowed_schemes=(u'http', u'https', u'ftp', u'ftps', u'mailto'),
                 encode_html_entities=True, force_default_scheme=False,
                 force_remove_scheme=False, fix_non_local_urls=True,
                 absolute_base_url=u''):
    u"""
    Sanitize the given URL. Avoid XSS by filtering-out forbidden protocol and characters.
    Allowed protocols by default are: ``http``, ``https``, ``ftp``, ``ftps`` and ``mailto``.
    If no protocol scheme is specified, all non-local URL will be tied to the default scheme.
    :param url: The user-supplied URL to be sanitized.
    :param default_scheme: The default scheme to use (default to ``http``).
    :param allowed_schemes: The list of allowed schemes (see defaults above).
    :param encode_html_entities: If set to ``True``, the output URL will be encoded to avoid raw HTML entities
    (default is ``True``).
    :param force_default_scheme: Set to ``True`` to force the default scheme to be used in all case
    (default is``False``).
    :param force_remove_scheme: Set to ``True`` to remove the scheme if set (default is ``False``).
    N.B. The ``force_default_scheme`` and ``force_remove_scheme`` are mutually exclusive for obvious reasons.
    :param fix_non_local_urls: Set to ``True`` to fix non local URL with netloc in path (default is ``True``).
    Example: with ``fix_non_local_urls`` set to ``True``, ``google.com`` will become ``http://google.com/``.
    :param absolute_base_url: The base URL for the relative-to-absolute conversion.
    If set, relative URLs will be expanded as absolute URLs using the given base URL. Example: with
    ``absolute_base_url`` set to ``http://example.com/``, ``/forum/`` will become ``http://example.com/forum/``.
    :return: The sanitized URL as string, or an empty string if erroneous.
    """
    assert default_scheme, u"A default scheme is mandatory to avoid XSS."
    assert len(allowed_schemes) > 0, u"You need to allow at least one scheme to get a result."
    assert not (force_default_scheme and
                force_remove_scheme), u"You cannot force the default scheme and also force-remove the scheme."

    # Shortcut for empty string
    if not url:
        return u''

    # Remove dangerous stuff
    url = URL_CHARSET_SUB.sub(u'', url)

    # Split the URL
    try:
        scheme, netloc, path, query, fragment = urlsplit(url)
    except ValueError:

        # Handle malformed URL
        return u''

    # Check the scheme against the white list
    if scheme and scheme not in allowed_schemes:
        return u''

    # Detect and fix non local URL without // at beginning (not supported by  ``urlsplit``)
    if not netloc and path and not path.startswith(u'/') and fix_non_local_urls:
        parts = path.split(u'/', 1)
        if len(parts) == 2:
            netloc, path = parts
        else:
            netloc = parts[0]
            path = u''

    # Add scheme to any non-local URL if required
    if (not scheme and netloc) or force_default_scheme:
        scheme = default_scheme

    # Remove the scheme if requested
    if force_remove_scheme:
        scheme = u''

    # Build the final URL
    if netloc or not absolute_base_url:
        result = urlunsplit((scheme, netloc, path, query, fragment))
    else:
        result = urlunsplit((u'', u'', path, query, fragment))
        result = urljoin(absolute_base_url, result)

    # Escape HTML if requested
    if encode_html_entities:
        result = escape_html(result)

    # Return the sanitized URL
    return result


def slugify(value):
    u"""
    Convert the given value to a plain-text ASCII slug. Spaces are converted to hyphens.
    Characters that aren't alphanumerics, underscores, or hyphens are removed.
    The resulting string is then converted to lowercase. Leading and trailing whitespace are also stripped.
    :param value: The string to be turned into a slug.
    """
    value = value.strip()
    if not value:
        return u''
    value = unicodedata.normalize(u'NFKD', value).encode(u'ascii', u'ignore').decode(u'ascii')
    value = re.sub(ur'[^\w\s-]', u'', value).strip().lower()
    return re.sub(ur'[-\s]+', u'-', value).strip(u'-')
