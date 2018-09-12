<?php

/* partials/modal-reinstall-package.html.twig */
class __TwigTemplate_598aadf2d0bf3ca6b004cb4c8f7733459c8a95550a0d82c69ca65badbb3588a5 extends Twig_Template
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
     data-remodal-id=\"reinstall-package\"
     data-remodal-options=\"hashTracking: false\">
    <form>
        <div class=\"reinstall-package-confirm\">
            <h1>";
        // line 6
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.REINSTALL_THE", array(0 => $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(("PLUGIN_ADMIN." . twig_upper_filter($this->env, (isset($context["type"]) ? $context["type"] : null)))))));
        echo "</h1>
            <p class=\"bigger\">
                ";
        // line 8
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CONFIRM_REINSTALL", array(0 => $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(("PLUGIN_ADMIN." . twig_upper_filter($this->env, (isset($context["type"]) ? $context["type"] : null)))))));
        echo "
            </p>
            <p class=\"bigger hidden warning-reinstall-not-latest-release\">
                ";
        // line 11
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.WARNING_REINSTALL_NOT_LATEST_RELEASE"));
        echo "
            </p>

            <div class=\"button-bar\">
                <button data-remodal-action=\"cancel\" class=\"button secondary remodal-cancel\"><i class=\"fa fa-fw fa-close\"></i> ";
        // line 15
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CANCEL"));
        echo "</button>

                <button data-";
        // line 17
        echo twig_escape_filter($this->env, (isset($context["type"]) ? $context["type"] : null));
        echo "-action=\"reinstall-package\"
                        data-package-slug=\"";
        // line 18
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["package"]) ? $context["package"] : null), "slug", array()));
        echo "\"
                        data-package-type=\"";
        // line 19
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["package"]) ? $context["package"] : null), "package_type", array()));
        echo "\"
                        data-package-name=\"";
        // line 20
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["package"]) ? $context["package"] : null), "name", array()));
        echo "\"
                        data-package-current-version=\"";
        // line 21
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["package"]) ? $context["package"] : null), "version", array()));
        echo "\"
                        class=\"button\"><i class=\"fa fa-fw fa-check\"></i> ";
        // line 22
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CONTINUE"));
        echo "</button>

                <div class=\"spinning-wheel hidden\">
                    ";
        // line 25
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.INSTALLING"));
        echo ".. <i class=\"fa fa-spinner fa-spin\"></i>
                </div>
            </div>
        </div>

        <div class=\"reinstall-package-done hidden\">
            <h1>";
        // line 31
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.REINSTALLED_SUCCESSFULLY", array(0 => $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(("PLUGIN_ADMIN." . twig_upper_filter($this->env, (isset($context["type"]) ? $context["type"] : null)))))));
        echo "</h1>
        </div>

        <div class=\"reinstall-package-error hidden\">
            <h1>";
        // line 35
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.ERROR_REINSTALLING_THE", array(0 => $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(("PLUGIN_ADMIN." . twig_upper_filter($this->env, (isset($context["type"]) ? $context["type"] : null)))))));
        echo "</h1>
        </div>
    </form>
</div>
";
    }

    public function getTemplateName()
    {
        return "partials/modal-reinstall-package.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  91 => 35,  84 => 31,  75 => 25,  69 => 22,  65 => 21,  61 => 20,  57 => 19,  53 => 18,  49 => 17,  44 => 15,  37 => 11,  31 => 8,  26 => 6,  19 => 1,);
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
     data-remodal-id=\"reinstall-package\"
     data-remodal-options=\"hashTracking: false\">
    <form>
        <div class=\"reinstall-package-confirm\">
            <h1>{{ \"PLUGIN_ADMIN.REINSTALL_THE\"|tu([(\"PLUGIN_ADMIN.\" ~ type|upper)|tu])|e }}</h1>
            <p class=\"bigger\">
                {{ \"PLUGIN_ADMIN.CONFIRM_REINSTALL\"|tu([(\"PLUGIN_ADMIN.\" ~ type|upper)|tu])|e }}
            </p>
            <p class=\"bigger hidden warning-reinstall-not-latest-release\">
                {{ \"PLUGIN_ADMIN.WARNING_REINSTALL_NOT_LATEST_RELEASE\"|tu|e }}
            </p>

            <div class=\"button-bar\">
                <button data-remodal-action=\"cancel\" class=\"button secondary remodal-cancel\"><i class=\"fa fa-fw fa-close\"></i> {{ \"PLUGIN_ADMIN.CANCEL\"|tu|e }}</button>

                <button data-{{ type|e }}-action=\"reinstall-package\"
                        data-package-slug=\"{{ package.slug|e }}\"
                        data-package-type=\"{{ package.package_type |e }}\"
                        data-package-name=\"{{ package.name|e }}\"
                        data-package-current-version=\"{{ package.version|e }}\"
                        class=\"button\"><i class=\"fa fa-fw fa-check\"></i> {{ \"PLUGIN_ADMIN.CONTINUE\"|tu|e }}</button>

                <div class=\"spinning-wheel hidden\">
                    {{ \"PLUGIN_ADMIN.INSTALLING\"|tu|e }}.. <i class=\"fa fa-spinner fa-spin\"></i>
                </div>
            </div>
        </div>

        <div class=\"reinstall-package-done hidden\">
            <h1>{{ \"PLUGIN_ADMIN.REINSTALLED_SUCCESSFULLY\"|tu([(\"PLUGIN_ADMIN.\" ~ type|upper)|tu])|e }}</h1>
        </div>

        <div class=\"reinstall-package-error hidden\">
            <h1>{{ \"PLUGIN_ADMIN.ERROR_REINSTALLING_THE\"|tu([(\"PLUGIN_ADMIN.\" ~ type|upper)|tu])|e }}</h1>
        </div>
    </form>
</div>
", "partials/modal-reinstall-package.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/plugins/admin/themes/grav/templates/partials/modal-reinstall-package.html.twig");
    }
}
