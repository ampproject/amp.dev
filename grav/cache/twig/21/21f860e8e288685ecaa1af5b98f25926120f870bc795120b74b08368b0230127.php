<?php

/* styleguide-overview.html.twig */
class __TwigTemplate_53c1ce5163c3ca6132d5e32ee0c1d772e3014a8cfd7fc143402059e9f3ada605 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("default.html.twig", "styleguide-overview.html.twig", 1);
        $this->blocks = array(
            'content' => array($this, 'block_content'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "default.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_content($context, array $blocks = array())
    {
        // line 4
        echo $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "content", array());
        echo "

";
        // line 8
        $context["categoryPages"] = $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "evaluate", array(0 => array(0 => array("@page.children" => $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "route", array())))), "method"), "visible", array(), "method"), "published", array(), "method"), "routable", array(), "method");
        // line 9
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["categoryPages"]) ? $context["categoryPages"] : null));
        foreach ($context['_seq'] as $context["_key"] => $context["category"]) {
            // line 10
            echo "<h2>";
            echo $this->getAttribute($context["category"], "title", array());
            echo "</h2>
";
            // line 11
            $context["childPages"] = $this->getAttribute($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "evaluate", array(0 => array(0 => array("@page.children" => $this->getAttribute($context["category"], "route", array())))), "method"), "routable", array(), "method");
            // line 12
            echo "<ul>
  ";
            // line 13
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable((isset($context["childPages"]) ? $context["childPages"] : null));
            foreach ($context['_seq'] as $context["_key"] => $context["child"]) {
                // line 14
                echo "  <li><a href=\"";
                echo $this->getAttribute($context["child"], "route", array());
                echo "\">";
                echo $this->getAttribute($context["child"], "title", array());
                echo "</a></li>
  ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['child'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 16
            echo "</ul>
<hr>
";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['category'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
    }

    public function getTemplateName()
    {
        return "styleguide-overview.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  67 => 16,  56 => 14,  52 => 13,  49 => 12,  47 => 11,  42 => 10,  38 => 9,  36 => 8,  31 => 4,  28 => 3,  11 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("{% extends 'default.html.twig' %}

{% block content %}
{{ page.content }}

{# Check for child pages, list them as headlines and their childpages as
a links list #}
{% set categoryPages = page.evaluate([{'@page.children': page.route}]).visible().published().routable() %}
{% for category in categoryPages %}
<h2>{{ category.title }}</h2>
{% set childPages = page.evaluate([{'@page.children': category.route}]).routable() %}
<ul>
  {% for child in childPages %}
  <li><a href=\"{{ child.route }}\">{{ child.title }}</a></li>
  {% endfor %}
</ul>
<hr>
{% endfor %}
{% endblock %}
", "styleguide-overview.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/themes/amp-dev/templates/styleguide-overview.html.twig");
    }
}
