# -*- coding: utf-8 -*-
from __future__ import absolute_import

from .skcode.etree import TreeNode

TIP_TYPE_DEFAULT = 'default'
TIP_TYPE_NOTE = 'note'
TIP_TYPE_IMPORTANT = 'important'
TIP_TYPE_READ_ON = 'read-on'


class TipTreeNode(TreeNode):
    canonical_tag_name = 'tip'
    alias_tag_names = ()

    accepted_types = (
        TIP_TYPE_DEFAULT,
        TIP_TYPE_NOTE,
        TIP_TYPE_IMPORTANT,
        TIP_TYPE_READ_ON,
    )

    default_type = TIP_TYPE_DEFAULT

    # HTML templates for all alert types
    html_template = {

        TIP_TYPE_DEFAULT: """<div class="ap-m-tip ap-m-tip-default">
          <div class="ap-m-tip-content">
            <p>{inner_html}</p>
          </div>
        </div>
        """,

        TIP_TYPE_NOTE: """<div class="ap-m-tip ap-m-tip-note">
          <div class="ap-m-tip-content">
            <p>{inner_html}</p>
          </div>
        </div>
        """,

        TIP_TYPE_IMPORTANT: """<div class="ap-m-tip ap-m-tip-important">
          <div class="ap-m-tip-content">
            <p>{inner_html}</p>
          </div>
        </div>
        """,

        TIP_TYPE_READ_ON: """<div class="ap-m-tip ap-m-tip-read-on">
          <div class="ap-m-tip-content">
            <p>{inner_html}</p>
          </div>
        </div>
        """,
    }

    alert_type_attr_name = 'type'

    def get_alert_type(self):
        user_alert_type = self.attrs.get(self.alert_type_attr_name, self.default_type)
        user_alert_type = user_alert_type.lower()
        return user_alert_type if user_alert_type in self.accepted_types else self.default_type

    def get_alert_html_template(self, alert_type):
        return self.html_template[alert_type]

    def render_html(self, inner_html, **kwargs):
        # Get the alert variables
        alert_type = self.get_alert_type()
        alert_html_template = self.get_alert_html_template(alert_type)

        # Render the alert
        return alert_html_template.format(type=alert_type,
                                          inner_html=inner_html.strip())

    def render_text(self, inner_text, **kwargs):
        u"""
        Callback function for rendering text.
        :param inner_text: The inner text of this tree node.
        :param kwargs: Extra keyword arguments for rendering.
        :return The rendered text of this node.
        """

        # Get the alert variables
        alert_type = self.get_alert_type()
        alert_title = self.get_alert_title()
        alert_text_title_line_template = self.get_alert_text_title_line_template(alert_type)

        # Render the alert title line
        lines = [u'*** ' + alert_text_title_line_template.format(title=alert_title)]

        # Render all inner lines
        for line in inner_text.strip().splitlines():
            lines.append(u'* ' + line)
        lines.append(u'***')
        lines.append(u'')
        return u'\n'.join(lines)
