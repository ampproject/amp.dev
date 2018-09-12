<?php

/* partials/messages.html.twig */
class __TwigTemplate_685293f25f23c27f0cb53e1e1a0754af9606f98a4127ed6a701571e8bbda1ae4 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        $context["admin_messages"] = twig_array_merge($this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "messages", array()), $this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "getTempMessages", array(), "method"));
        // line 2
        $context["form_message"] = $this->getAttribute((isset($context["form"]) ? $context["form"] : null), "message", array());
        // line 3
        echo "<div id=\"messages\" class=\"top-notifications-container";
        echo (((twig_length_filter($this->env, (isset($context["admin_messages"]) ? $context["admin_messages"] : null)) || (isset($context["form_message"]) ? $context["form_message"] : null))) ? (" default-box-shadow") : (""));
        echo "\">
    <div class=\"single-notification info alert hidden\" data-gpm-grav></div>";
        // line 5
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["admin_messages"]) ? $context["admin_messages"] : null));
        foreach ($context['_seq'] as $context["_key"] => $context["message"]) {
            // line 6
            echo "<div class=\"";
            echo twig_escape_filter($this->env, $this->getAttribute($context["message"], "scope", array()));
            echo " alert\">";
            echo $this->getAttribute($context["message"], "message", array());
            echo "</div>";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['message'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 8
        if ((isset($context["form_message"]) ? $context["form_message"] : null)) {
            // line 9
            echo "<div class=\"error alert\">";
            echo (isset($context["form_message"]) ? $context["form_message"] : null);
            echo "</div>";
        }
        // line 11
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["plugin_messages"]) ? $context["plugin_messages"] : null));
        foreach ($context['_seq'] as $context["_key"] => $context["message"]) {
            // line 12
            echo "<div class=\"";
            echo twig_escape_filter($this->env, $this->getAttribute($context["message"], "scope", array()));
            echo " alert\">";
            echo $this->getAttribute($context["message"], "message", array());
            echo "</div>";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['message'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 14
        echo "</div>
";
    }

    public function getTemplateName()
    {
        return "partials/messages.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  63 => 14,  53 => 12,  49 => 11,  44 => 9,  42 => 8,  32 => 6,  28 => 5,  23 => 3,  21 => 2,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("{% set admin_messages = admin.messages|merge(admin.getTempMessages()) %}
{% set form_message = form.message %}
<div id=\"messages\" class=\"top-notifications-container{{ admin_messages|length or form_message ? ' default-box-shadow' : '' }}\">
    <div class=\"single-notification info alert hidden\" data-gpm-grav></div>
    {%- for message in admin_messages -%}
    <div class=\"{{ message.scope|e }} alert\">{{ message.message|raw }}</div>
    {%- endfor -%}
    {%- if form_message -%}
    <div class=\"error alert\">{{ form_message|raw }}</div>
    {%- endif -%}
    {%- for message in plugin_messages -%}
        <div class=\"{{ message.scope|e }} alert\">{{ message.message|raw }}</div>
    {%- endfor -%}
</div>
", "partials/messages.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/plugins/admin/themes/grav/templates/partials/messages.html.twig");
    }
}
