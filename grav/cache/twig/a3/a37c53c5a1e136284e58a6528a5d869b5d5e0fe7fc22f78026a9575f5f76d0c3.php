<?php

/* partials/modal-remove-package.html.twig */
class __TwigTemplate_19ce9ef4587ca200286e271db50aba65042e6db87aa5e71e71a570d3611d15e7 extends Twig_Template
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
        echo "<div class=\"remodal\"
     data-remodal-id=\"remove-package\"
     data-remodal-options=\"hashTracking: false\">
    <form>
        <div class=\"remove-package-confirm\">
            <h1>";
        // line 6
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.REMOVE_THE", array(0 => $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(("PLUGIN_ADMIN." . twig_upper_filter($this->env, (isset($context["type"]) ? $context["type"] : null)))))), "html", null, true);
        echo "</h1>
            <p class=\"bigger\">
                ";
        // line 8
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CONFIRM_REMOVAL", array(0 => $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(("PLUGIN_ADMIN." . twig_upper_filter($this->env, (isset($context["type"]) ? $context["type"] : null)))))), "html", null, true);
        echo "
            </p>

            <div class=\"button-bar\">
                <button data-remodal-action=\"cancel\" class=\"button secondary remodal-cancel\"><i class=\"fa fa-fw fa-close\"></i> ";
        // line 12
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CANCEL"), "html", null, true);
        echo "</button>
                <button data-";
        // line 13
        echo twig_escape_filter($this->env, (isset($context["type"]) ? $context["type"] : null), "html", null, true);
        echo "-action=\"remove-package\" data-packages-slugs=\"";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["package"]) ? $context["package"] : null), "slug", array()), "html", null, true);
        echo "\" class=\"button\"><i class=\"fa fa-fw fa-check\"></i> ";
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CONTINUE"), "html", null, true);
        echo "</button>
            </div>
        </div>

        <div class=\"remove-package-dependencies hidden\">
            <h1>";
        // line 18
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.REMOVED_SUCCESSFULLY", array(0 => $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(("PLUGIN_ADMIN." . twig_upper_filter($this->env, (isset($context["type"]) ? $context["type"] : null)))))), "html", null, true);
        echo "</h1>
            <p>
                ";
        // line 20
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.ADDITIONAL_DEPENDENCIES_CAN_BE_REMOVED", array(0 => $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(("PLUGIN_ADMIN." . twig_upper_filter($this->env, (isset($context["type"]) ? $context["type"] : null)))))), "html", null, true);
        echo "
            </p>
            <div>
                <ul class=\"package-dependencies-container\"></ul>
            </div>
            <div class=\"button-bar\">
                <a href=\"";
        // line 26
        echo twig_escape_filter($this->env, ((((isset($context["base_url_relative"]) ? $context["base_url_relative"] : null) . "/") . (isset($context["type"]) ? $context["type"] : null)) . "s"), "html", null, true);
        echo "\" class=\"button secondary\"><i class=\"fa fa-fw fa-close\"></i> ";
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CLOSE"), "html", null, true);
        echo "</a>
            </div>
        </div>

        <div class=\"remove-package-done hidden\">
            <h1>";
        // line 31
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.REMOVED_SUCCESSFULLY", array(0 => $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(("PLUGIN_ADMIN." . twig_upper_filter($this->env, (isset($context["type"]) ? $context["type"] : null)))))), "html", null, true);
        echo "</h1>
            <div class=\"button-bar\">
                <a href=\"";
        // line 33
        echo twig_escape_filter($this->env, ((((isset($context["base_url_relative"]) ? $context["base_url_relative"] : null) . "/") . (isset($context["type"]) ? $context["type"] : null)) . "s"), "html", null, true);
        echo "\" class=\"button secondary\"><i class=\"fa fa-fw fa-close\"></i> ";
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CLOSE"), "html", null, true);
        echo "</a>
            </div>
        </div>

        <div class=\"remove-package-error hidden\">
            <h1>";
        // line 38
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.ERROR_REMOVING_THE", array(0 => $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(("PLUGIN_ADMIN." . twig_upper_filter($this->env, (isset($context["type"]) ? $context["type"] : null)))))), "html", null, true);
        echo "</h1>
            <div class=\"button-bar\">
                <button data-remodal-action=\"cancel\" class=\"button secondary remodal-cancel\"><i class=\"fa fa-fw fa-close\"></i> ";
        // line 40
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CANCEL"), "html", null, true);
        echo "</button>
            </div>
        </div>
    </form>
</div>
";
    }

    public function getTemplateName()
    {
        return "partials/modal-remove-package.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  98 => 40,  93 => 38,  83 => 33,  78 => 31,  68 => 26,  59 => 20,  54 => 18,  42 => 13,  38 => 12,  31 => 8,  26 => 6,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("<div class=\"remodal\"
     data-remodal-id=\"remove-package\"
     data-remodal-options=\"hashTracking: false\">
    <form>
        <div class=\"remove-package-confirm\">
            <h1>{{ \"PLUGIN_ADMIN.REMOVE_THE\"|tu([(\"PLUGIN_ADMIN.\" ~ type|upper)|tu]) }}</h1>
            <p class=\"bigger\">
                {{ \"PLUGIN_ADMIN.CONFIRM_REMOVAL\"|tu([(\"PLUGIN_ADMIN.\" ~ type|upper)|tu]) }}
            </p>

            <div class=\"button-bar\">
                <button data-remodal-action=\"cancel\" class=\"button secondary remodal-cancel\"><i class=\"fa fa-fw fa-close\"></i> {{ \"PLUGIN_ADMIN.CANCEL\"|tu }}</button>
                <button data-{{ type }}-action=\"remove-package\" data-packages-slugs=\"{{ package.slug }}\" class=\"button\"><i class=\"fa fa-fw fa-check\"></i> {{ \"PLUGIN_ADMIN.CONTINUE\"|tu }}</button>
            </div>
        </div>

        <div class=\"remove-package-dependencies hidden\">
            <h1>{{ \"PLUGIN_ADMIN.REMOVED_SUCCESSFULLY\"|tu([(\"PLUGIN_ADMIN.\" ~ type|upper)|tu]) }}</h1>
            <p>
                {{ \"PLUGIN_ADMIN.ADDITIONAL_DEPENDENCIES_CAN_BE_REMOVED\"|tu([(\"PLUGIN_ADMIN.\" ~ type|upper)|tu]) }}
            </p>
            <div>
                <ul class=\"package-dependencies-container\"></ul>
            </div>
            <div class=\"button-bar\">
                <a href=\"{{ base_url_relative ~ '/' ~ type ~ 's' }}\" class=\"button secondary\"><i class=\"fa fa-fw fa-close\"></i> {{ \"PLUGIN_ADMIN.CLOSE\"|tu }}</a>
            </div>
        </div>

        <div class=\"remove-package-done hidden\">
            <h1>{{ \"PLUGIN_ADMIN.REMOVED_SUCCESSFULLY\"|tu([(\"PLUGIN_ADMIN.\" ~ type|upper)|tu]) }}</h1>
            <div class=\"button-bar\">
                <a href=\"{{ base_url_relative ~ '/' ~ type ~ 's' }}\" class=\"button secondary\"><i class=\"fa fa-fw fa-close\"></i> {{ \"PLUGIN_ADMIN.CLOSE\"|tu }}</a>
            </div>
        </div>

        <div class=\"remove-package-error hidden\">
            <h1>{{ \"PLUGIN_ADMIN.ERROR_REMOVING_THE\"|tu([(\"PLUGIN_ADMIN.\" ~ type|upper)|tu]) }}</h1>
            <div class=\"button-bar\">
                <button data-remodal-action=\"cancel\" class=\"button secondary remodal-cancel\"><i class=\"fa fa-fw fa-close\"></i> {{ \"PLUGIN_ADMIN.CANCEL\"|tu }}</button>
            </div>
        </div>
    </form>
</div>
", "partials/modal-remove-package.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/plugins/admin/themes/grav/templates/partials/modal-remove-package.html.twig");
    }
}
