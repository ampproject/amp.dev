<?php

/* forms/field.html.twig */
class __TwigTemplate_345c5d6b10fca945b7f3b38ac7c69002fb40e4323152a9a5aab4ba95f71ce128 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'field' => array($this, 'block_field'),
            'contents' => array($this, 'block_contents'),
            'label' => array($this, 'block_label'),
            'global_attributes' => array($this, 'block_global_attributes'),
            'group' => array($this, 'block_group'),
            'input' => array($this, 'block_input'),
            'prepend' => array($this, 'block_prepend'),
            'input_attributes' => array($this, 'block_input_attributes'),
            'append' => array($this, 'block_append'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        $context["originalValue"] = (((isset($context["originalValue"]) || array_key_exists("originalValue", $context))) ? ((isset($context["originalValue"]) ? $context["originalValue"] : null)) : ((isset($context["value"]) ? $context["value"] : null)));
        // line 2
        $context["toggleableChecked"] = ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "toggleable", array()) && ( !(null === (isset($context["originalValue"]) ? $context["originalValue"] : null)) &&  !twig_test_empty((isset($context["originalValue"]) ? $context["originalValue"] : null))));
        // line 3
        $context["isDisabledToggleable"] = ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "toggleable", array()) &&  !(isset($context["toggleableChecked"]) ? $context["toggleableChecked"] : null));
        // line 4
        $context["value"] = (((null === (isset($context["value"]) ? $context["value"] : null))) ? ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "default", array())) : ((isset($context["value"]) ? $context["value"] : null)));
        // line 5
        $context["vertical"] = ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "style", array()) == "vertical");
        // line 6
        $context["field_name"] = $this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter(((isset($context["scope"]) ? $context["scope"] : null) . $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "name", array())));
        // line 7
        echo "
";
        // line 8
        if ((($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "yaml", array()) || ($this->getAttribute($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "validate", array()), "type", array()) == "yaml")) && twig_test_iterable((isset($context["value"]) ? $context["value"] : null)))) {
            // line 9
            echo "    ";
            $context["value"] = $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->toYamlFilter((isset($context["value"]) ? $context["value"] : null));
        }
        // line 11
        echo "
";
        // line 12
        $this->displayBlock('field', $context, $blocks);
    }

    public function block_field($context, array $blocks = array())
    {
        // line 13
        echo "    <div class=\"form-field grid";
        if ((isset($context["vertical"]) ? $context["vertical"] : null)) {
            echo " vertical";
        }
        if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "toggleable", array())) {
            echo " form-field-toggleable";
        }
        echo " ";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "outerclasses", array()), "html", null, true);
        echo " ";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "field_classes", array()), "html", null, true);
        echo "\">
        ";
        // line 14
        $this->displayBlock('contents', $context, $blocks);
        // line 107
        echo "    </div>
";
    }

    // line 14
    public function block_contents($context, array $blocks = array())
    {
        // line 15
        echo "            <div class=\"form-label";
        if ( !(isset($context["vertical"]) ? $context["vertical"] : null)) {
            echo " block size-1-3";
        }
        echo "\">
                ";
        // line 16
        if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "toggleable", array())) {
            // line 17
            echo "                    <span class=\"checkboxes toggleable\" data-grav-field=\"toggleable\" data-grav-field-name=\"";
            echo twig_escape_filter($this->env, (isset($context["field_name"]) ? $context["field_name"] : null), "html", null, true);
            echo "\">
                        <input type=\"checkbox\"
                               id=\"toggleable_";
            // line 19
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "name", array()), "html", null, true);
            echo "\"
                               ";
            // line 20
            if ((isset($context["toggleableChecked"]) ? $context["toggleableChecked"] : null)) {
                echo "value=\"1\"";
            }
            // line 21
            echo "                               name=\"toggleable_";
            echo twig_escape_filter($this->env, (isset($context["field_name"]) ? $context["field_name"] : null), "html", null, true);
            echo "\"
                               ";
            // line 22
            if ((isset($context["toggleableChecked"]) ? $context["toggleableChecked"] : null)) {
                echo "checked=\"checked\"";
            }
            // line 23
            echo "                        >
                        <label for=\"toggleable_";
            // line 24
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "name", array()), "html", null, true);
            echo "\"></label>
                    </span>
                ";
        }
        // line 27
        echo "                <label";
        echo (($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "toggleable", array())) ? (((" class=\"toggleable\" for=\"toggleable_" . $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "name", array())) . "\"")) : (""));
        echo ">
                ";
        // line 28
        $this->displayBlock('label', $context, $blocks);
        // line 44
        echo "                </label>
                ";
        // line 45
        if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "sublabel", array())) {
            // line 46
            echo "                <div class=\"form-sublabel\">
                    ";
            // line 47
            if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "markdown", array())) {
                // line 48
                echo "                        ";
                echo $this->env->getExtension('Grav\Common\Twig\TwigExtension')->markdownFunction($this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "sublabel", array())), false);
                echo "
                    ";
            } else {
                // line 50
                echo "                        ";
                echo $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "sublabel", array()));
                echo "
                    ";
            }
            // line 52
            echo "                </div>
                ";
        }
        // line 54
        echo "            </div>
            <div class=\"form-data";
        // line 55
        if ( !(isset($context["vertical"]) ? $context["vertical"] : null)) {
            echo " block size-2-3";
        }
        echo "\"
                ";
        // line 56
        $this->displayBlock('global_attributes', $context, $blocks);
        // line 61
        echo "            >
                ";
        // line 62
        $this->displayBlock('group', $context, $blocks);
        // line 94
        echo "                ";
        if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "description", array())) {
            // line 95
            echo "                    <div class=\"form-extra-wrapper ";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "size", array()), "html", null, true);
            echo " ";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "wrapper_classes", array()), "html", null, true);
            echo "\">
                        <span class=\"form-description\">
                            ";
            // line 97
            if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "markdown", array())) {
                // line 98
                echo "                                ";
                echo $this->env->getExtension('Grav\Common\Twig\TwigExtension')->markdownFunction($this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "description", array())), false);
                echo "
                            ";
            } else {
                // line 100
                echo "                                ";
                echo $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "description", array()));
                echo "
                            ";
            }
            // line 102
            echo "                        </span>
                    </div>
                ";
        }
        // line 105
        echo "            </div>
        ";
    }

    // line 28
    public function block_label($context, array $blocks = array())
    {
        // line 29
        echo "                    ";
        if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "help", array())) {
            // line 30
            echo "                        ";
            if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "markdown", array())) {
                // line 31
                echo "                            <span class=\"hint--bottom\" data-hint=\"";
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->markdownFunction($this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "help", array())), false), "html");
                echo "\">";
                echo $this->env->getExtension('Grav\Common\Twig\TwigExtension')->markdownFunction($this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "label", array())), false);
                echo "</span>
                        ";
            } else {
                // line 33
                echo "                            <span class=\"hint--bottom\" data-hint=\"";
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "help", array())), "html");
                echo "\">";
                echo $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "label", array()));
                echo "</span>
                        ";
            }
            // line 35
            echo "                    ";
        } else {
            // line 36
            echo "                        ";
            if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "markdown", array())) {
                // line 37
                echo "                            ";
                echo $this->env->getExtension('Grav\Common\Twig\TwigExtension')->markdownFunction($this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "label", array())), false);
                echo "
                        ";
            } else {
                // line 39
                echo "                            ";
                echo $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "label", array()));
                echo "
                        ";
            }
            // line 41
            echo "                    ";
        }
        // line 42
        echo "                    ";
        echo ((twig_in_filter($this->getAttribute($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "validate", array()), "required", array()), array(0 => "on", 1 => "true", 2 => 1))) ? ("<span class=\"required\">*</span>") : (""));
        echo "
                ";
    }

    // line 56
    public function block_global_attributes($context, array $blocks = array())
    {
        // line 57
        echo "                data-grav-field=\"";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "type", array()), "html", null, true);
        echo "\"
                data-grav-disabled=\"";
        // line 58
        echo twig_escape_filter($this->env, (isset($context["toggleableChecked"]) ? $context["toggleableChecked"] : null), "html", null, true);
        echo "\"
                data-grav-default=\"";
        // line 59
        echo twig_escape_filter($this->env, twig_jsonencode_filter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "default", array())), "html_attr");
        echo "\"
                ";
    }

    // line 62
    public function block_group($context, array $blocks = array())
    {
        // line 63
        echo "                    ";
        $this->displayBlock('input', $context, $blocks);
        // line 93
        echo "                ";
    }

    // line 63
    public function block_input($context, array $blocks = array())
    {
        // line 64
        echo "                        <div class=\"form-input-wrapper ";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "size", array()), "html", null, true);
        echo " ";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "wrapper_classes", array()), "html", null, true);
        echo "\">
                            ";
        // line 65
        $this->displayBlock('prepend', $context, $blocks);
        // line 66
        echo "                            <input
                                ";
        // line 68
        echo "                                name=\"";
        echo twig_escape_filter($this->env, (isset($context["field_name"]) ? $context["field_name"] : null), "html", null, true);
        echo "\"
                                value=\"";
        // line 69
        echo twig_escape_filter($this->env, twig_join_filter((isset($context["value"]) ? $context["value"] : null), ", "), "html", null, true);
        echo "\"
                                ";
        // line 70
        if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "key", array())) {
            // line 71
            echo "                                    data-key-observe=\"";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter(((isset($context["scope"]) ? $context["scope"] : null) . (isset($context["field_name"]) ? $context["field_name"] : null))), "html", null, true);
            echo "\"
                                ";
        }
        // line 73
        echo "                                ";
        // line 74
        echo "                                ";
        $this->displayBlock('input_attributes', $context, $blocks);
        // line 89
        echo "                            />
                            ";
        // line 90
        $this->displayBlock('append', $context, $blocks);
        // line 91
        echo "                        </div>
                    ";
    }

    // line 65
    public function block_prepend($context, array $blocks = array())
    {
    }

    // line 74
    public function block_input_attributes($context, array $blocks = array())
    {
        // line 75
        echo "                                    ";
        if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "classes", array(), "any", true, true)) {
            echo "class=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "classes", array()), "html", null, true);
            echo "\" ";
        }
        // line 76
        echo "                                    ";
        if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "id", array(), "any", true, true)) {
            echo "id=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "id", array()));
            echo "\" ";
        }
        // line 77
        echo "                                    ";
        if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "style", array(), "any", true, true)) {
            echo "style=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "style", array()));
            echo "\" ";
        }
        // line 78
        echo "                                    ";
        if (($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "disabled", array()) || (isset($context["isDisabledToggleable"]) ? $context["isDisabledToggleable"] : null))) {
            echo "disabled=\"disabled\"";
        }
        // line 79
        echo "                                    ";
        if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "placeholder", array())) {
            echo "placeholder=\"";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "placeholder", array())), "html", null, true);
            echo "\"";
        }
        // line 80
        echo "                                    ";
        if (twig_in_filter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "autofocus", array()), array(0 => "on", 1 => "true", 2 => 1))) {
            echo "autofocus=\"autofocus\"";
        }
        // line 81
        echo "                                    ";
        if (twig_in_filter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "novalidate", array()), array(0 => "on", 1 => "true", 2 => 1))) {
            echo "novalidate=\"novalidate\"";
        }
        // line 82
        echo "                                    ";
        if (twig_in_filter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "readonly", array()), array(0 => "on", 1 => "true", 2 => 1))) {
            echo "readonly=\"readonly\"";
        }
        // line 83
        echo "                                    ";
        if (twig_in_filter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "autocomplete", array()), array(0 => "on", 1 => "off", 2 => "new-password"))) {
            echo "autocomplete=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "autocomplete", array()), "html", null, true);
            echo "\"";
        }
        // line 84
        echo "                                    ";
        if (twig_in_filter($this->getAttribute($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "validate", array()), "required", array()), array(0 => "on", 1 => "true", 2 => 1))) {
            echo "required=\"required\"";
        }
        // line 85
        echo "                                    ";
        if ($this->getAttribute($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "validate", array()), "pattern", array())) {
            echo "pattern=\"";
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "validate", array()), "pattern", array()), "html", null, true);
            echo "\"";
        }
        // line 86
        echo "                                    ";
        if ($this->getAttribute($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "validate", array()), "message", array())) {
            echo "title=\"";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "validate", array()), "message", array()))), "html", null, true);
            echo "\"
                                    ";
        } elseif ($this->getAttribute(        // line 87
(isset($context["field"]) ? $context["field"] : null), "title", array(), "any", true, true)) {
            echo "title=\"";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "title", array()))), "html", null, true);
            echo "\" ";
        }
        // line 88
        echo "                                ";
    }

    // line 90
    public function block_append($context, array $blocks = array())
    {
    }

    public function getTemplateName()
    {
        return "forms/field.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  427 => 90,  423 => 88,  417 => 87,  410 => 86,  403 => 85,  398 => 84,  391 => 83,  386 => 82,  381 => 81,  376 => 80,  369 => 79,  364 => 78,  357 => 77,  350 => 76,  343 => 75,  340 => 74,  335 => 65,  330 => 91,  328 => 90,  325 => 89,  322 => 74,  320 => 73,  314 => 71,  312 => 70,  308 => 69,  303 => 68,  300 => 66,  298 => 65,  291 => 64,  288 => 63,  284 => 93,  281 => 63,  278 => 62,  272 => 59,  268 => 58,  263 => 57,  260 => 56,  253 => 42,  250 => 41,  244 => 39,  238 => 37,  235 => 36,  232 => 35,  224 => 33,  216 => 31,  213 => 30,  210 => 29,  207 => 28,  202 => 105,  197 => 102,  191 => 100,  185 => 98,  183 => 97,  175 => 95,  172 => 94,  170 => 62,  167 => 61,  165 => 56,  159 => 55,  156 => 54,  152 => 52,  146 => 50,  140 => 48,  138 => 47,  135 => 46,  133 => 45,  130 => 44,  128 => 28,  123 => 27,  117 => 24,  114 => 23,  110 => 22,  105 => 21,  101 => 20,  97 => 19,  91 => 17,  89 => 16,  82 => 15,  79 => 14,  74 => 107,  72 => 14,  58 => 13,  52 => 12,  49 => 11,  45 => 9,  43 => 8,  40 => 7,  38 => 6,  36 => 5,  34 => 4,  32 => 3,  30 => 2,  28 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("{% set originalValue = originalValue is defined ? originalValue : value %}
{% set toggleableChecked = field.toggleable and (originalValue is not null and originalValue is not empty) %}
{% set isDisabledToggleable = field.toggleable and not toggleableChecked %}
{% set value = (value is null ? field.default : value) %}
{% set vertical = field.style == 'vertical' %}
{% set field_name = (scope ~ field.name)|fieldName %}

{% if (field.yaml or field.validate.type == 'yaml') and value is iterable%}
    {% set value = value|toYaml %}
{% endif %}

{% block field %}
    <div class=\"form-field grid{% if vertical %} vertical{% endif %}{% if field.toggleable %} form-field-toggleable{% endif %} {{ field.outerclasses }} {{ field.field_classes }}\">
        {% block contents %}
            <div class=\"form-label{% if not vertical %} block size-1-3{% endif %}\">
                {% if field.toggleable %}
                    <span class=\"checkboxes toggleable\" data-grav-field=\"toggleable\" data-grav-field-name=\"{{ field_name }}\">
                        <input type=\"checkbox\"
                               id=\"toggleable_{{ field.name }}\"
                               {% if toggleableChecked %}value=\"1\"{% endif %}
                               name=\"toggleable_{{ field_name }}\"
                               {% if toggleableChecked %}checked=\"checked\"{% endif %}
                        >
                        <label for=\"toggleable_{{ field.name }}\"></label>
                    </span>
                {% endif %}
                <label{{ (field.toggleable ? ' class=\"toggleable\" for=\"toggleable_' ~ field.name ~ '\"')|raw }}>
                {% block label %}
                    {% if field.help %}
                        {% if field.markdown %}
                            <span class=\"hint--bottom\" data-hint=\"{{ field.help|tu|markdown(false)|e('html') }}\">{{ field.label|tu|markdown(false)|raw }}</span>
                        {% else %}
                            <span class=\"hint--bottom\" data-hint=\"{{ field.help|tu|e('html') }}\">{{ field.label|tu|raw }}</span>
                        {% endif %}
                    {% else %}
                        {% if field.markdown %}
                            {{ field.label|tu|markdown(false)|raw }}
                        {% else %}
                            {{ field.label|tu|raw }}
                        {% endif %}
                    {% endif %}
                    {{ field.validate.required in ['on', 'true', 1] ? '<span class=\"required\">*</span>' }}
                {% endblock %}
                </label>
                {% if field.sublabel %}
                <div class=\"form-sublabel\">
                    {% if field.markdown %}
                        {{ field.sublabel|tu|markdown(false)|raw }}
                    {% else %}
                        {{ field.sublabel|tu|raw }}
                    {% endif %}
                </div>
                {% endif %}
            </div>
            <div class=\"form-data{% if not vertical %} block size-2-3{% endif %}\"
                {% block global_attributes %}
                data-grav-field=\"{{ field.type }}\"
                data-grav-disabled=\"{{ toggleableChecked }}\"
                data-grav-default=\"{{ field.default|json_encode|e('html_attr') }}\"
                {% endblock %}
            >
                {% block group %}
                    {% block input %}
                        <div class=\"form-input-wrapper {{ field.size }} {{ field.wrapper_classes }}\">
                            {% block prepend %}{% endblock prepend %}
                            <input
                                {# required attribute structures #}
                                name=\"{{ field_name }}\"
                                value=\"{{ value|join(', ') }}\"
                                {% if field.key %}
                                    data-key-observe=\"{{ (scope ~ field_name)|fieldName }}\"
                                {% endif %}
                                {# input attribute structures #}
                                {% block input_attributes %}
                                    {% if field.classes is defined %}class=\"{{ field.classes }}\" {% endif %}
                                    {% if field.id is defined %}id=\"{{ field.id|e }}\" {% endif %}
                                    {% if field.style is defined %}style=\"{{ field.style|e }}\" {% endif %}
                                    {% if field.disabled or isDisabledToggleable %}disabled=\"disabled\"{% endif %}
                                    {% if field.placeholder %}placeholder=\"{{ field.placeholder|tu }}\"{% endif %}
                                    {% if field.autofocus in ['on', 'true', 1] %}autofocus=\"autofocus\"{% endif %}
                                    {% if field.novalidate in ['on', 'true', 1] %}novalidate=\"novalidate\"{% endif %}
                                    {% if field.readonly in ['on', 'true', 1] %}readonly=\"readonly\"{% endif %}
                                    {% if field.autocomplete in ['on', 'off', 'new-password'] %}autocomplete=\"{{ field.autocomplete }}\"{% endif %}
                                    {% if field.validate.required in ['on', 'true', 1] %}required=\"required\"{% endif %}
                                    {% if field.validate.pattern %}pattern=\"{{ field.validate.pattern }}\"{% endif %}
                                    {% if field.validate.message %}title=\"{{ field.validate.message|e|tu }}\"
                                    {% elseif field.title is defined %}title=\"{{ field.title|e|tu }}\" {% endif %}
                                {% endblock %}
                            />
                            {% block append %}{% endblock append %}
                        </div>
                    {% endblock %}
                {% endblock %}
                {% if field.description %}
                    <div class=\"form-extra-wrapper {{ field.size }} {{ field.wrapper_classes }}\">
                        <span class=\"form-description\">
                            {% if field.markdown %}
                                {{ field.description|tu|markdown(false)|raw }}
                            {% else %}
                                {{ field.description|tu|raw }}
                            {% endif %}
                        </span>
                    </div>
                {% endif %}
            </div>
        {% endblock %}
    </div>
{% endblock %}
", "forms/field.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/plugins/admin/themes/grav/templates/forms/field.html.twig");
    }
}
