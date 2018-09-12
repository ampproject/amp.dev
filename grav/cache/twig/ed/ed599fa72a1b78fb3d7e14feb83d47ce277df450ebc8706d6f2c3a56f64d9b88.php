<?php

/* partials/modal-add-package.html.twig */
class __TwigTemplate_f653597f1af071c9624e65ee694ddea49697266e4ee575e5e0ccc77607e18bc6 extends Twig_Template
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
     data-packages-modal
     data-remodal-id=\"add-package\"
     data-remodal-options=\"hashTracking: false\">
    <form>
        <div class=\"add-package-installing\">
            <h1>";
        // line 7
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.INSTALLING"), "html", null, true);
        echo "</h1>

            <div class=\"loading\">
                <p>
                    ";
        // line 11
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.LOADING"), "html", null, true);
        echo "
                    <span class=\"fa fa-spin fa-spinner\"></span>
                </p>
            </div>

            <div class=\"install-dependencies-package-container hidden\">
                <p><strong>";
        // line 17
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.DEPENDENCIES_NOT_MET_MESSAGE"), "html", null, true);
        echo "</strong></p>

                <div class=\"type-install hidden\">
                    <p>";
        // line 20
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.PACKAGES_NOT_INSTALLED"), "html", null, true);
        echo ":</p>
                    <ul></ul>
                </div>
                <div class=\"type-update hidden\">
                    <p>";
        // line 24
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.PACKAGES_NEED_UPDATE"), "html", null, true);
        echo ":</p>
                    <ul></ul>
                </div>
                <div class=\"type-ignore hidden\">
                    <p>";
        // line 28
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.PACKAGES_SUGGESTED_UPDATE"), "html", null, true);
        echo ":</p>
                    <ul></ul>
                </div>

                <div class=\"button-bar\">
                    <button data-remodal-action=\"cancel\" class=\"button secondary remodal-cancel\"><i class=\"fa fa-fw fa-close\"></i> ";
        // line 33
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CANCEL"), "html", null, true);
        echo "</button>
                    <a data-";
        // line 34
        echo twig_escape_filter($this->env, (isset($context["type"]) ? $context["type"] : null), "html", null, true);
        echo "-action=\"install-dependencies-and-package\" class=\"button\"><i class=\"fa fa-fw fa-check\"></i> ";
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CONTINUE"), "html", null, true);
        echo "</a>
                </div>
            </div>

            <div class=\"install-package-container hidden\">
                <p>
                    ";
        // line 40
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.READY_TO_INSTALL_PACKAGES"), "html", null, true);
        echo "
                </p>

                <ul class=\"packages-names-list\"></ul>

                <div class=\"button-bar\">
                    <button data-remodal-action=\"cancel\" class=\"button secondary remodal-cancel\"><i class=\"fa fa-fw fa-close\"></i> ";
        // line 46
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CANCEL"), "html", null, true);
        echo "</button>
                    <a data-";
        // line 47
        echo twig_escape_filter($this->env, (isset($context["type"]) ? $context["type"] : null), "html", null, true);
        echo "-action=\"install-package\" class=\"button\"><i class=\"fa fa-fw fa-check\"></i> ";
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CONTINUE"), "html", null, true);
        echo "</a>
                </div>
            </div>

            <div class=\"install-package-error hidden\">
                <p>
                    ";
        // line 53
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.ERROR_INSTALLING_PACKAGES"), "html", null, true);
        echo "
                </p>

                <ul class=\"packages-names-list\"></ul>

                <div class=\"button-bar\">
                    <button data-remodal-action=\"cancel\" class=\"button secondary remodal-cancel\"><i class=\"fa fa-fw fa-close\"></i> ";
        // line 59
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CLOSE"), "html", null, true);
        echo "</button>
                </div>
            </div>

            <div class=\"installing-dependencies hidden\">
                <p>
                    ";
        // line 65
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.INSTALLING_DEPENDENCIES"), "html", null, true);
        echo "
                    <span class=\"fa fa-spin fa-spinner\"></span>
                </p>
            </div>

            <div class=\"installing-package hidden\">
                <p>
                    ";
        // line 72
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.INSTALLING_PACKAGES"), "html", null, true);
        echo "
                    <span class=\"fa fa-spin fa-spinner\"></span>
                </p>

                <ul class=\"packages-names-list\"></ul>
            </div>

            <div class=\"installation-complete hidden\">
                <p>
                    ";
        // line 81
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.PACKAGES_SUCCESSFULLY_INSTALLED"), "html", null, true);
        echo "
                </p>

                <ul class=\"packages-names-list\"></ul>
            </div>
        </div>

    </form>
</div>";
    }

    public function getTemplateName()
    {
        return "partials/modal-add-package.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  150 => 81,  138 => 72,  128 => 65,  119 => 59,  110 => 53,  99 => 47,  95 => 46,  86 => 40,  75 => 34,  71 => 33,  63 => 28,  56 => 24,  49 => 20,  43 => 17,  34 => 11,  27 => 7,  19 => 1,);
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
     data-packages-modal
     data-remodal-id=\"add-package\"
     data-remodal-options=\"hashTracking: false\">
    <form>
        <div class=\"add-package-installing\">
            <h1>{{ \"PLUGIN_ADMIN.INSTALLING\"|tu }}</h1>

            <div class=\"loading\">
                <p>
                    {{ \"PLUGIN_ADMIN.LOADING\"|tu }}
                    <span class=\"fa fa-spin fa-spinner\"></span>
                </p>
            </div>

            <div class=\"install-dependencies-package-container hidden\">
                <p><strong>{{ \"PLUGIN_ADMIN.DEPENDENCIES_NOT_MET_MESSAGE\"|tu }}</strong></p>

                <div class=\"type-install hidden\">
                    <p>{{ \"PLUGIN_ADMIN.PACKAGES_NOT_INSTALLED\"|tu }}:</p>
                    <ul></ul>
                </div>
                <div class=\"type-update hidden\">
                    <p>{{ \"PLUGIN_ADMIN.PACKAGES_NEED_UPDATE\"|tu }}:</p>
                    <ul></ul>
                </div>
                <div class=\"type-ignore hidden\">
                    <p>{{ \"PLUGIN_ADMIN.PACKAGES_SUGGESTED_UPDATE\"|tu }}:</p>
                    <ul></ul>
                </div>

                <div class=\"button-bar\">
                    <button data-remodal-action=\"cancel\" class=\"button secondary remodal-cancel\"><i class=\"fa fa-fw fa-close\"></i> {{ \"PLUGIN_ADMIN.CANCEL\"|tu }}</button>
                    <a data-{{ type }}-action=\"install-dependencies-and-package\" class=\"button\"><i class=\"fa fa-fw fa-check\"></i> {{ \"PLUGIN_ADMIN.CONTINUE\"|tu }}</a>
                </div>
            </div>

            <div class=\"install-package-container hidden\">
                <p>
                    {{ \"PLUGIN_ADMIN.READY_TO_INSTALL_PACKAGES\"|tu }}
                </p>

                <ul class=\"packages-names-list\"></ul>

                <div class=\"button-bar\">
                    <button data-remodal-action=\"cancel\" class=\"button secondary remodal-cancel\"><i class=\"fa fa-fw fa-close\"></i> {{ \"PLUGIN_ADMIN.CANCEL\"|tu }}</button>
                    <a data-{{ type }}-action=\"install-package\" class=\"button\"><i class=\"fa fa-fw fa-check\"></i> {{ \"PLUGIN_ADMIN.CONTINUE\"|tu }}</a>
                </div>
            </div>

            <div class=\"install-package-error hidden\">
                <p>
                    {{ \"PLUGIN_ADMIN.ERROR_INSTALLING_PACKAGES\"|tu }}
                </p>

                <ul class=\"packages-names-list\"></ul>

                <div class=\"button-bar\">
                    <button data-remodal-action=\"cancel\" class=\"button secondary remodal-cancel\"><i class=\"fa fa-fw fa-close\"></i> {{ \"PLUGIN_ADMIN.CLOSE\"|tu }}</button>
                </div>
            </div>

            <div class=\"installing-dependencies hidden\">
                <p>
                    {{ \"PLUGIN_ADMIN.INSTALLING_DEPENDENCIES\"|tu }}
                    <span class=\"fa fa-spin fa-spinner\"></span>
                </p>
            </div>

            <div class=\"installing-package hidden\">
                <p>
                    {{ \"PLUGIN_ADMIN.INSTALLING_PACKAGES\"|tu }}
                    <span class=\"fa fa-spin fa-spinner\"></span>
                </p>

                <ul class=\"packages-names-list\"></ul>
            </div>

            <div class=\"installation-complete hidden\">
                <p>
                    {{ \"PLUGIN_ADMIN.PACKAGES_SUCCESSFULLY_INSTALLED\"|tu }}
                </p>

                <ul class=\"packages-names-list\"></ul>
            </div>
        </div>

    </form>
</div>", "partials/modal-add-package.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/plugins/admin/themes/grav/templates/partials/modal-add-package.html.twig");
    }
}
