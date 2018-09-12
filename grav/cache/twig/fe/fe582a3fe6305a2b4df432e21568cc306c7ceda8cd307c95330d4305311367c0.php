<?php

/* partials/javascript-config.html.twig */
class __TwigTemplate_484d9b461a5fd0ae989570ce98bd6ff35db64a80f9d418d5b414e29280415870 extends Twig_Template
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
        if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize(array(0 => "admin.login", 1 => "admin.super"))) {
            // line 2
            $context["notifications"] = ((((($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["config"]) ? $context["config"] : null), "plugins", array()), "admin", array()), "widgets", array()), "dashboard-notifications", array(), "array") || $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["config"]) ? $context["config"] : null), "plugins", array()), "admin", array()), "notifications", array()), "dashboard", array())) || $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["config"]) ? $context["config"] : null), "plugins", array()), "admin", array()), "notifications", array()), "plugins", array())) || $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["config"]) ? $context["config"] : null), "plugins", array()), "admin", array()), "notifications", array()), "themes", array()))) ? (1) : (0));
            // line 3
            echo "<script type=\"text/javascript\">
    window.GravAdmin = window.GravAdmin || {};
    window.GravAdmin.config = {
        current_url: '";
            // line 6
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["uri"]) ? $context["uri"] : null), "route", array(0 => true), "method"), "html", null, true);
            echo "',
        base_url_relative: '";
            // line 7
            echo twig_escape_filter($this->env, (isset($context["base_url_relative"]) ? $context["base_url_relative"] : null), "html", null, true);
            echo "',
        base_url_simple: '";
            // line 8
            echo twig_escape_filter($this->env, (isset($context["base_url_simple"]) ? $context["base_url_simple"] : null), "html", null, true);
            echo "',
        route: '";
            // line 9
            echo twig_escape_filter($this->env, twig_trim_filter($this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "route", array()), "/"), "html", null, true);
            echo "',
        param_sep: '";
            // line 10
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["config"]) ? $context["config"] : null), "system", array()), "param_sep", array()), "html", null, true);
            echo "',
        ";
            // line 11
            if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize(array(0 => "admin.maintenance", 1 => "admin.super"))) {
                // line 12
                echo "        enable_auto_updates_check: '";
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["config"]) ? $context["config"] : null), "plugins", array()), "admin", array()), "enable_auto_updates_check", array()), "html", null, true);
                echo "',
        ";
            }
            // line 14
            echo "        admin_timeout: '";
            echo twig_escape_filter($this->env, (($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["config"]) ? $context["config"] : null), "plugins", array()), "admin", array()), "session", array()), "timeout", array())) ? ($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["config"]) ? $context["config"] : null), "plugins", array()), "admin", array()), "session", array()), "timeout", array())) : (1800)), "html", null, true);
            echo "',
        admin_nonce: '";
            // line 15
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "getNonce", array()), "html", null, true);
            echo "',
        language: '";
            // line 16
            echo twig_escape_filter($this->env, (($this->getAttribute($this->getAttribute((isset($context["grav"]) ? $context["grav"] : null), "user", array(), "any", false, true), "language", array(), "any", true, true)) ? (_twig_default_filter($this->getAttribute($this->getAttribute((isset($context["grav"]) ? $context["grav"] : null), "user", array(), "any", false, true), "language", array()), "en")) : ("en")), "html", null, true);
            echo "',
        pro_enabled: '";
            // line 17
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["config"]) ? $context["config"] : null), "plugins", array()), "admin-pro", array(), "array"), "enabled", array()), "html", null, true);
            echo "',
        notifications: ";
            // line 18
            echo twig_escape_filter($this->env, (isset($context["notifications"]) ? $context["notifications"] : null), "html", null, true);
            echo ",
        local_notifications: '";
            // line 19
            echo twig_escape_filter($this->env, (($this->getAttribute($this->getAttribute((isset($context["config"]) ? $context["config"] : null), "system", array(), "any", false, true), "local_notifications", array(), "any", true, true)) ? (_twig_default_filter($this->getAttribute($this->getAttribute((isset($context["config"]) ? $context["config"] : null), "system", array(), "any", false, true), "local_notifications", array()), false)) : (false)), "html", null, true);
            echo "',
        site: {
            delimiter: '";
            // line 21
            echo twig_escape_filter($this->env, (($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["config"]) ? $context["config"] : null), "site", array(), "any", false, true), "summary", array(), "any", false, true), "delimiter", array(), "any", true, true)) ? (_twig_default_filter($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["config"]) ? $context["config"] : null), "site", array(), "any", false, true), "summary", array(), "any", false, true), "delimiter", array()), "===")) : ("===")), "html", null, true);
            echo "'
        }
    };
    window.GravAdmin.uri_params = {};

    ";
            // line 26
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable($this->getAttribute($this->getAttribute((isset($context["grav"]) ? $context["grav"] : null), "uri", array()), "params", array(0 => null, 1 => true), "method"));
            foreach ($context['_seq'] as $context["param"] => $context["value"]) {
                // line 27
                echo "        window.GravAdmin.uri_params.";
                echo twig_escape_filter($this->env, $context["param"], "html", null, true);
                echo " = \"";
                echo twig_escape_filter($this->env, twig_replace_filter($context["value"], array("\\" => "/")), "html", null, true);
                echo "\";
    ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['param'], $context['value'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 29
            echo "</script>
";
        }
    }

    public function getTemplateName()
    {
        return "partials/javascript-config.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  105 => 29,  94 => 27,  90 => 26,  82 => 21,  77 => 19,  73 => 18,  69 => 17,  65 => 16,  61 => 15,  56 => 14,  50 => 12,  48 => 11,  44 => 10,  40 => 9,  36 => 8,  32 => 7,  28 => 6,  23 => 3,  21 => 2,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("{% if authorize(['admin.login', 'admin.super']) %}
{% set notifications = (config.plugins.admin.widgets['dashboard-notifications'] or config.plugins.admin.notifications.dashboard or config.plugins.admin.notifications.plugins or config.plugins.admin.notifications.themes) ? 1 : 0 %}
<script type=\"text/javascript\">
    window.GravAdmin = window.GravAdmin || {};
    window.GravAdmin.config = {
        current_url: '{{ uri.route(true) }}',
        base_url_relative: '{{ base_url_relative }}',
        base_url_simple: '{{ base_url_simple }}',
        route: '{{ admin.route|trim('/') }}',
        param_sep: '{{ config.system.param_sep }}',
        {% if authorize(['admin.maintenance', 'admin.super']) %}
        enable_auto_updates_check: '{{ config.plugins.admin.enable_auto_updates_check }}',
        {% endif %}
        admin_timeout: '{{ config.plugins.admin.session.timeout ?: 1800 }}',
        admin_nonce: '{{ admin.getNonce }}',
        language: '{{ grav.user.language|default('en') }}',
        pro_enabled: '{{ config.plugins[\"admin-pro\"].enabled }}',
        notifications: {{ notifications }},
        local_notifications: '{{ config.system.local_notifications|default(false) }}',
        site: {
            delimiter: '{{ config.site.summary.delimiter|default('===') }}'
        }
    };
    window.GravAdmin.uri_params = {};

    {% for param, value in grav.uri.params(null, true) %}
        window.GravAdmin.uri_params.{{param}} = \"{{value|replace({'\\\\': '/'})}}\";
    {% endfor %}
</script>
{% endif %}
", "partials/javascript-config.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/plugins/admin/themes/grav/templates/partials/javascript-config.html.twig");
    }
}
