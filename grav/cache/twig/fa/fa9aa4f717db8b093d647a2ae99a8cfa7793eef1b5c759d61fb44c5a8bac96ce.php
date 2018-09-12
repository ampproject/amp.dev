<?php

/* partials/plugins-details.html.twig */
class __TwigTemplate_20b61824d9b8d236d212b87f560beedc800999e61483ec83f8f5fa9510940c72 extends Twig_Template
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
        $context["gpm"] = $this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "gpm", array(), "method");
        // line 2
        $context["installed"] = $this->getAttribute((isset($context["gpm"]) ? $context["gpm"] : null), "isPluginInstalled", array(0 => $this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "route", array())), "method");
        // line 3
        $context["isTestingRelease"] = $this->getAttribute((isset($context["gpm"]) ? $context["gpm"] : null), "isTestingRelease", array(0 => $this->getAttribute((isset($context["plugin"]) ? $context["plugin"] : null), "slug", array())), "method");
        // line 4
        $context["gumroad_loaded"] = false;
        // line 5
        echo "
<div class=\"grav-update plugin\" data-gpm-plugin=\"";
        // line 6
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "route", array()), "html", null, true);
        echo "\">
</div>

<h1>
    ";
        // line 10
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["plugin"]) ? $context["plugin"] : null), "name", array()));
        echo "
    ";
        // line 11
        if ($this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "isTeamGrav", array(0 => (isset($context["plugin"]) ? $context["plugin"] : null)), "method")) {
            // line 12
            echo "        <small><span class=\"info-reverse\"><i class=\"fa fa-check-circle\" title=\"";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.GRAV_OFFICIAL_PLUGIN"), "html", null, true);
            echo "\"></i></span></small>
    ";
        }
        // line 14
        echo "    ";
        if ($this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "isPremiumProduct", array(0 => (isset($context["plugin"]) ? $context["plugin"] : null)), "method")) {
            // line 15
            echo "        <small><span class=\"badge warning premium\"><i class=\"fa fa-star-o\"></i> ";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.PREMIUM_PRODUCT"), "html", null, true);
            echo "</span></small>
    ";
        }
        // line 17
        echo "    ";
        if ($this->getAttribute((isset($context["plugin"]) ? $context["plugin"] : null), "symlink", array())) {
            // line 18
            echo "    <small class=\"hint--bottom\" data-hint=\"";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.PLUGIN_SYMBOLICALLY_LINKED"), "html", null, true);
            echo "\">
        <i class=\"fa fa-fw fa-link\"></i>
    </small>
    ";
        }
        // line 22
        echo "    <small>";
        echo twig_escape_filter($this->env, (($this->getAttribute((isset($context["plugin"]) ? $context["plugin"] : null), "version", array())) ? (("v" . twig_escape_filter($this->env, $this->getAttribute((isset($context["plugin"]) ? $context["plugin"] : null), "version", array())))) : ("")), "html", null, true);
        echo "</small>
    ";
        // line 23
        if ((isset($context["isTestingRelease"]) ? $context["isTestingRelease"] : null)) {
            echo "<span class=\"gpm-testing\">test release</span>";
        }
        // line 24
        echo "</h1>
<div class=\"gpm-item-info\">
    <i class=\"gpm-item-icon fa fa-fw fa-";
        // line 26
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["plugin"]) ? $context["plugin"] : null), "icon", array()), "html", null, true);
        echo "\"></i>
    ";
        // line 27
        $this->loadTemplate("partials/plugin-data.html.twig", "partials/plugins-details.html.twig", 27)->display(array_merge($context, array("plugin" => (isset($context["plugin"]) ? $context["plugin"] : null))));
        // line 28
        echo "</div>

";
        // line 30
        if ((isset($context["installed"]) ? $context["installed"] : null)) {
            // line 31
            echo "    ";
            $context["data"] = $this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "data", array(0 => ("plugins/" . $this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "route", array()))), "method");
            // line 32
            echo "    ";
            $this->loadTemplate("partials/blueprints.html.twig", "partials/plugins-details.html.twig", 32)->display(array_merge($context, array("data" => (isset($context["data"]) ? $context["data"] : null), "blueprints" => $this->getAttribute((isset($context["data"]) ? $context["data"] : null), "blueprints", array()))));
            // line 33
            echo "
    ";
            // line 34
            if ((($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["plugin"]) ? $context["plugin"] : null), "form", array()), "fields", array()), "enabled", array()), "type", array()) != "hidden") && ($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["plugin"]) ? $context["plugin"] : null), "form", array()), "fields", array()), "tabs", array()), "fields", array()), "login", array()), "fields", array()), "enabled", array()), "type", array()) != "hidden"))) {
                // line 35
                echo "        <div class=\"button-bar danger\">
            <span class=\"danger-zone\"></span>
            ";
                // line 37
                if ( !$this->getAttribute((isset($context["plugin"]) ? $context["plugin"] : null), "symlink", array())) {
                    // line 38
                    echo "                <a class=\"button button-reinstall-package hidden\" href=\"#\" data-remodal-target=\"reinstall-package\"><i class=\"fa fa-fw fa-repeat\"></i> ";
                    echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.REINSTALL_PLUGIN"), "html", null, true);
                    echo "</a>
            ";
                }
                // line 40
                echo "            <a class=\"button\" href=\"#\" data-remodal-target=\"remove-package\"><i class=\"fa fa-fw fa-warning\"></i> ";
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.REMOVE_PLUGIN"), "html", null, true);
                echo "</a>
        </div>
    ";
            }
            // line 43
            echo "
";
        } else {
            // line 45
            echo "    <div class=\"button-bar success\">
        ";
            // line 46
            if (($this->getAttribute((isset($context["plugin"]) ? $context["plugin"] : null), "premium", array()) &&  !$this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "license", array(0 => $this->getAttribute((isset($context["plugin"]) ? $context["plugin"] : null), "slug", array())), "method"))) {
                // line 47
                echo "            ";
                if ( !(isset($context["gumroad_loaded"]) ? $context["gumroad_loaded"] : null)) {
                    // line 48
                    echo "                ";
                    $context["gumroad_loaded"] = true;
                    // line 49
                    echo "                <script src=\"//gumroad.com/js/gumroad.js\"></script>
            ";
                }
                // line 51
                echo "            <a class=\"gumroad-button button\" href=\"https://gum.co/";
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["plugin"]) ? $context["plugin"] : null), "premium", array()), "permalink", array()), "html", null, true);
                echo "\" target=\"_blank\" data-gumroad-single-product=\"true\"><i class=\"fa fa-shopping-cart\"></i> ";
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("Buy Now"), "html", null, true);
                echo "</a>
        ";
            } else {
                // line 53
                echo "            <a class=\"button\" href=\"#\" data-remodal-target=\"add-package\" data-packages-slugs=\"";
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["plugin"]) ? $context["plugin"] : null), "slug", array()), "html", null, true);
                echo "\" data-plugin-action=\"start-package-installation\"><i class=\"fa fa-plus\"></i> ";
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.INSTALL_PLUGIN"), "html", null, true);
                echo "</a>
        ";
            }
            // line 55
            echo "    </div>
";
        }
        // line 57
        echo "
";
        // line 58
        $this->loadTemplate("partials/modal-changes-detected.html.twig", "partials/plugins-details.html.twig", 58)->display($context);
        // line 59
        $this->loadTemplate("partials/modal-add-package.html.twig", "partials/plugins-details.html.twig", 59)->display(array_merge($context, array("type" => "plugin")));
        // line 60
        $this->loadTemplate("partials/modal-update-packages.html.twig", "partials/plugins-details.html.twig", 60)->display(array_merge($context, array("type" => "plugin")));
        // line 61
        $this->loadTemplate("partials/modal-remove-package.html.twig", "partials/plugins-details.html.twig", 61)->display(array_merge($context, array("type" => "plugin", "package" => (isset($context["plugin"]) ? $context["plugin"] : null))));
        // line 62
        $this->loadTemplate("partials/modal-reinstall-package.html.twig", "partials/plugins-details.html.twig", 62)->display(array_merge($context, array("type" => "plugin", "package" => (isset($context["plugin"]) ? $context["plugin"] : null))));
    }

    public function getTemplateName()
    {
        return "partials/plugins-details.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  174 => 62,  172 => 61,  170 => 60,  168 => 59,  166 => 58,  163 => 57,  159 => 55,  151 => 53,  143 => 51,  139 => 49,  136 => 48,  133 => 47,  131 => 46,  128 => 45,  124 => 43,  117 => 40,  111 => 38,  109 => 37,  105 => 35,  103 => 34,  100 => 33,  97 => 32,  94 => 31,  92 => 30,  88 => 28,  86 => 27,  82 => 26,  78 => 24,  74 => 23,  69 => 22,  61 => 18,  58 => 17,  52 => 15,  49 => 14,  43 => 12,  41 => 11,  37 => 10,  30 => 6,  27 => 5,  25 => 4,  23 => 3,  21 => 2,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("{% set gpm = admin.gpm() %}
{% set installed = gpm.isPluginInstalled(admin.route) %}
{% set isTestingRelease = gpm.isTestingRelease(plugin.slug) %}
{% set gumroad_loaded = false %}

<div class=\"grav-update plugin\" data-gpm-plugin=\"{{ admin.route }}\">
</div>

<h1>
    {{ plugin.name|e }}
    {% if admin.isTeamGrav(plugin) %}
        <small><span class=\"info-reverse\"><i class=\"fa fa-check-circle\" title=\"{{ \"PLUGIN_ADMIN.GRAV_OFFICIAL_PLUGIN\"|tu }}\"></i></span></small>
    {% endif %}
    {% if admin.isPremiumProduct(plugin) %}
        <small><span class=\"badge warning premium\"><i class=\"fa fa-star-o\"></i> {{ \"PLUGIN_ADMIN.PREMIUM_PRODUCT\"|tu }}</span></small>
    {% endif %}
    {% if plugin.symlink %}
    <small class=\"hint--bottom\" data-hint=\"{{ \"PLUGIN_ADMIN.PLUGIN_SYMBOLICALLY_LINKED\"|tu }}\">
        <i class=\"fa fa-fw fa-link\"></i>
    </small>
    {% endif %}
    <small>{{ plugin.version ? 'v' ~ plugin.version|e }}</small>
    {% if isTestingRelease %}<span class=\"gpm-testing\">test release</span>{% endif %}
</h1>
<div class=\"gpm-item-info\">
    <i class=\"gpm-item-icon fa fa-fw fa-{{ plugin.icon }}\"></i>
    {% include 'partials/plugin-data.html.twig' with { plugin: plugin } %}
</div>

{% if (installed) %}
    {% set data = admin.data('plugins/' ~ admin.route) %}
    {% include 'partials/blueprints.html.twig' with { data: data, blueprints: data.blueprints } %}

    {% if (plugin.form.fields.enabled.type != 'hidden' and plugin.form.fields.tabs.fields.login.fields.enabled.type != 'hidden') %}
        <div class=\"button-bar danger\">
            <span class=\"danger-zone\"></span>
            {% if not plugin.symlink %}
                <a class=\"button button-reinstall-package hidden\" href=\"#\" data-remodal-target=\"reinstall-package\"><i class=\"fa fa-fw fa-repeat\"></i> {{ \"PLUGIN_ADMIN.REINSTALL_PLUGIN\"|tu }}</a>
            {% endif %}
            <a class=\"button\" href=\"#\" data-remodal-target=\"remove-package\"><i class=\"fa fa-fw fa-warning\"></i> {{ \"PLUGIN_ADMIN.REMOVE_PLUGIN\"|tu }}</a>
        </div>
    {% endif %}

{% else %}
    <div class=\"button-bar success\">
        {% if (plugin.premium and not admin.license(plugin.slug)) %}
            {% if not gumroad_loaded %}
                {% set gumroad_loaded = true %}
                <script src=\"//gumroad.com/js/gumroad.js\"></script>
            {% endif %}
            <a class=\"gumroad-button button\" href=\"https://gum.co/{{ plugin.premium.permalink }}\" target=\"_blank\" data-gumroad-single-product=\"true\"><i class=\"fa fa-shopping-cart\"></i> {{ \"Buy Now\"|tu }}</a>
        {% else %}
            <a class=\"button\" href=\"#\" data-remodal-target=\"add-package\" data-packages-slugs=\"{{ plugin.slug }}\" data-plugin-action=\"start-package-installation\"><i class=\"fa fa-plus\"></i> {{ \"PLUGIN_ADMIN.INSTALL_PLUGIN\"|tu }}</a>
        {% endif %}
    </div>
{% endif %}

{% include 'partials/modal-changes-detected.html.twig' %}
{% include 'partials/modal-add-package.html.twig' with { type: 'plugin' } %}
{% include 'partials/modal-update-packages.html.twig' with { type: 'plugin' } %}
{% include 'partials/modal-remove-package.html.twig' with { type: 'plugin', package: plugin } %}
{% include 'partials/modal-reinstall-package.html.twig' with { type: 'plugin', package: plugin } %}
", "partials/plugins-details.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/plugins/admin/themes/grav/templates/partials/plugins-details.html.twig");
    }
}
