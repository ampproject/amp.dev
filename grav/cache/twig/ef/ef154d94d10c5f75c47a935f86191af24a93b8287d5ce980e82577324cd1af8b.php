<?php

/* forms/fields/datetime/datetime.html.twig */
class __TwigTemplate_d7b33cf0a56cea55b1854bedafe063a13d2e81bb864a99fe26c4399ad5024661 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("forms/field.html.twig", "forms/fields/datetime/datetime.html.twig", 1);
        $this->blocks = array(
            'input' => array($this, 'block_input'),
            'input_attributes' => array($this, 'block_input_attributes'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "forms/field.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 3
        $context["value"] = (((null === (isset($context["value"]) ? $context["value"] : null))) ? ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "default", array())) : ((isset($context["value"]) ? $context["value"] : null)));
        // line 4
        $context["default_php_dateformat"] = $this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "guessDateFormat", array(0 => (isset($context["value"]) ? $context["value"] : null)), "method");
        // line 5
        $context["php_dateformat"] = (($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "format", array())) ? ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "format", array())) : ((($this->getAttribute($this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "page", array()), "dateformat", array())) ? ($this->getAttribute($this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "page", array()), "dateformat", array())) : ((($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["config"]) ? $context["config"] : null), "system", array()), "pages", array()), "dateformat", array()), "default", array())) ? ($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["config"]) ? $context["config"] : null), "system", array()), "pages", array()), "dateformat", array()), "default", array())) : ((isset($context["default_php_dateformat"]) ? $context["default_php_dateformat"] : null)))))));
        // line 6
        $context["js_dateformat"] = $this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "dateformatToMomentJS", array(0 => (isset($context["php_dateformat"]) ? $context["php_dateformat"] : null)), "method");
        // line 7
        $context["value"] = (((null === (isset($context["value"]) ? $context["value"] : null))) ? ((isset($context["value"]) ? $context["value"] : null)) : (twig_date_format_filter($this->env, (isset($context["value"]) ? $context["value"] : null), (isset($context["php_dateformat"]) ? $context["php_dateformat"] : null))));
        // line 1
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 9
    public function block_input($context, array $blocks = array())
    {
        // line 10
        echo "<div class=\"form-input-wrapper datetime-picker-wrapper ";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "size", array()), "html", null, true);
        echo "\">
    <input
            name=\"";
        // line 12
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter(((isset($context["scope"]) ? $context["scope"] : null) . $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "name", array()))), "html", null, true);
        echo "\"
            value=\"";
        // line 13
        echo twig_escape_filter($this->env, twig_join_filter((isset($context["value"]) ? $context["value"] : null), ", "), "html", null, true);
        echo "\"
            ";
        // line 14
        $this->displayBlock('input_attributes', $context, $blocks);
        // line 21
        echo "    />
    <span class=\"field-icons\">
        <i class=\"fa fa-fw fa-calendar\"></i>
    </span>
</div>
";
    }

    // line 14
    public function block_input_attributes($context, array $blocks = array())
    {
        // line 15
        echo "                type=\"text\"
                data-grav-datetime=\"";
        // line 16
        echo twig_escape_filter($this->env, twig_jsonencode_filter(array("format" => (isset($context["js_dateformat"]) ? $context["js_dateformat"] : null))), "html_attr");
        echo "\"
                ";
        // line 17
        if ($this->getAttribute($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "validate", array()), "min", array())) {
            echo "min=\"";
            echo twig_escape_filter($this->env, (((null === $this->getAttribute($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "validate", array()), "min", array()))) ? ($this->getAttribute($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "validate", array()), "min", array())) : (twig_date_format_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "validate", array()), "min", array()), (isset($context["php_dateformat"]) ? $context["php_dateformat"] : null)))), "html", null, true);
            echo "\"";
        }
        // line 18
        echo "                ";
        if ($this->getAttribute($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "validate", array()), "max", array())) {
            echo "max=\"";
            echo twig_escape_filter($this->env, (((null === $this->getAttribute($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "validate", array()), "max", array()))) ? ($this->getAttribute($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "validate", array()), "max", array())) : (twig_date_format_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "validate", array()), "max", array()), (isset($context["php_dateformat"]) ? $context["php_dateformat"] : null)))), "html", null, true);
            echo "\"";
        }
        // line 19
        echo "                ";
        $this->displayParentBlock("input_attributes", $context, $blocks);
        echo "
            ";
    }

    public function getTemplateName()
    {
        return "forms/fields/datetime/datetime.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  91 => 19,  84 => 18,  78 => 17,  74 => 16,  71 => 15,  68 => 14,  59 => 21,  57 => 14,  53 => 13,  49 => 12,  43 => 10,  40 => 9,  36 => 1,  34 => 7,  32 => 6,  30 => 5,  28 => 4,  26 => 3,  11 => 1,);
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

{% set value = (value is null ? field.default : value) %}
{% set default_php_dateformat = admin.guessDateFormat(value) %}
{% set php_dateformat = field.format ?: admin.page.dateformat ?: config.system.pages.dateformat.default ?: default_php_dateformat %}
{% set js_dateformat = admin.dateformatToMomentJS(php_dateformat) %}
{% set value = (value is null ? value : value|date(php_dateformat)) %}

{% block input %}
<div class=\"form-input-wrapper datetime-picker-wrapper {{ field.size }}\">
    <input
            name=\"{{ (scope ~ field.name)|fieldName }}\"
            value=\"{{ value|raw|join(', ') }}\"
            {% block input_attributes %}
                type=\"text\"
                data-grav-datetime=\"{{ {'format': js_dateformat} | json_encode | e('html_attr') }}\"
                {% if field.validate.min %}min=\"{{ (field.validate.min is null ? field.validate.min : field.validate.min|date(php_dateformat)) }}\"{% endif %}
                {% if field.validate.max %}max=\"{{ (field.validate.max is null ? field.validate.max : field.validate.max|date(php_dateformat)) }}\"{% endif %}
                {{ parent() }}
            {% endblock %}
    />
    <span class=\"field-icons\">
        <i class=\"fa fa-fw fa-calendar\"></i>
    </span>
</div>
{% endblock %}
", "forms/fields/datetime/datetime.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/plugins/admin/themes/grav/templates/forms/fields/datetime/datetime.html.twig");
    }
}
