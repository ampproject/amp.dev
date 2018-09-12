<?php

/* partials/dashboard-maintenance.html.twig */
class __TwigTemplate_a104695af6f88ec870d47eeae7438a20f40e3f4d09db52a6718e90f948b45d45 extends Twig_Template
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
        if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize(array(0 => "admin.maintenance", 1 => "admin.super"))) {
            // line 2
            echo "    ";
            $context["backup"] = $this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "lastBackup", array(), "method");
            // line 3
            echo "
    <div id=\"updates\" class=\"dashboard-item dashboard-left\">
        <div class=\"secondary-accent default-box-shadow\">
            <h1>";
            // line 6
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.MAINTENANCE"), "html", null, true);
            echo "</h1>
            <div class=\"admin-update-charts\">
                <div class=\"updates-chart\" data-chart-name=\"updates\" data-chart-type=\"pie\" data-chart-data=\"";
            // line 8
            echo twig_escape_filter($this->env, twig_jsonencode_filter(array("series" => array(0 => 100, 1 => 0))), "html_attr");
            echo "\">
                    <div class=\"chart-wrapper\">
                        <div class=\"ct-chart chart-loader\"><i class=\"fa fa-refresh fa-spin\"></i></div>
                        <span class=\"numeric hidden\"><span>-</span><em>";
            // line 11
            echo twig_escape_filter($this->env, twig_lower_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.UPDATED")), "html", null, true);
            echo "</em></span>
                    </div>
                    <p class=\"js__updates-available-description\">&nbsp;</p>
                </div>
                <div class=\"backups-chart\" data-chart-name=\"backups\" data-chart-type=\"pie\" data-chart-data=\"";
            // line 15
            echo twig_escape_filter($this->env, twig_jsonencode_filter(array("series" => array(0 => $this->getAttribute((isset($context["backup"]) ? $context["backup"] : null), "chart_fill", array()), 1 => $this->getAttribute((isset($context["backup"]) ? $context["backup"] : null), "chart_empty", array())))), "html_attr");
            echo "\">
                    <div class=\"chart-wrapper\">
                        <div class=\"ct-chart chart-loader\"><i class=\"fa fa-refresh fa-spin\"></i></div>
                        <span class=\"numeric hidden\">";
            // line 18
            echo $this->getAttribute((isset($context["backup"]) ? $context["backup"] : null), "days", array());
            echo "<em>";
            echo twig_escape_filter($this->env, twig_lower_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.DAYS")), "html", null, true);
            echo "</em></span>
                    </div>
                    <p class=\"hidden\">";
            // line 20
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.LAST_BACKUP"), "html", null, true);
            echo "</p>
                </div>
            </div>

            <div class=\"flush-bottom button-bar\">
                <a class=\"button hidden\" href=\"#\" data-update-packages data-remodal-target=\"update-packages\"  data-plugin-action=\"start-packages-update\"><i class=\"fa fa-cloud-download\"></i> ";
            // line 25
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.UPDATE"), "html", null, true);
            echo "</a>
                <button data-ajax=\"";
            // line 26
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["uri"]) ? $context["uri"] : null), "addNonce", array(0 => ((((isset($context["base_url_relative"]) ? $context["base_url_relative"] : null) . "/backup.json/task") . $this->getAttribute($this->getAttribute((isset($context["config"]) ? $context["config"] : null), "system", array()), "param_sep", array())) . "backup"), 1 => "admin-form", 2 => "admin-nonce"), "method"), "html", null, true);
            echo "\" class=\"button\"><i class=\"fa fa-database\"></i> ";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.BACKUP"), "html", null, true);
            echo "</button>
            </div>
        </div>
    </div>

    ";
            // line 31
            $this->loadTemplate("partials/modal-update-packages.html.twig", "partials/dashboard-maintenance.html.twig", 31)->display(array_merge($context, array("type" => "plugin")));
            // line 32
            echo "
";
        }
    }

    public function getTemplateName()
    {
        return "partials/dashboard-maintenance.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  84 => 32,  82 => 31,  72 => 26,  68 => 25,  60 => 20,  53 => 18,  47 => 15,  40 => 11,  34 => 8,  29 => 6,  24 => 3,  21 => 2,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("{% if authorize(['admin.maintenance', 'admin.super']) %}
    {% set backup = admin.lastBackup() %}

    <div id=\"updates\" class=\"dashboard-item dashboard-left\">
        <div class=\"secondary-accent default-box-shadow\">
            <h1>{{ \"PLUGIN_ADMIN.MAINTENANCE\"|tu }}</h1>
            <div class=\"admin-update-charts\">
                <div class=\"updates-chart\" data-chart-name=\"updates\" data-chart-type=\"pie\" data-chart-data=\"{{ {'series': [100, 0]}|json_encode|e('html_attr') }}\">
                    <div class=\"chart-wrapper\">
                        <div class=\"ct-chart chart-loader\"><i class=\"fa fa-refresh fa-spin\"></i></div>
                        <span class=\"numeric hidden\"><span>-</span><em>{{ \"PLUGIN_ADMIN.UPDATED\"|tu|lower }}</em></span>
                    </div>
                    <p class=\"js__updates-available-description\">&nbsp;</p>
                </div>
                <div class=\"backups-chart\" data-chart-name=\"backups\" data-chart-type=\"pie\" data-chart-data=\"{{ {'series': [backup.chart_fill, backup.chart_empty]}|json_encode|e('html_attr') }}\">
                    <div class=\"chart-wrapper\">
                        <div class=\"ct-chart chart-loader\"><i class=\"fa fa-refresh fa-spin\"></i></div>
                        <span class=\"numeric hidden\">{{ backup.days|raw }}<em>{{ \"PLUGIN_ADMIN.DAYS\"|tu|lower }}</em></span>
                    </div>
                    <p class=\"hidden\">{{ \"PLUGIN_ADMIN.LAST_BACKUP\"|tu }}</p>
                </div>
            </div>

            <div class=\"flush-bottom button-bar\">
                <a class=\"button hidden\" href=\"#\" data-update-packages data-remodal-target=\"update-packages\"  data-plugin-action=\"start-packages-update\"><i class=\"fa fa-cloud-download\"></i> {{ \"PLUGIN_ADMIN.UPDATE\"|tu }}</a>
                <button data-ajax=\"{{ uri.addNonce(base_url_relative ~ '/backup.json/task' ~ config.system.param_sep ~ 'backup', 'admin-form', 'admin-nonce') }}\" class=\"button\"><i class=\"fa fa-database\"></i> {{ \"PLUGIN_ADMIN.BACKUP\"|tu }}</button>
            </div>
        </div>
    </div>

    {% include 'partials/modal-update-packages.html.twig' with { type: 'plugin' } %}

{% endif %}
", "partials/dashboard-maintenance.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/plugins/admin/themes/grav/templates/partials/dashboard-maintenance.html.twig");
    }
}
