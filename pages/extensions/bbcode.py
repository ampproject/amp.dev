#!/usr/bin/env python

from __future__ import unicode_literals

__version_info__ = (1, 0, 32)
__version__ = '.'.join(str(i) for i in __version_info__)

import re
import sys

PY3 = sys.version_info[0] == 3

if PY3:
    xrange = range

# Adapted from http://daringfireball.net/2010/07/improved_regex_for_matching_urls
# Changed to only support one level of parentheses, since it was failing catastrophically on some URLs.
# See http://www.regular-expressions.info/catastrophic.html
_url_re = re.compile(r'(?im)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)'
                     r'(?:[^\s()<>]+|\([^\s()<>]+\))+(?:\([^\s()<>]+\)|[^\s`!()\[\]{};:\'".,<>?]))')

# For the URL tag, try to be smart about when to append a missing http://. If the given link looks like a domain,
# add a http:// in front of it, otherwise leave it alone (since it may be a relative path, a filename, etc).
_domain_re = re.compile(r'(?im)(?:www\d{0,3}[.]|[a-z0-9.\-]+[.]'
                        r'(?:com|net|org|edu|biz|gov|mil|info|io|name|me|tv|us|uk|mobi))')


class TagOptions (object):
    # The name of the tag, all lowercase.
    tag_name = None

    # True if a newline should automatically close this tag.
    newline_closes = False

    # True if another start of the same tag should automatically close this tag.
    same_tag_closes = False

    # True if this tag does not have a closing tag.
    standalone = False

    # True if tags should be rendered inside this tag.
    render_embedded = True

    # True if newlines should be converted to markup.
    transform_newlines = True

    # True if HTML characters (<, >, and &) should be escaped inside this tag.
    escape_html = True

    # True if URLs should be replaced with link markup inside this tag.
    replace_links = True

    # True if cosmetic replacements (elipses, dashes, etc.) should be performed inside this tag.
    replace_cosmetic = True

    # True if leading and trailing whitespace should be stripped inside this tag.
    strip = False

    # True if this tag should swallow the first trailing newline (i.e. for block elements).
    swallow_trailing_newline = False

    def __init__(self, tag_name, **kwargs):
        self.tag_name = tag_name
        for attr, value in list(kwargs.items()):
            setattr(self, attr, bool(value))


class Parser (object):

    TOKEN_TAG_START = 1
    TOKEN_TAG_END = 2
    TOKEN_NEWLINE = 3
    TOKEN_DATA = 4

    REPLACE_ESCAPE = (
        ('&', '&amp;'),
        ('<', '&lt;'),
        ('>', '&gt;'),
        ('"', '&quot;'),
        ("'", '&#39;'),
    )

    REPLACE_COSMETIC = (
        ('---', '&mdash;'),
        ('--', '&ndash;'),
        ('...', '&#8230;'),
        ('(c)', '&copy;'),
        ('(reg)', '&reg;'),
        ('(tm)', '&trade;'),
    )

    def __init__(self, newline='<br />', install_defaults=True, escape_html=True,
                 replace_links=True, replace_cosmetic=True, tag_opener='[', tag_closer=']', linker=None,
                 linker_takes_context=False, drop_unrecognized=False, default_context=None,
                 url_template='<a rel="nofollow" href="{href}">{text}</a>'):
        self.tag_opener = tag_opener
        self.tag_closer = tag_closer
        self.newline = newline
        self.recognized_tags = {}
        self.drop_unrecognized = drop_unrecognized
        self.escape_html = escape_html
        self.replace_cosmetic = replace_cosmetic
        self.replace_links = replace_links
        self.linker = linker
        self.linker_takes_context = linker_takes_context
        self.url_template = url_template
        self.default_context = default_context or {}
        if install_defaults:
            self.install_default_formatters()

    def add_formatter(self, tag_name, render_func, **kwargs):
        """
        Installs a render function for the specified tag name. The render function
        should have the following signature:

            def render(tag_name, value, options, parent, context)

        The arguments are as follows:

            tag_name
                The name of the tag being rendered.
            value
                The context between start and end tags, or None for standalone tags.
                Whether this has been rendered depends on render_embedded tag option.
            options
                A dictionary of options specified on the opening tag.
            parent
                The parent TagOptions, if the tag is being rendered inside another tag,
                otherwise None.
            context
                The keyword argument dictionary passed into the format call.
        """
        options = TagOptions(tag_name.strip().lower(), **kwargs)
        self.recognized_tags[options.tag_name] = (render_func, options)

    def add_simple_formatter(self, tag_name, format_string, **kwargs):
        """
        Installs a formatter that takes the tag options dictionary, puts a value key
        in it, and uses it as a format dictionary to the given format string.
        """
        def _render(name, value, options, parent, context):
            fmt = {}
            if options:
                fmt.update(options)
            fmt.update({'value': value})
            return format_string % fmt
        self.add_formatter(tag_name, _render, **kwargs)

    def install_default_formatters(self):
        """
        Installs default formatters for the following tags:

            b, i, u, s, list (and \*), quote, code, center, color, url
        """
        self.add_simple_formatter('b', '<strong>%(value)s</strong>')
        self.add_simple_formatter('i', '<em>%(value)s</em>')
        self.add_simple_formatter('u', '<u>%(value)s</u>')
        self.add_simple_formatter('s', '<strike>%(value)s</strike>')
        self.add_simple_formatter('hr', '<hr />', standalone=True)
        self.add_simple_formatter('sub', '<sub>%(value)s</sub>')
        self.add_simple_formatter('sup', '<sup>%(value)s</sup>')

        def _render_list(name, value, options, parent, context):
            list_type = options['list'] if (options and 'list' in options) else '*'
            css_opts = {
                '1': 'decimal', '01': 'decimal-leading-zero',
                'a': 'lower-alpha', 'A': 'upper-alpha',
                'i': 'lower-roman', 'I': 'upper-roman',
            }
            tag = 'ol' if list_type in css_opts else 'ul'
            css = ' style="list-style-type:%s;"' % css_opts[list_type] if list_type in css_opts else ''
            return '<%s%s>%s</%s>' % (tag, css, value, tag)
        self.add_formatter('list', _render_list, transform_newlines=False, strip=True, swallow_trailing_newline=True)

        # Make sure transform_newlines = False for [*], so [code] tags can be embedded without transformation.
        def _render_list_item(name, value, options, parent, context):
            if not parent or parent.tag_name != 'list':
                return '[*]%s<br />' % value

            return '<li>%s</li>' % value
        self.add_formatter('*', _render_list_item, newline_closes=True, transform_newlines=False,
            same_tag_closes=True, strip=True)

        self.add_simple_formatter('quote', '<blockquote>%(value)s</blockquote>', strip=True,
            swallow_trailing_newline=True)
        self.add_simple_formatter('code', '<code>%(value)s</code>', render_embedded=False, transform_newlines=False,
            swallow_trailing_newline=True, replace_cosmetic=False)
        self.add_simple_formatter('center', '<div style="text-align:center;">%(value)s</div>')

        def _render_color(name, value, options, parent, context):
            if 'color' in options:
                color = options['color'].strip()
            elif options:
                color = list(options.keys())[0].strip()
            else:
                return value
            match = re.match(r'^([a-z]+)|^(#[a-f0-9]{3,6})', color, re.I)
            color = match.group() if match else 'inherit'
            return '<span style="color:%(color)s;">%(value)s</span>' % {
                'color': color,
                'value': value,
            }
        self.add_formatter('color', _render_color)

        def _render_url(name, value, options, parent, context):
            if options and 'url' in options:
                # Option values are not escaped for HTML output.
                href = self._replace(options['url'], self.REPLACE_ESCAPE)
            else:
                href = value
            # Completely ignore javascript: and data: "links".
            if re.sub(r'[^a-z0-9+]', '', href.lower().split(':', 1)[0]) in ('javascript', 'data', 'vbscript'):
                return ''
            # Only add the missing http:// if it looks like it starts with a domain name.
            if '://' not in href and _domain_re.match(href):
                href = 'http://' + href
            return self.url_template.format(href=href.replace('"', '%22'), text=value)
        self.add_formatter('url', _render_url, replace_links=False, replace_cosmetic=False)

    def _replace(self, data, replacements):
        """
        Given a list of 2-tuples (find, repl) this function performs all
        replacements on the input and returns the result.
        """
        for find, repl in replacements:
            data = data.replace(find, repl)
        return data

    def _newline_tokenize(self, data):
        """
        Given a string that does not contain any tags, this function will
        return a list of NEWLINE and DATA tokens such that if you concatenate
        their data, you will have the original string.
        """
        parts = data.split('\n')
        tokens = []
        for num, part in enumerate(parts):
            if part:
                tokens.append((self.TOKEN_DATA, None, None, part))
            if num < (len(parts) - 1):
                tokens.append((self.TOKEN_NEWLINE, None, None, '\n'))
        return tokens

    def _parse_opts(self, data):
        """
        Given a tag string, this function will parse any options out of it and
        return a tuple of (tag_name, options_dict). Options may be quoted in order
        to preserve spaces, and free-standing options are allowed. The tag name
        itself may also serve as an option if it is immediately followed by an equal
        sign. Here are some examples:
            quote author="Dan Watson"
                tag_name=quote, options={'author': 'Dan Watson'}
            url="http://test.com/s.php?a=bcd efg" popup
                tag_name=url, options={'url': 'http://test.com/s.php?a=bcd efg', 'popup': ''}
        """
        name = None
        try:
            # OrderedDict is only available for 2.7+, so leave regular unsorted dicts as a fallback.
            from collections import OrderedDict
            opts = OrderedDict()
        except ImportError:
            opts = {}
        in_value = False
        in_quote = False
        attr = ''
        value = ''
        attr_done = False
        stripped = data.strip()
        ls = len(stripped)
        pos = 0

        while pos < ls:
            ch = stripped[pos]
            if in_value:
                if in_quote:
                    if ch == '\\' and ls > pos + 1 and stripped[pos + 1] in ('\\', '"', "'"):
                        value += stripped[pos + 1]
                        pos += 1
                    elif ch == in_quote:
                        in_quote = False
                        in_value = False
                        if attr:
                            opts[attr.lower()] = value.strip()
                        attr = ''
                        value = ''
                    else:
                        value += ch
                else:
                    if ch in ('"', "'"):
                        in_quote = ch
                    elif ch == ' ' and data.find('=', pos + 1) > 0:
                        # If there is no = after this, the value may accept spaces.
                        opts[attr.lower()] = value.strip()
                        attr = ''
                        value = ''
                        in_value = False
                    else:
                        value += ch
            else:
                if ch == '=':
                    in_value = True
                    if name is None:
                        name = attr
                elif ch == ' ':
                    attr_done = True
                else:
                    if attr_done:
                        if attr:
                            if name is None:
                                name = attr
                            else:
                                opts[attr.lower()] = ''
                        attr = ''
                        attr_done = False
                    attr += ch
            pos += 1

        if attr:
            if name is None:
                name = attr
            opts[attr.lower()] = value.strip()
        return name.lower(), opts

    def _parse_tag(self, tag):
        """
        Given a tag string (characters enclosed by []), this function will
        parse any options and return a tuple of the form:
            (valid, tag_name, closer, options)
        """
        if not tag.startswith(self.tag_opener) or not tag.endswith(self.tag_closer) or ('\n' in tag) or ('\r' in tag):
            return (False, tag, False, None)
        tag_name = tag[len(self.tag_opener):-len(self.tag_closer)].strip()
        if not tag_name:
            return (False, tag, False, None)
        closer = False
        opts = {}
        if tag_name[0] == '/':
            tag_name = tag_name[1:]
            closer = True
        # Parse options inside the opening tag, if needed.
        if (('=' in tag_name) or (' ' in tag_name)) and not closer:
            tag_name, opts = self._parse_opts(tag_name)
        return (True, tag_name.strip().lower(), closer, opts)

    def _tag_extent(self, data, start):
        """
        Finds the extent of a tag, accounting for option quoting and new tags starting before the current one closes.
        Returns (found_close, end_pos) where valid is False if another tag started before this one closed.
        """
        in_quote = False
        quotable = False
        lto = len(self.tag_opener)
        ltc = len(self.tag_closer)
        for i in xrange(start + 1, len(data)):
            ch = data[i]
            if ch == '=':
                quotable = True
            if ch in ('"', "'"):
                if quotable and not in_quote:
                    in_quote = ch
                elif in_quote == ch:
                    in_quote = False
                    quotable = False
            if not in_quote and data[i:i + lto] == self.tag_opener:
                return i, False
            if not in_quote and data[i:i + ltc] == self.tag_closer:
                return i + ltc, True
        return len(data), False

    def tokenize(self, data):
        """
        Tokenizes the given string. A token is a 4-tuple of the form:

            (token_type, tag_name, tag_options, token_text)

            token_type
                One of: TOKEN_TAG_START, TOKEN_TAG_END, TOKEN_NEWLINE, TOKEN_DATA
            tag_name
                The name of the tag if token_type=TOKEN_TAG_*, otherwise None
            tag_options
                A dictionary of options specified for TOKEN_TAG_START, otherwise None
            token_text
                The original token text
        """
        data = data.replace('\r\n', '\n').replace('\r', '\n')
        pos = start = end = 0
        ld = len(data)
        tokens = []
        while pos < ld:
            start = data.find(self.tag_opener, pos)
            if start >= pos:
                # Check to see if there was data between this start and the last end.
                if start > pos:
                    tl = self._newline_tokenize(data[pos:start])
                    tokens.extend(tl)
                    pos = start

                # Find the extent of this tag, if it's ever closed.
                end, found_close = self._tag_extent(data, start)
                if found_close:
                    tag = data[start:end]
                    valid, tag_name, closer, opts = self._parse_tag(tag)
                    # Make sure this is a well-formed, recognized tag, otherwise it's just data.
                    if valid and tag_name in self.recognized_tags:
                        if closer:
                            tokens.append((self.TOKEN_TAG_END, tag_name, None, tag))
                        else:
                            tokens.append((self.TOKEN_TAG_START, tag_name, opts, tag))
                    elif valid and self.drop_unrecognized and tag_name not in self.recognized_tags:
                        # If we found a valid (but unrecognized) tag and self.drop_unrecognized is True, just drop it.
                        pass
                    else:
                        tokens.extend(self._newline_tokenize(tag))
                else:
                    # We didn't find a closing tag, tack it on as text.
                    tokens.extend(self._newline_tokenize(data[start:end]))
                pos = end
            else:
                # No more tags left to parse.
                break
        if pos < ld:
            tl = self._newline_tokenize(data[pos:])
            tokens.extend(tl)
        return tokens

    def _find_closing_token(self, tag, tokens, pos):
        """
        Given the current tag options, a list of tokens, and the current position
        in the token list, this function will find the position of the closing token
        associated with the specified tag. This may be a closing tag, a newline, or
        simply the end of the list (to ensure tags are closed). This function should
        return a tuple of the form (end_pos, consume), where consume should indicate
        whether the ending token should be consumed or not.
        """
        embed_count = 0
        block_count = 0
        lt = len(tokens)
        while pos < lt:
            token_type, tag_name, tag_opts, token_text = tokens[pos]
            if token_type == self.TOKEN_DATA:
                # Short-circuit for performance.
                pos += 1
                continue
            if tag.newline_closes and token_type in (self.TOKEN_TAG_START, self.TOKEN_TAG_END):
                # If we're finding the closing token for a tag that is closed by newlines, but
                # there is an embedded tag that doesn't transform newlines (i.e. a code tag
                # that keeps newlines intact), we need to skip over that.
                inner_tag = self.recognized_tags[tag_name][1]
                if not inner_tag.transform_newlines:
                    if token_type == self.TOKEN_TAG_START:
                        block_count += 1
                    else:
                        block_count -= 1
            if token_type == self.TOKEN_NEWLINE and tag.newline_closes and block_count == 0:
                # If for some crazy reason there are embedded tags that both close on newline,
                # the first newline will automatically close all those nested tags.
                return pos, True
            elif token_type == self.TOKEN_TAG_START and tag_name == tag.tag_name:
                if tag.same_tag_closes:
                    return pos, False
                if tag.render_embedded:
                    embed_count += 1
            elif token_type == self.TOKEN_TAG_END and tag_name == tag.tag_name:
                if embed_count > 0:
                    embed_count -= 1
                else:
                    return pos, True
            pos += 1
        return pos, True

    def _link_replace(self, match, **context):
        """
        Callback for re.sub to replace link text with markup. Turns out using a callback function
        is actually faster than using backrefs, plus this lets us provide a hook for user customization.
        linker_takes_context=True means that the linker gets passed context like a standard format function.
        """
        url = match.group(0)
        if self.linker:
            if self.linker_takes_context:
                return self.linker(url, context)
            else:
                return self.linker(url)
        else:
            href = url
            if '://' not in href:
                href = 'http://' + href
            # Escape quotes to avoid XSS, let the browser escape the rest.
            return self.url_template.format(href=href.replace('"', '%22'), text=url)

    def _transform(self, data, escape_html, replace_links, replace_cosmetic, transform_newlines, **context):
        """
        Transforms the input string based on the options specified, taking into account
        whether the option is enabled globally for this parser.
        """
        url_matches = {}
        if self.replace_links and replace_links:
            # If we're replacing links in the text (i.e. not those in [url] tags) then we need to be
            # careful to pull them out before doing any escaping or cosmetic replacement.
            pos = 0
            while True:
                match = _url_re.search(data, pos)
                if not match:
                    break
                # Replace any link with a token that we can substitute back in after replacements.
                token = '{{ bbcode-link-%s }}' % len(url_matches)
                url_matches[token] = self._link_replace(match, **context)
                start, end = match.span()
                data = data[:start] + token + data[end:]
                # To be perfectly accurate, this should probably be len(data[:start] + token), but
                # start will work, because the token itself won't match as a URL.
                pos = start
        if escape_html:
            data = self._replace(data, self.REPLACE_ESCAPE)
        if replace_cosmetic:
            data = self._replace(data, self.REPLACE_COSMETIC)
        # Now put the replaced links back in the text.
        for token, replacement in url_matches.items():
            data = data.replace(token, replacement)
        if transform_newlines:
            data = data.replace('\n', '\r')
        return data

    def _format_tokens(self, tokens, parent, escape_html=None, replace_links=None, replace_cosmetic=None,
            transform_newlines=True, **context):
        # Allow the parser defaults to be overridden when formatting.
        escape_html = self.escape_html if escape_html is None else escape_html
        replace_links = self.replace_links if replace_links is None else replace_links
        replace_cosmetic = self.replace_cosmetic if replace_cosmetic is None else replace_cosmetic
        idx = 0
        formatted = []
        lt = len(tokens)
        while idx < lt:
            token_type, tag_name, tag_opts, token_text = tokens[idx]
            if token_type == self.TOKEN_TAG_START:
                render_func, tag = self.recognized_tags[tag_name]
                if tag.standalone:
                    formatted.append(render_func(tag_name, None, tag_opts, parent, context))
                else:
                    # First, find the extent of this tag's tokens.
                    end, consume = self._find_closing_token(tag, tokens, idx + 1)
                    subtokens = tokens[idx + 1:end]
                    # If the end tag should not be consumed, back up one (after grabbing the subtokens).
                    if not consume:
                        end = end - 1
                    if tag.render_embedded:
                        # This tag renders embedded tags, simply recurse.
                        inner = self._format_tokens(subtokens, tag, **context)
                    else:
                        # Otherwise, just concatenate all the token text.
                        inner = self._transform(''.join([t[3] for t in subtokens]), tag.escape_html, tag.replace_links,
                            tag.replace_cosmetic, tag.transform_newlines, **context)
                    if tag.strip:
                        inner = inner.strip()
                    # Append the rendered contents.
                    formatted.append(render_func(tag_name, inner, tag_opts, parent, context))
                    # If the tag should swallow the first trailing newline, check the token after the closing token.
                    if tag.swallow_trailing_newline:
                        next_pos = end + 1
                        if next_pos < len(tokens) and tokens[next_pos][0] == self.TOKEN_NEWLINE:
                            end = next_pos
                    # Skip to the end tag.
                    idx = end
            elif token_type == self.TOKEN_NEWLINE:
                # If this is a top-level newline, replace it. Otherwise, it will be replaced (if necessary)
                # by the code above.
                formatted.append('\r' if parent is None or parent.transform_newlines else token_text)
            elif token_type == self.TOKEN_DATA:
                escape = escape_html if parent is None else parent.escape_html
                links = replace_links if parent is None else parent.replace_links
                cosmetic = replace_cosmetic if parent is None else parent.replace_cosmetic
                newlines = transform_newlines if parent is None else parent.transform_newlines
                formatted.append(self._transform(token_text, escape, links, cosmetic, newlines, **context))
            idx += 1
        return ''.join(formatted)

    def format(self, data, **context):
        """
        Formats the input text using any installed renderers. Any context keyword arguments
        given here will be passed along to the render functions as a context dictionary.
        """
        tokens = self.tokenize(data)
        full_context = self.default_context.copy()
        full_context.update(context)
        return self._format_tokens(tokens, None, **full_context).replace('\r', self.newline)

    def strip(self, data, strip_newlines=False):
        """
        Strips out any tags from the input text, using the same tokenization as the formatter.
        """
        text = []
        for token_type, tag_name, tag_opts, token_text in self.tokenize(data):
            if token_type == self.TOKEN_DATA:
                text.append(token_text)
            elif token_type == self.TOKEN_NEWLINE and not strip_newlines:
                text.append(token_text)
        return ''.join(text)


g_parser = None


def render_html(input_text, **context):
    """
    A module-level convenience method that creates a default bbcode parser,
    and renders the input string as HTML.
    """
    global g_parser
    if g_parser is None:
        g_parser = Parser()
    return g_parser.format(input_text, **context)


if __name__ == '__main__':
    import sys
    sys.stdout.write(render_html(sys.stdin.read()))
    sys.stdout.write('\n')
    sys.stdout.flush()
