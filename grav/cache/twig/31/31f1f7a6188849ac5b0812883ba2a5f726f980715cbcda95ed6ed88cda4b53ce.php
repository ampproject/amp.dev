<?php

/* partials/list-sort.html.twig */
class __TwigTemplate_46f44f50444b36a8c3352e21d310b69cfd0af6f56b9c57eae340f7aac032c581 extends Twig_Template
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
        echo "<div class=\"sort-actions\" data-grav-selectize=\"true\">
    <select>
        <option value=\"name\" selected>";
        // line 3
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.NAME"), "html", null, true);
        echo "</option>
        <option value=\"author\">";
        // line 4
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.AUTHOR"), "html", null, true);
        echo "</option>
        <option value=\"official\">GravTeam</option>
        <option value=\"release-date\">";
        // line 6
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.RELEASE_DATE"), "html", null, true);
        echo "</option>
        ";
        // line 7
        if ((((isset($context["list_view"]) ? $context["list_view"] : null) == "plugins") &&  !(isset($context["installing"]) ? $context["installing"] : null))) {
            echo "<option value=\"enabled\">";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.ENABLED"), "html", null, true);
            echo "</option>";
        }
        // line 8
        echo "        ";
        if ( !(isset($context["installing"]) ? $context["installing"] : null)) {
            echo "<option value=\"updatable\">";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.UPDATES_AVAILABLE"), "html", null, true);
            echo "</option>";
        }
        // line 9
        echo "        ";
        if (($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["config"]) ? $context["config"] : null), "system", array()), "gpm", array()), "releases", array()) == "testing")) {
            echo "<option value=\"testing\">";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.TESTING"), "html", null, true);
            echo "</option>";
        }
        // line 10
        echo "    </select>
    <div class=\"sort-icon\"><i class=\"fa fa-fw fa-sort-amount-asc\"></i></div>
</div>
";
    }

    public function getTemplateName()
    {
        return "partials/list-sort.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  56 => 10,  49 => 9,  42 => 8,  36 => 7,  32 => 6,  27 => 4,  23 => 3,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("<div class=\"sort-actions\" data-grav-selectize=\"true\">
    <select>
        <option value=\"name\" selected>{{ \"PLUGIN_ADMIN.NAME\"|tu }}</option>
        <option value=\"author\">{{ \"PLUGIN_ADMIN.AUTHOR\"|tu }}</option>
        <option value=\"official\">GravTeam</option>
        <option value=\"release-date\">{{ \"PLUGIN_ADMIN.RELEASE_DATE\"|tu }}</option>
        {% if list_view == 'plugins' and not installing %}<option value=\"enabled\">{{ \"PLUGIN_ADMIN.ENABLED\"|tu }}</option>{% endif %}
        {% if not installing %}<option value=\"updatable\">{{ \"PLUGIN_ADMIN.UPDATES_AVAILABLE\"|tu }}</option>{% endif %}
        {% if config.system.gpm.releases == 'testing' %}<option value=\"testing\">{{ \"PLUGIN_ADMIN.TESTING\"|tu }}</option>{% endif %}
    </select>
    <div class=\"sort-icon\"><i class=\"fa fa-fw fa-sort-amount-asc\"></i></div>
</div>
", "partials/list-sort.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/plugins/admin/themes/grav/templates/partials/list-sort.html.twig");
    }
}
