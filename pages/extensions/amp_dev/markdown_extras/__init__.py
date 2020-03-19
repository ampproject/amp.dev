# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from .skcode import parse_skcode, render_to_html
from .skcode.tags import build_recognized_tags_dict

from block_tip import TipTreeNode

def render(content):
    tree = parse_skcode(
        text=content,
        recognized_tags=[TipTreeNode, ],
    )
    return render_to_html(tree, html_error_template='{source}')
