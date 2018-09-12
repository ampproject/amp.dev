<?php

/* partials/dashboard-statistics.html.twig */
class __TwigTemplate_edb88a7a656a5272e31c3c612dd7d09d3251d0ee89f94be2c0587c1674450a70 extends Twig_Template
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
        if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize(array(0 => "admin.statistics", 1 => "admin.super"))) {
            // line 2
            echo "    <div id=\"popularity\" class=\"dashboard-item dashboard-right\" data-chart-name=\"popularity\" data-chart-type=\"bar\" data-chart-data=\"";
            echo twig_escape_filter($this->env, twig_jsonencode_filter(array("series" => array(0 => $this->getAttribute($this->getAttribute((isset($context["popularity"]) ? $context["popularity"] : null), "getDailyChartData", array()), "data", array(), "array")), "labels" => $this->getAttribute($this->getAttribute((isset($context["popularity"]) ? $context["popularity"] : null), "getDailyChartData", array()), "labels", array(), "array"))), "html_attr");
            echo "\">
        <div class=\"primary-accent default-box-shadow\">
            <h1>";
            // line 4
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.STATISTICS"), "html", null, true);
            echo "</h1>
            <div class=\"admin-statistics-chart\">
                <div class=\"ct-chart chart-loader\"><i class=\"fa fa-refresh fa-spin\"></i></div>
                <div class=\"flush-bottom button-bar stats-bar\">
                    <span class=\"stat\">
                        <b>";
            // line 9
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["popularity"]) ? $context["popularity"] : null), "getDailyTotal", array()), "html", null, true);
            echo "</b>
                        <i>";
            // line 10
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.TODAY"), "html", null, true);
            echo "</i>
                    </span>
                    <span class=\"stat\">
                        <b>";
            // line 13
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["popularity"]) ? $context["popularity"] : null), "getWeeklyTotal", array()), "html", null, true);
            echo "</b>
                        <i>";
            // line 14
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.WEEK"), "html", null, true);
            echo "</i>
                    </span>
                    <span class=\"stat\">
                        <b>";
            // line 17
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["popularity"]) ? $context["popularity"] : null), "getMonthlyTotal", array()), "html", null, true);
            echo "</b>
                        <i>";
            // line 18
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.MONTH"), "html", null, true);
            echo "</i>
                    </span>
                </div>
            </div>
        </div>
    </div>
";
        }
    }

    public function getTemplateName()
    {
        return "partials/dashboard-statistics.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  59 => 18,  55 => 17,  49 => 14,  45 => 13,  39 => 10,  35 => 9,  27 => 4,  21 => 2,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("{% if authorize(['admin.statistics', 'admin.super']) %}
    <div id=\"popularity\" class=\"dashboard-item dashboard-right\" data-chart-name=\"popularity\" data-chart-type=\"bar\" data-chart-data=\"{{ {'series': [popularity.getDailyChartData['data']], 'labels': popularity.getDailyChartData['labels']}|json_encode|e('html_attr') }}\">
        <div class=\"primary-accent default-box-shadow\">
            <h1>{{ \"PLUGIN_ADMIN.STATISTICS\"|tu }}</h1>
            <div class=\"admin-statistics-chart\">
                <div class=\"ct-chart chart-loader\"><i class=\"fa fa-refresh fa-spin\"></i></div>
                <div class=\"flush-bottom button-bar stats-bar\">
                    <span class=\"stat\">
                        <b>{{ popularity.getDailyTotal }}</b>
                        <i>{{ \"PLUGIN_ADMIN.TODAY\"|tu }}</i>
                    </span>
                    <span class=\"stat\">
                        <b>{{ popularity.getWeeklyTotal }}</b>
                        <i>{{ \"PLUGIN_ADMIN.WEEK\"|tu }}</i>
                    </span>
                    <span class=\"stat\">
                        <b>{{ popularity.getMonthlyTotal }}</b>
                        <i>{{ \"PLUGIN_ADMIN.MONTH\"|tu }}</i>
                    </span>
                </div>
            </div>
        </div>
    </div>
{% endif %}
", "partials/dashboard-statistics.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/plugins/admin/themes/grav/templates/partials/dashboard-statistics.html.twig");
    }
}
