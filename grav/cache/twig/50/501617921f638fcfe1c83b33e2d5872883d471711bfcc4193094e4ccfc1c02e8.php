<?php

/* forms/fields/pagemedia/pagemedia.html.twig */
class __TwigTemplate_4101d277de2f72f79616af38c8e09abb39173c65dd4f49b5378c1863f57e8803 extends Twig_Template
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
        $context["pagemedia"] = $this->getAttribute((isset($context["config"]) ? $context["config"] : null), "get", array(0 => "plugins.admin.pagemedia"), "method");
        // line 3
        $context["pagemedia_settings"] = array("resolution" => array("min" => array("width" => (($this->getAttribute(        // line 6
(isset($context["pagemedia"]) ? $context["pagemedia"] : null), "res_min_width", array())) ? ($this->getAttribute((isset($context["pagemedia"]) ? $context["pagemedia"] : null), "res_min_width", array())) : (null)), "height" => (($this->getAttribute(        // line 7
(isset($context["pagemedia"]) ? $context["pagemedia"] : null), "res_min_height", array())) ? ($this->getAttribute((isset($context["pagemedia"]) ? $context["pagemedia"] : null), "res_min_height", array())) : (null))), "max" => array("width" => (($this->getAttribute(        // line 10
(isset($context["pagemedia"]) ? $context["pagemedia"] : null), "res_max_width", array())) ? ($this->getAttribute((isset($context["pagemedia"]) ? $context["pagemedia"] : null), "res_max_width", array())) : (null)), "height" => (($this->getAttribute(        // line 11
(isset($context["pagemedia"]) ? $context["pagemedia"] : null), "res_max_height", array())) ? ($this->getAttribute((isset($context["pagemedia"]) ? $context["pagemedia"] : null), "res_max_height", array())) : (null)))), "resizeWidth" => (($this->getAttribute(        // line 14
(isset($context["pagemedia"]) ? $context["pagemedia"] : null), "resize_width", array())) ? ($this->getAttribute((isset($context["pagemedia"]) ? $context["pagemedia"] : null), "resize_width", array())) : (null)), "resizeHeight" => (($this->getAttribute(        // line 15
(isset($context["pagemedia"]) ? $context["pagemedia"] : null), "resize_height", array())) ? ($this->getAttribute((isset($context["pagemedia"]) ? $context["pagemedia"] : null), "resize_height", array())) : (null)), "resizeQuality" => (($this->getAttribute(        // line 16
(isset($context["pagemedia"]) ? $context["pagemedia"] : null), "resize_quality", array())) ? ($this->getAttribute((isset($context["pagemedia"]) ? $context["pagemedia"] : null), "resize_quality", array())) : (0.8)));
        // line 18
        echo "
";
        // line 19
        if ($this->getAttribute((isset($context["context"]) ? $context["context"] : null), "folderExists", array())) {
            // line 20
            echo "<div class=\"form-field grid vertical ";
            if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "classes", array(), "any", true, true)) {
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "classes", array()), "html", null, true);
            }
            echo "\">
    <div class=\"form-label\">
        <label>";
            // line 22
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "label", array())), "html", null, true);
            echo "</label>
    </div>
    <div class=\"form-data form-uploads-wrapper\">
        ";
            // line 25
            $context["uploadLimit"] = (($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["grav"]) ? $context["grav"] : null), "config", array()), "system", array()), "media", array()), "upload_limit", array()) / 1024) / 1024);
            // line 26
            echo "        ";
            $context["dropzoneSettings"] = twig_array_merge(array("maxFileSize" => (isset($context["uploadLimit"]) ? $context["uploadLimit"] : null)), (isset($context["pagemedia_settings"]) ? $context["pagemedia_settings"] : null));
            // line 27
            echo "        <div id=\"grav-dropzone\"
             class=\"dropzone\"
             data-media-url=\"";
            // line 29
            echo twig_escape_filter($this->env, (isset($context["base_url"]) ? $context["base_url"] : null), "html", null, true);
            echo "/media/";
            echo twig_escape_filter($this->env, twig_trim_filter($this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "route", array()), "/"), "html", null, true);
            echo ".json\"
             data-media-local=\"";
            // line 30
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->rtrimFilter((isset($context["base_url_relative_frontend"]) ? $context["base_url_relative_frontend"] : null), "/"), "html", null, true);
            echo "/";
            echo twig_escape_filter($this->env, twig_trim_filter($this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "route", array()), "/"), "html", null, true);
            echo "\"
             data-media-path=\"";
            // line 31
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->urlFunc($this->getAttribute((isset($context["context"]) ? $context["context"] : null), "relativePagePath", array())), "html", null, true);
            echo "\"
             data-media-uri=\"";
            // line 32
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["context"]) ? $context["context"] : null), "mediaUri", array()), "html", null, true);
            echo "\"
             data-dropzone-options=\"";
            // line 33
            echo twig_escape_filter($this->env, twig_jsonencode_filter((isset($context["dropzoneSettings"]) ? $context["dropzoneSettings"] : null)), "html_attr");
            echo "\"
             data-dropzone-field=\"";
            // line 34
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter(((isset($context["scope"]) ? $context["scope"] : null) . $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "name", array()))), "html", null, true);
            echo "\"></div>

        ";
            // line 36
            if (($this->getAttribute($this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "session", array()), "expert", array()) == "0")) {
                // line 37
                echo "        <input type=\"hidden\" name=\"";
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter(((isset($context["scope"]) ? $context["scope"] : null) . $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "name", array()))), "html", null, true);
                echo "\" value=\"";
                echo twig_escape_filter($this->env, (isset($context["value"]) ? $context["value"] : null));
                echo "\" />
        ";
            }
            // line 39
            echo "    </div>
</div>
";
        } else {
            // line 42
            echo "<div class=\"form-tab\">
    <div class=\"form-field\">
        <div class=\"form-label\">
            ";
            // line 45
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CANNOT_ADD_MEDIA_FILES_PAGE_NOT_SAVED"), "html", null, true);
            echo "
        </div>
    </div>
</div>
";
        }
    }

    public function getTemplateName()
    {
        return "forms/fields/pagemedia/pagemedia.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  109 => 45,  104 => 42,  99 => 39,  91 => 37,  89 => 36,  84 => 34,  80 => 33,  76 => 32,  72 => 31,  66 => 30,  60 => 29,  56 => 27,  53 => 26,  51 => 25,  45 => 22,  37 => 20,  35 => 19,  32 => 18,  30 => 16,  29 => 15,  28 => 14,  27 => 11,  26 => 10,  25 => 7,  24 => 6,  23 => 3,  21 => 2,  19 => 1,);
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
{% set pagemedia = config.get('plugins.admin.pagemedia') %}
{% set pagemedia_settings = {
    resolution: {
        min: {
            width: pagemedia.res_min_width ?: null,
            height: pagemedia.res_min_height ?: null
        },
        max: {
            width: pagemedia.res_max_width ?: null,
            height: pagemedia.res_max_height ?: null
        }
    },
    resizeWidth: pagemedia.resize_width ?: null,
    resizeHeight: pagemedia.resize_height ?: null,
    resizeQuality: pagemedia.resize_quality ?: 0.8
} %}

{% if context.folderExists %}
<div class=\"form-field grid vertical {% if field.classes is defined %}{{ field.classes }}{% endif %}\">
    <div class=\"form-label\">
        <label>{{ field.label|tu }}</label>
    </div>
    <div class=\"form-data form-uploads-wrapper\">
        {% set uploadLimit = grav.config.system.media.upload_limit / 1024 / 1024 %}
        {% set dropzoneSettings = { maxFileSize: uploadLimit }|merge(pagemedia_settings) %}
        <div id=\"grav-dropzone\"
             class=\"dropzone\"
             data-media-url=\"{{ base_url }}/media/{{ admin.route|trim('/') }}.json\"
             data-media-local=\"{{ base_url_relative_frontend|rtrim('/') }}/{{ admin.route|trim('/') }}\"
             data-media-path=\"{{ url(context.relativePagePath) }}\"
             data-media-uri=\"{{ context.mediaUri }}\"
             data-dropzone-options=\"{{ dropzoneSettings|json_encode|e('html_attr') }}\"
             data-dropzone-field=\"{{ (scope ~ field.name)|fieldName }}\"></div>

        {% if admin.session.expert == '0' %}
        <input type=\"hidden\" name=\"{{ (scope ~ field.name)|fieldName }}\" value=\"{{ value|e }}\" />
        {% endif %}
    </div>
</div>
{% else %}
<div class=\"form-tab\">
    <div class=\"form-field\">
        <div class=\"form-label\">
            {{ \"PLUGIN_ADMIN.CANNOT_ADD_MEDIA_FILES_PAGE_NOT_SAVED\"|tu }}
        </div>
    </div>
</div>
{% endif %}
", "forms/fields/pagemedia/pagemedia.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/plugins/admin/themes/grav/templates/forms/fields/pagemedia/pagemedia.html.twig");
    }
}
