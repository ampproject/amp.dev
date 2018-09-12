<?php

/* forms/fields/editor/editor.html.twig */
class __TwigTemplate_571462a4fa38dcbd2929231267ea6975e28aeedc5d8d82fb77fd83bffc0b2639 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'label' => array($this, 'block_label'),
            'field' => array($this, 'block_field'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        $context["value"] = (((null === (isset($context["value"]) ? $context["value"] : null))) ? ($this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "default", array()))) : ((isset($context["value"]) ? $context["value"] : null)));
        // line 2
        if ( !(isset($context["codemirrorOptions"]) ? $context["codemirrorOptions"] : null)) {
            // line 3
            echo "    ";
            $context["codemirrorOptions"] = twig_array_merge(array("mode" => "gfm", "ignore" => array(0 => "code", 1 => "preview")), (($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "codemirror", array(), "any", true, true)) ? (_twig_default_filter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "codemirror", array()), array())) : (array())));
        }
        // line 5
        echo "
";
        // line 6
        $this->displayBlock('label', $context, $blocks);
        // line 12
        $this->displayBlock('field', $context, $blocks);
    }

    // line 6
    public function block_label($context, array $blocks = array())
    {
        // line 7
        echo "    ";
        if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "label", array())) {
            // line 8
            echo "        ";
            $context["hint"] = (($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "help", array())) ? ((("data-hint=\"" . $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "help", array()))) . "\"")) : (""));
            // line 9
            echo "        <div class=\"form-label form-field hint--bottom\" ";
            echo twig_escape_filter($this->env, (isset($context["hint"]) ? $context["hint"] : null), "html", null, true);
            echo ">";
            echo $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "label", array()));
            echo "</div>
    ";
        }
    }

    // line 12
    public function block_field($context, array $blocks = array())
    {
        // line 13
        echo "    <div class=\"form-field ";
        echo twig_escape_filter($this->env, (($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "classes", array(), "any", true, true)) ? (_twig_default_filter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "classes", array()), "")) : ("")), "html", null, true);
        echo "\">
        <div class=\"form-data grav-editor\">
            <div class=\"grav-editor-content is-active\">
                <textarea
                    data-grav-editor=\"";
        // line 17
        echo twig_escape_filter($this->env, twig_jsonencode_filter(array("codemirror" => (isset($context["codemirrorOptions"]) ? $context["codemirrorOptions"] : null))), "html_attr");
        echo "\"
                    data-grav-editor-mode=\"editor\"
                    name=\"";
        // line 19
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter(((isset($context["scope"]) ? $context["scope"] : null) . $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "name", array()))), "html", null, true);
        echo "\"
                    ";
        // line 20
        if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "classes", array(), "any", true, true)) {
            echo "class=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "classes", array()), "html", null, true);
            echo "\" ";
        }
        // line 21
        echo "                    ";
        if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "id", array(), "any", true, true)) {
            echo "id=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "id", array()));
            echo "\" ";
        }
        // line 22
        echo "                    ";
        if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "style", array(), "any", true, true)) {
            echo "style=\"";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "style", array()));
            echo "\" ";
        }
        // line 23
        echo "                    ";
        if (($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "disabled", array()) || (isset($context["isDisabledToggleable"]) ? $context["isDisabledToggleable"] : null))) {
            echo "disabled=\"disabled\"";
        }
        // line 24
        echo "                    ";
        if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "placeholder", array())) {
            echo "placeholder=\"";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "placeholder", array())), "html", null, true);
            echo "\"";
        }
        // line 25
        echo "                    ";
        if (twig_in_filter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "autofocus", array()), array(0 => "on", 1 => "true", 2 => 1))) {
            echo "autofocus=\"autofocus\"";
        }
        // line 26
        echo "                    ";
        if (twig_in_filter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "novalidate", array()), array(0 => "on", 1 => "true", 2 => 1))) {
            echo "novalidate=\"novalidate\"";
        }
        // line 27
        echo "                    ";
        if (twig_in_filter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "readonly", array()), array(0 => "on", 1 => "true", 2 => 1))) {
            echo "readonly=\"readonly\"";
        }
        // line 28
        echo "                    ";
        if (twig_in_filter($this->getAttribute($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "validate", array()), "required", array()), array(0 => "on", 1 => "true", 2 => 1))) {
            echo "required=\"required\"";
        }
        // line 29
        echo "                    ";
        if (!twig_in_filter("preview", $this->getAttribute((isset($context["codemirrorOptions"]) ? $context["codemirrorOptions"] : null), "ignore", array()))) {
            echo "data-grav-urlpreview=\"";
            echo twig_escape_filter($this->env, (isset($context["base_url"]) ? $context["base_url"] : null), "html", null, true);
            echo "/media/";
            echo twig_escape_filter($this->env, twig_trim_filter($this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "route", array()), "/"), "html", null, true);
            echo ".json\"";
        }
        // line 30
        echo "                >";
        echo twig_escape_filter($this->env, twig_join_filter((isset($context["value"]) ? $context["value"] : null), "
"), "html");
        echo "</textarea>
            </div>
            ";
        // line 32
        if (( !$this->getAttribute((isset($context["field"]) ? $context["field"] : null), "resizer", array(), "any", true, true) || !twig_in_filter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "resizer", array()), array(0 => "off", 1 => "false", 2 => 0)))) {
            echo "<div class=\"grav-editor-resizer\"></div>";
        }
        // line 33
        echo "            ";
        if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "description", array())) {
            // line 34
            echo "                <div class=\"form-extra-wrapper ";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "size", array()), "html", null, true);
            echo " ";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "wrapper_classes", array()), "html", null, true);
            echo "\">
                        <span class=\"form-description\">
                            ";
            // line 36
            if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "markdown", array())) {
                // line 37
                echo "                                ";
                echo $this->env->getExtension('Grav\Common\Twig\TwigExtension')->markdownFunction($this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "description", array())), false);
                echo "
                            ";
            } else {
                // line 39
                echo "                                ";
                echo $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "description", array()));
                echo "
                            ";
            }
            // line 41
            echo "                        </span>
                </div>
            ";
        }
        // line 44
        echo "        </div>
    </div>
";
    }

    public function getTemplateName()
    {
        return "forms/fields/editor/editor.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  179 => 44,  174 => 41,  168 => 39,  162 => 37,  160 => 36,  152 => 34,  149 => 33,  145 => 32,  138 => 30,  129 => 29,  124 => 28,  119 => 27,  114 => 26,  109 => 25,  102 => 24,  97 => 23,  90 => 22,  83 => 21,  77 => 20,  73 => 19,  68 => 17,  60 => 13,  57 => 12,  47 => 9,  44 => 8,  41 => 7,  38 => 6,  34 => 12,  32 => 6,  29 => 5,  25 => 3,  23 => 2,  21 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("{% set value = (value is null ? field.default|tu : value) %}
{% if not codemirrorOptions %}
    {% set codemirrorOptions = {'mode': 'gfm', 'ignore': ['code', 'preview']}|merge(field.codemirror|default({})) %}
{% endif %}

{% block label %}
    {% if field.label %}
        {% set hint = field.help ? 'data-hint=\"' ~ field.help|tu|raw ~ '\"': '' %}
        <div class=\"form-label form-field hint--bottom\" {{ hint }}>{{ field.label|tu|raw }}</div>
    {% endif %}
{% endblock %}
{% block field %}
    <div class=\"form-field {{ field.classes|default('') }}\">
        <div class=\"form-data grav-editor\">
            <div class=\"grav-editor-content is-active\">
                <textarea
                    data-grav-editor=\"{{ {'codemirror': codemirrorOptions} | json_encode|e('html_attr') }}\"
                    data-grav-editor-mode=\"editor\"
                    name=\"{{ (scope ~ field.name)|fieldName }}\"
                    {% if field.classes is defined %}class=\"{{ field.classes }}\" {% endif %}
                    {% if field.id is defined %}id=\"{{ field.id|e }}\" {% endif %}
                    {% if field.style is defined %}style=\"{{ field.style|e }}\" {% endif %}
                    {% if field.disabled or isDisabledToggleable %}disabled=\"disabled\"{% endif %}
                    {% if field.placeholder %}placeholder=\"{{ field.placeholder|tu }}\"{% endif %}
                    {% if field.autofocus in ['on', 'true', 1] %}autofocus=\"autofocus\"{% endif %}
                    {% if field.novalidate in ['on', 'true', 1] %}novalidate=\"novalidate\"{% endif %}
                    {% if field.readonly in ['on', 'true', 1] %}readonly=\"readonly\"{% endif %}
                    {% if field.validate.required in ['on', 'true', 1] %}required=\"required\"{% endif %}
                    {% if 'preview' not in codemirrorOptions.ignore %}data-grav-urlpreview=\"{{ base_url }}/media/{{ admin.route|trim('/') }}.json\"{% endif %}
                >{{ value|join(\"\\n\")|e('html') }}</textarea>
            </div>
            {% if field.resizer is not defined or field.resizer not in ['off', 'false', 0] %}<div class=\"grav-editor-resizer\"></div>{% endif %}
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
    </div>
{% endblock %}
", "forms/fields/editor/editor.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/plugins/admin/themes/grav/templates/forms/fields/editor/editor.html.twig");
    }
}
