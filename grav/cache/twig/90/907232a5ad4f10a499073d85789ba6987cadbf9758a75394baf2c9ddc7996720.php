<?php

/* partials/shortcodes/stage.html.twig */
class __TwigTemplate_9fab2bb24ffa9aacc7afcc6c9a34673a7d9d1987ef2d332ac5b4b6dea227591b extends Twig_Template
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
        echo "<section class=\"ad-o-stage\">
  <div class=\"ad-o-stage-container";
        // line 2
        if ((isset($context["color"]) ? $context["color"] : null)) {
            echo " ad-o-stage-container-bg-";
            echo (isset($context["color"]) ? $context["color"] : null);
        }
        echo "\">
    <div class=\"ad-o-stage-content\">
      ";
        // line 4
        echo (isset($context["content"]) ? $context["content"] : null);
        echo "
    </div>
  </div>
</section>
";
    }

    public function getTemplateName()
    {
        return "partials/shortcodes/stage.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  30 => 4,  22 => 2,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("<section class=\"ad-o-stage\">
  <div class=\"ad-o-stage-container{% if color %} ad-o-stage-container-bg-{{ color }}{% endif %}\">
    <div class=\"ad-o-stage-content\">
      {{ content|raw }}
    </div>
  </div>
</section>
", "partials/shortcodes/stage.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/themes/amp-dev/templates/partials/shortcodes/stage.html.twig");
    }
}
