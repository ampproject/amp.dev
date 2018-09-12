<?php

/* forms/fields/text/text.html.twig */
class __TwigTemplate_0c256bd94ff04c663ce3b3ccb4cd17b9e53f7d3774d0c817d56ebd0a12dab953 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("forms/field.html.twig", "forms/fields/text/text.html.twig", 1);
        $this->blocks = array(
            'prepend' => array($this, 'block_prepend'),
            'input_attributes' => array($this, 'block_input_attributes'),
            'append' => array($this, 'block_append'),
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
    public function block_prepend($context, array $blocks = array())
    {
        // line 4
        if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "prepend", array())) {
            // line 5
            echo "    <div class=\"form-input-addon form-input-prepend\">
        ";
            // line 6
            if ($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["grav"]) ? $context["grav"] : null), "twig", array(), "any", false, true), "twig", array(), "any", false, true), "filters", array(), "any", false, true), "tu", array(), "array", true, true)) {
                // line 7
                echo $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "prepend", array()));
            } else {
                // line 9
                echo $this->env->getExtension('Grav\Common\Twig\TwigExtension')->translate($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "prepend", array()));
            }
            // line 11
            echo "    </div>
";
        }
    }

    // line 15
    public function block_input_attributes($context, array $blocks = array())
    {
        // line 16
        echo "    type=\"text\"
    ";
        // line 17
        $this->displayParentBlock("input_attributes", $context, $blocks);
        echo "
";
    }

    // line 20
    public function block_append($context, array $blocks = array())
    {
        // line 21
        echo "    ";
        if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "append", array())) {
            // line 22
            echo "        <div class=\"form-input-addon form-input-append\">
            ";
            // line 23
            if ($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["grav"]) ? $context["grav"] : null), "twig", array(), "any", false, true), "twig", array(), "any", false, true), "filters", array(), "any", false, true), "tu", array(), "array", true, true)) {
                // line 24
                echo $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "append", array()));
            } else {
                // line 26
                echo $this->env->getExtension('Grav\Common\Twig\TwigExtension')->translate($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "append", array()));
            }
            // line 28
            echo "        </div>
    ";
        }
    }

    // line 32
    public function block_input($context, array $blocks = array())
    {
        // line 33
        if (($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "prepend", array()) || $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "append", array()))) {
            // line 34
            echo "    ";
            $context["field"] = twig_array_merge((isset($context["field"]) ? $context["field"] : null), array("wrapper_classes" => "form-input-addon-wrapper"));
        }
        // line 36
        $this->displayParentBlock("input", $context, $blocks);
        echo "
";
    }

    public function getTemplateName()
    {
        return "forms/fields/text/text.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  97 => 36,  93 => 34,  91 => 33,  88 => 32,  82 => 28,  79 => 26,  76 => 24,  74 => 23,  71 => 22,  68 => 21,  65 => 20,  59 => 17,  56 => 16,  53 => 15,  47 => 11,  44 => 9,  41 => 7,  39 => 6,  36 => 5,  34 => 4,  31 => 3,  11 => 1,);
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

{% block prepend %}
{% if field.prepend %}
    <div class=\"form-input-addon form-input-prepend\">
        {% if grav.twig.twig.filters['tu'] is defined %}
            {{- field.prepend|tu|raw -}}
        {% else %}
            {{- field.prepend|t|raw -}}
        {% endif %}
    </div>
{% endif %}
{% endblock %}

{% block input_attributes %}
    type=\"text\"
    {{ parent() }}
{% endblock %}

{% block append %}
    {% if field.append %}
        <div class=\"form-input-addon form-input-append\">
            {% if grav.twig.twig.filters['tu'] is defined %}
                {{- field.append|tu|raw -}}
            {% else %}
                {{- field.append|t|raw -}}
            {% endif %}
        </div>
    {% endif %}
{% endblock %}

{% block input %}
{% if field.prepend or field.append %}
    {% set field = field|merge({'wrapper_classes': 'form-input-addon-wrapper'}) %}
{% endif %}
{{ parent() }}
{% endblock %}", "forms/fields/text/text.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/plugins/form/templates/forms/fields/text/text.html.twig");
    }
}
