<?php

/* forms/fields/order/order.html.twig */
class __TwigTemplate_4f4bc7b42f32ba8bef34b8ef151b0e120713322939a8a18e53991492ae5f77f3 extends Twig_Template
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
        $context["value"] = (((null === (isset($context["value"]) ? $context["value"] : null))) ? ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "default", array())) : ((isset($context["value"]) ? $context["value"] : null)));
        // line 2
        $context["siblings"] = $this->getAttribute($this->getAttribute((isset($context["context"]) ? $context["context"] : null), "parent", array()), "children", array());
        // line 3
        $context["canOrder"] = $this->getAttribute((isset($context["context"]) ? $context["context"] : null), "order", array());
        // line 4
        $context["vertical"] = ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "style", array()) == "vertical");
        // line 5
        echo "
<div class=\"form-field grid pure-g";
        // line 6
        if ((isset($context["vertical"]) ? $context["vertical"] : null)) {
            echo " vertical";
        }
        echo "\">
    <div class=\"form-label";
        // line 7
        if ( !(isset($context["vertical"]) ? $context["vertical"] : null)) {
            echo " block size-1-3 pure-u-1-3";
        }
        echo "\">
        <label>
            ";
        // line 9
        if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "help", array())) {
            // line 10
            echo "            <span class=\"tooltip\" data-asTooltip-position=\"w\" title=\"";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "help", array()))), "html", null, true);
            echo "\">";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "label", array())), "html", null, true);
            echo "</span>
            ";
        } else {
            // line 12
            echo "            ";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "label", array())), "html", null, true);
            echo "
            ";
        }
        // line 14
        echo "            ";
        echo ((twig_in_filter($this->getAttribute($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "validate", array()), "required", array()), array(0 => "on", 1 => "true", 2 => 1))) ? ("<span class=\"required\">*</span>") : (""));
        echo "
        </label>
    </div>
    <div class=\"form-data";
        // line 17
        if ( !(isset($context["vertical"]) ? $context["vertical"] : null)) {
            echo " block size-2-3 pure-u-2-3";
        }
        echo "\">
        <div class=\"form-order-wrapper ";
        // line 18
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "size", array()), "html", null, true);
        echo "\">

            <input
                type=\"hidden\"
                data-order
                ";
        // line 23
        if (($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "disabled", array()) || (isset($context["isDisabledToggleable"]) ? $context["isDisabledToggleable"] : null))) {
            echo "disabled=\"disabled\"";
        }
        // line 24
        echo "                name=\"";
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter(((isset($context["scope"]) ? $context["scope"] : null) . $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "name", array()))), "html", null, true);
        echo "\"
                value=\"\" />
            ";
        // line 26
        if ( !(isset($context["canOrder"]) ? $context["canOrder"] : null)) {
            // line 27
            echo "                <div class=\"notice\">";
            echo $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.ORDERING_DISABLED_BECAUSE_PAGE_NO_PREFIX");
            echo "</div>
            ";
        }
        // line 29
        echo "
            ";
        // line 30
        if ((twig_length_filter($this->env, (isset($context["siblings"]) ? $context["siblings"] : null)) < 200)) {
            // line 31
            echo "                ";
            $context["sortable_count"] = 0;
            // line 32
            echo "\t\t\t\t<ul id=\"ordering\" class=\"orderable ";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "classes", array()), "html", null, true);
            echo "\">
\t\t\t    ";
            // line 33
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable((isset($context["siblings"]) ? $context["siblings"] : null));
            $context['loop'] = array(
              'parent' => $context['_parent'],
              'index0' => 0,
              'index'  => 1,
              'first'  => true,
            );
            foreach ($context['_seq'] as $context["_key"] => $context["page"]) {
                if ($this->getAttribute($context["page"], "order", array())) {
                    // line 34
                    echo "\t\t\t\t\t<li class=\"drag-handle\" data-id=\"";
                    echo twig_escape_filter($this->env, $this->getAttribute($context["page"], "slug", array()), "html", null, true);
                    echo "\" ";
                    echo ((($this->getAttribute($context["page"], "slug", array()) == $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "slug", array()))) ? ("data-active-id") : (""));
                    echo "><span class=\"page-order\">";
                    echo twig_escape_filter($this->env, $this->getAttribute($context["page"], "order", array()), "html", null, true);
                    echo "</span> ";
                    echo twig_escape_filter($this->env, $this->getAttribute($context["page"], "title", array()));
                    echo " <a href=\"";
                    echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->getPageUrl($context, $context["page"]), "html", null, true);
                    echo "\"><i class=\"fa fa-external-link\"></i></a></li>
                    ";
                    // line 35
                    $context["sortable_count"] = $this->getAttribute($context["loop"], "index", array());
                    // line 36
                    echo "                ";
                    ++$context['loop']['index0'];
                    ++$context['loop']['index'];
                    $context['loop']['first'] = false;
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['page'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 37
            echo "\t\t\t\t</ul>
                ";
            // line 38
            if (((isset($context["sortable_count"]) ? $context["sortable_count"] : null) < twig_length_filter($this->env, (isset($context["siblings"]) ? $context["siblings"] : null)))) {
                // line 39
                echo "                <label>";
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.UNSORTABLE_PAGES"), "html", null, true);
                echo "</label>
                <ul class=\"orderable disabled\">
                    ";
                // line 41
                $context['_parent'] = $context;
                $context['_seq'] = twig_ensure_traversable((isset($context["siblings"]) ? $context["siblings"] : null));
                foreach ($context['_seq'] as $context["_key"] => $context["page"]) {
                    if ( !$this->getAttribute($context["page"], "order", array())) {
                        // line 42
                        echo "                        <li ";
                        echo ((($this->getAttribute($context["page"], "slug", array()) == $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "slug", array()))) ? ("data-active-id") : (""));
                        echo ">";
                        echo twig_escape_filter($this->env, $this->getAttribute($context["page"], "title", array()));
                        echo " <a href=\"";
                        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->getPageUrl($context, $context["page"]), "html", null, true);
                        echo "\"><i class=\"fa fa-external-link\"></i></a></li>
                    ";
                    }
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['page'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 44
                echo "                </ul>
                ";
            }
            // line 46
            echo "\t\t\t";
        } else {
            // line 47
            echo "                <div class=\"notice\">";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.ORDERING_DISABLED_BECAUSE_TOO_MANY_SIBLINGS"), "html", null, true);
            echo "</div>
\t\t\t";
        }
        // line 49
        echo "        </div>
    </div>
</div>
";
    }

    public function getTemplateName()
    {
        return "forms/fields/order/order.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  190 => 49,  184 => 47,  181 => 46,  177 => 44,  163 => 42,  158 => 41,  152 => 39,  150 => 38,  147 => 37,  137 => 36,  135 => 35,  122 => 34,  111 => 33,  106 => 32,  103 => 31,  101 => 30,  98 => 29,  92 => 27,  90 => 26,  84 => 24,  80 => 23,  72 => 18,  66 => 17,  59 => 14,  53 => 12,  45 => 10,  43 => 9,  36 => 7,  30 => 6,  27 => 5,  25 => 4,  23 => 3,  21 => 2,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("{% set value = (value is null ? field.default : value) %}
{% set siblings = context.parent.children %}
{% set canOrder = context.order %}
{% set vertical = field.style == 'vertical' %}

<div class=\"form-field grid pure-g{% if vertical %} vertical{% endif %}\">
    <div class=\"form-label{% if not vertical %} block size-1-3 pure-u-1-3{% endif %}\">
        <label>
            {% if field.help %}
            <span class=\"tooltip\" data-asTooltip-position=\"w\" title=\"{{ field.help|e|tu }}\">{{ field.label|tu }}</span>
            {% else %}
            {{ field.label|tu }}
            {% endif %}
            {{ field.validate.required in ['on', 'true', 1] ? '<span class=\"required\">*</span>' }}
        </label>
    </div>
    <div class=\"form-data{% if not vertical %} block size-2-3 pure-u-2-3{% endif %}\">
        <div class=\"form-order-wrapper {{ field.size }}\">

            <input
                type=\"hidden\"
                data-order
                {% if field.disabled or isDisabledToggleable %}disabled=\"disabled\"{% endif %}
                name=\"{{ (scope ~ field.name)|fieldName }}\"
                value=\"\" />
            {% if not canOrder %}
                <div class=\"notice\">{{ \"PLUGIN_ADMIN.ORDERING_DISABLED_BECAUSE_PAGE_NO_PREFIX\"|tu|raw }}</div>
            {% endif %}

            {% if siblings|length < 200 %}
                {% set sortable_count = 0 %}
\t\t\t\t<ul id=\"ordering\" class=\"orderable {{ field.classes }}\">
\t\t\t    {% for page in siblings if page.order %}
\t\t\t\t\t<li class=\"drag-handle\" data-id=\"{{ page.slug }}\" {{ page.slug == data.slug ? 'data-active-id' : ''}}><span class=\"page-order\">{{ page.order }}</span> {{ page.title|e }} <a href=\"{{ getPageUrl(page) }}\"><i class=\"fa fa-external-link\"></i></a></li>
                    {% set sortable_count = loop.index %}
                {% endfor %}
\t\t\t\t</ul>
                {% if sortable_count < siblings|length %}
                <label>{{ \"PLUGIN_ADMIN.UNSORTABLE_PAGES\"|tu }}</label>
                <ul class=\"orderable disabled\">
                    {% for page in siblings if not page.order %}
                        <li {{ page.slug == data.slug ? 'data-active-id' : ''}}>{{ page.title|e }} <a href=\"{{ getPageUrl(page) }}\"><i class=\"fa fa-external-link\"></i></a></li>
                    {% endfor %}
                </ul>
                {% endif %}
\t\t\t{% else %}
                <div class=\"notice\">{{ \"PLUGIN_ADMIN.ORDERING_DISABLED_BECAUSE_TOO_MANY_SIBLINGS\"|tu }}</div>
\t\t\t{% endif %}
        </div>
    </div>
</div>
", "forms/fields/order/order.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/plugins/admin/themes/grav/templates/forms/fields/order/order.html.twig");
    }
}
