<?php

/* forms/fields/array/array.html.twig */
class __TwigTemplate_bba79a246930f9e9ff13a46d52f7b4dd16abad54b7653f51856727d8250590fc extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("forms/field.html.twig", "forms/fields/array/array.html.twig", 1);
        $this->blocks = array(
            'global_attributes' => array($this, 'block_global_attributes'),
            'input' => array($this, 'block_input'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "forms/field.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_global_attributes($context, array $blocks = array())
    {
        // line 4
        echo "    data-grav-array-name=\"";
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter(((isset($context["scope"]) ? $context["scope"] : null) . $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "name", array()))), "html", null, true);
        echo "\"
    data-grav-array-keyname=\"";
        // line 5
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "placeholder_key", array()))), "html", null, true);
        echo "\"
    data-grav-array-valuename=\"";
        // line 6
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "placeholder_value", array()))), "html", null, true);
        echo "\"
    data-grav-array-textarea=\"";
        // line 7
        echo twig_escape_filter($this->env, ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "value_type", array()) == "textarea"), "html", null, true);
        echo "\"
    ";
        // line 8
        $this->displayParentBlock("global_attributes", $context, $blocks);
        echo "
";
    }

    // line 51
    public function block_input($context, array $blocks = array())
    {
        // line 52
        echo "    ";
        $context["array_field"] = $this;
        // line 53
        echo "    <div class=\"";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "size", array()), "html", null, true);
        echo "\" data-grav-array-type=\"container\"";
        if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "value_only", array())) {
            echo " data-grav-array-mode=\"value_only\"";
        }
        echo (((twig_length_filter($this->env, (isset($context["value"]) ? $context["value"] : null)) <= 1)) ? (" class=\"one-child\"") : (""));
        echo ">
        ";
        // line 54
        if (twig_length_filter($this->env, (isset($context["value"]) ? $context["value"] : null))) {
            // line 55
            echo "            ";
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable((isset($context["value"]) ? $context["value"] : null));
            foreach ($context['_seq'] as $context["key"] => $context["text"]) {
                // line 56
                if ( !twig_test_iterable($context["text"])) {
                    // line 57
                    echo "                    ";
                    echo $context["array_field"]->getrenderer($context["key"], $context["text"], (isset($context["field"]) ? $context["field"] : null), (isset($context["scope"]) ? $context["scope"] : null));
                    echo "
                ";
                } else {
                    // line 59
                    echo "                    ";
                    // line 60
                    echo "                    ";
                    $context['_parent'] = $context;
                    $context['_seq'] = twig_ensure_traversable($context["text"]);
                    foreach ($context['_seq'] as $context["subkey"] => $context["subtext"]) {
                        // line 61
                        echo $context["array_field"]->getrenderer(((($context["key"] . "[") . $context["subkey"]) . "]"), $context["subtext"], (isset($context["field"]) ? $context["field"] : null), (isset($context["scope"]) ? $context["scope"] : null));
                        echo "
                    ";
                    }
                    $_parent = $context['_parent'];
                    unset($context['_seq'], $context['_iterated'], $context['subkey'], $context['subtext'], $context['_parent'], $context['loop']);
                    $context = array_intersect_key($context, $_parent) + $_parent;
                    // line 63
                    echo "                ";
                }
                // line 64
                echo "            ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['key'], $context['text'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
        } else {
            // line 67
            echo "            <div class=\"form-row\" data-grav-array-type=\"row\">
                <span data-grav-array-action=\"sort\" class=\"fa fa-bars\"></span>
                ";
            // line 69
            if (($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "value_only", array()) != true)) {
                // line 70
                echo "                    <input
                        data-grav-array-type=\"key\"
                        type=\"text\"
                        ";
                // line 73
                if (($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "disabled", array()) || (isset($context["isDisabledToggleable"]) ? $context["isDisabledToggleable"] : null))) {
                    echo "disabled=\"disabled\"";
                }
                // line 74
                echo "                        placeholder=\"";
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "placeholder_key", array()))), "html", null, true);
                echo "\" />
                ";
            }
            // line 76
            echo "                ";
            if (($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "value_type", array()) == "textarea")) {
                // line 77
                echo "                    <textarea
                        data-grav-array-type=\"value\"
                        name=\"";
                // line 79
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter(((isset($context["scope"]) ? $context["scope"] : null) . $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "name", array()))), "html", null, true);
                echo "\"
                        ";
                // line 80
                if (($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "disabled", array()) || (isset($context["isDisabledToggleable"]) ? $context["isDisabledToggleable"] : null))) {
                    echo "disabled=\"disabled\"";
                }
                // line 81
                echo "                        placeholder=\"";
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "placeholder_value", array()))), "html", null, true);
                echo "\"></textarea>
                ";
            } else {
                // line 83
                echo "                    <input
                        data-grav-array-type=\"value\"
                        type=\"text\"
                        name=\"";
                // line 86
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter(((isset($context["scope"]) ? $context["scope"] : null) . $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "name", array()))), "html", null, true);
                echo "\"
                        ";
                // line 87
                if (($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "disabled", array()) || (isset($context["isDisabledToggleable"]) ? $context["isDisabledToggleable"] : null))) {
                    echo "disabled=\"disabled\"";
                }
                // line 88
                echo "                        placeholder=\"";
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "placeholder_value", array()))), "html", null, true);
                echo "\" />
                ";
            }
            // line 90
            echo "                <span data-grav-array-action=\"rem\" class=\"fa fa-minus\"></span>
                <span data-grav-array-action=\"add\" class=\"fa fa-plus\"></span>
            </div>";
        }
        // line 94
        echo "    </div>
";
    }

    // line 11
    public function getrenderer($__key__ = null, $__text__ = null, $__field__ = null, $__scope__ = null, ...$__varargs__)
    {
        $context = $this->env->mergeGlobals(array(
            "key" => $__key__,
            "text" => $__text__,
            "field" => $__field__,
            "scope" => $__scope__,
            "varargs" => $__varargs__,
        ));

        $blocks = array();

        ob_start();
        try {
            // line 12
            echo "
    ";
            // line 13
            if ( !twig_test_iterable((isset($context["text"]) ? $context["text"] : null))) {
                // line 14
                echo "        <div class=\"form-row";
                if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "value_only", array())) {
                    echo " array-field-value_only";
                }
                echo "\"
             data-grav-array-type=\"row\">
            <span data-grav-array-action=\"sort\" class=\"fa fa-bars\"></span>
            ";
                // line 17
                if (($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "value_only", array()) != true)) {
                    // line 18
                    echo "                ";
                    if ((((isset($context["key"]) ? $context["key"] : null) == "0") && ((isset($context["text"]) ? $context["text"] : null) == ""))) {
                        // line 19
                        echo "                    ";
                        $context["key"] = "";
                        // line 20
                        echo "                ";
                    }
                    // line 21
                    echo "
                <input
                    data-grav-array-type=\"key\"
                    type=\"text\" value=\"";
                    // line 24
                    echo twig_escape_filter($this->env, (isset($context["key"]) ? $context["key"] : null), "html", null, true);
                    echo "\"
                    ";
                    // line 25
                    if (($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "disabled", array()) || (isset($context["isDisabledToggleable"]) ? $context["isDisabledToggleable"] : null))) {
                        echo "disabled=\"disabled\"";
                    }
                    // line 26
                    echo "                    placeholder=\"";
                    echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "placeholder_key", array()))), "html", null, true);
                    echo "\" />
            ";
                }
                // line 28
                echo "
            ";
                // line 29
                if (($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "value_type", array()) == "textarea")) {
                    // line 30
                    echo "                <textarea
                    data-grav-array-type=\"value\"
                    name=\"";
                    // line 32
                    echo twig_escape_filter($this->env, ((($this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter(((isset($context["scope"]) ? $context["scope"] : null) . $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "name", array()))) . "[") . (isset($context["key"]) ? $context["key"] : null)) . "]"), "html", null, true);
                    echo "\"
                    placeholder=\"";
                    // line 33
                    echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "placeholder_value", array()))), "html", null, true);
                    echo "\"
                    ";
                    // line 34
                    if (($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "disabled", array()) || (isset($context["isDisabledToggleable"]) ? $context["isDisabledToggleable"] : null))) {
                        echo "disabled=\"disabled\"";
                    }
                    echo ">";
                    echo twig_escape_filter($this->env, (isset($context["text"]) ? $context["text"] : null), "html", null, true);
                    echo "</textarea>
            ";
                } else {
                    // line 36
                    echo "                <input
                    data-grav-array-type=\"value\"
                    type=\"text\"
                    name=\"";
                    // line 39
                    echo twig_escape_filter($this->env, ((($this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter(((isset($context["scope"]) ? $context["scope"] : null) . $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "name", array()))) . "[") . (isset($context["key"]) ? $context["key"] : null)) . "]"), "html", null, true);
                    echo "\"
                    placeholder=\"";
                    // line 40
                    echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "placeholder_value", array()))), "html", null, true);
                    echo "\"
                    ";
                    // line 41
                    if (($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "disabled", array()) || (isset($context["isDisabledToggleable"]) ? $context["isDisabledToggleable"] : null))) {
                        echo "disabled=\"disabled\"";
                    }
                    // line 42
                    echo "                    value=";
                    if (((isset($context["text"]) ? $context["text"] : null) == "true")) {
                        echo "true";
                    } elseif (((isset($context["text"]) ? $context["text"] : null) == "false")) {
                        echo "false";
                    } else {
                        echo "\"";
                        echo twig_escape_filter($this->env, twig_join_filter((isset($context["text"]) ? $context["text"] : null), ", "));
                        echo "\"";
                    }
                    echo " />
            ";
                }
                // line 44
                echo "
            <span data-grav-array-action=\"rem\" class=\"fa fa-minus\"></span>
            <span data-grav-array-action=\"add\" class=\"fa fa-plus\"></span>
        </div>
    ";
            }
        } catch (Exception $e) {
            ob_end_clean();

            throw $e;
        } catch (Throwable $e) {
            ob_end_clean();

            throw $e;
        }

        return ('' === $tmp = ob_get_clean()) ? '' : new Twig_Markup($tmp, $this->env->getCharset());
    }

    public function getTemplateName()
    {
        return "forms/fields/array/array.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  298 => 44,  284 => 42,  280 => 41,  276 => 40,  272 => 39,  267 => 36,  258 => 34,  254 => 33,  250 => 32,  246 => 30,  244 => 29,  241 => 28,  235 => 26,  231 => 25,  227 => 24,  222 => 21,  219 => 20,  216 => 19,  213 => 18,  211 => 17,  202 => 14,  200 => 13,  197 => 12,  182 => 11,  177 => 94,  172 => 90,  166 => 88,  162 => 87,  158 => 86,  153 => 83,  147 => 81,  143 => 80,  139 => 79,  135 => 77,  132 => 76,  126 => 74,  122 => 73,  117 => 70,  115 => 69,  111 => 67,  104 => 64,  101 => 63,  93 => 61,  88 => 60,  86 => 59,  80 => 57,  78 => 56,  73 => 55,  71 => 54,  61 => 53,  58 => 52,  55 => 51,  49 => 8,  45 => 7,  41 => 6,  37 => 5,  32 => 4,  29 => 3,  11 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("{% extends \"forms/field.html.twig\" %}

{% block global_attributes %}
    data-grav-array-name=\"{{ (scope ~ field.name)|fieldName }}\"
    data-grav-array-keyname=\"{{ field.placeholder_key|e|tu }}\"
    data-grav-array-valuename=\"{{ field.placeholder_value|e|tu }}\"
    data-grav-array-textarea=\"{{ field.value_type == 'textarea' }}\"
    {{ parent() }}
{% endblock %}

{% macro renderer(key, text, field, scope) %}

    {% if text is not iterable %}
        <div class=\"form-row{% if field.value_only %} array-field-value_only{% endif %}\"
             data-grav-array-type=\"row\">
            <span data-grav-array-action=\"sort\" class=\"fa fa-bars\"></span>
            {% if field.value_only != true %}
                {% if key == '0' and text == '' %}
                    {% set key = '' %}
                {% endif %}

                <input
                    data-grav-array-type=\"key\"
                    type=\"text\" value=\"{{ key }}\"
                    {% if field.disabled or isDisabledToggleable %}disabled=\"disabled\"{% endif %}
                    placeholder=\"{{ field.placeholder_key|e|tu }}\" />
            {% endif %}

            {% if field.value_type == 'textarea' %}
                <textarea
                    data-grav-array-type=\"value\"
                    name=\"{{ ((scope ~ field.name)|fieldName) ~ '[' ~ key ~ ']' }}\"
                    placeholder=\"{{ field.placeholder_value|e|tu }}\"
                    {% if field.disabled or isDisabledToggleable %}disabled=\"disabled\"{% endif %}>{{ text }}</textarea>
            {% else %}
                <input
                    data-grav-array-type=\"value\"
                    type=\"text\"
                    name=\"{{ ((scope ~ field.name)|fieldName) ~ '[' ~ key ~ ']' }}\"
                    placeholder=\"{{ field.placeholder_value|e|tu }}\"
                    {% if field.disabled or isDisabledToggleable %}disabled=\"disabled\"{% endif %}
                    value={% if text == 'true' %}true{% elseif text == 'false' %}false{% else %}\"{{ text|join(', ')|e }}\"{% endif %} />
            {% endif %}

            <span data-grav-array-action=\"rem\" class=\"fa fa-minus\"></span>
            <span data-grav-array-action=\"add\" class=\"fa fa-plus\"></span>
        </div>
    {% endif %}
{% endmacro %}

{% block input %}
    {% import _self as array_field %}
    <div class=\"{{ field.size }}\" data-grav-array-type=\"container\"{% if field.value_only %} data-grav-array-mode=\"value_only\"{% endif %}{{ value|length <= 1 ? ' class=\"one-child\"' : '' }}>
        {% if value|length %}
            {% for key, text in value -%}
                {% if text is not iterable %}
                    {{ array_field.renderer(key, text, field, scope) }}
                {% else %}
                    {# Backward compatibility for nested arrays (metas) which are not supported anymore #}
                    {% for subkey, subtext in text -%}
                        {{ array_field.renderer(key ~ '[' ~ subkey ~ ']', subtext, field, scope) }}
                    {% endfor %}
                {% endif %}
            {% endfor %}
        {%- else -%}
            {# Empty value, mock the entry field#}
            <div class=\"form-row\" data-grav-array-type=\"row\">
                <span data-grav-array-action=\"sort\" class=\"fa fa-bars\"></span>
                {% if field.value_only != true %}
                    <input
                        data-grav-array-type=\"key\"
                        type=\"text\"
                        {% if field.disabled or isDisabledToggleable %}disabled=\"disabled\"{% endif %}
                        placeholder=\"{{ field.placeholder_key|e|tu }}\" />
                {% endif %}
                {% if field.value_type == 'textarea' %}
                    <textarea
                        data-grav-array-type=\"value\"
                        name=\"{{ (scope ~ field.name)|fieldName }}\"
                        {% if field.disabled or isDisabledToggleable %}disabled=\"disabled\"{% endif %}
                        placeholder=\"{{ field.placeholder_value|e|tu }}\"></textarea>
                {% else %}
                    <input
                        data-grav-array-type=\"value\"
                        type=\"text\"
                        name=\"{{ (scope ~ field.name)|fieldName }}\"
                        {% if field.disabled or isDisabledToggleable %}disabled=\"disabled\"{% endif %}
                        placeholder=\"{{ field.placeholder_value|e|tu }}\" />
                {% endif %}
                <span data-grav-array-action=\"rem\" class=\"fa fa-minus\"></span>
                <span data-grav-array-action=\"add\" class=\"fa fa-plus\"></span>
            </div>
        {%- endif %}
    </div>
{% endblock %}
", "forms/fields/array/array.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/plugins/admin/themes/grav/templates/forms/fields/array/array.html.twig");
    }
}
