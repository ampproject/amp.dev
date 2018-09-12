<?php

/* partials/shortcodes/tip.html.twig */
class __TwigTemplate_3217ed48181687da87353e88290d6816092c28a01ca9e3ad3bc476e4582969ff extends Twig_Template
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
        echo "<div class=\"ad-m-tip-container ad-m-tip-";
        echo (isset($context["type"]) ? $context["type"] : null);
        echo "-container\">
  <div class=\"ad-m-tip ad-m-tip-";
        // line 2
        echo (isset($context["type"]) ? $context["type"] : null);
        echo "\">
    ";
        // line 3
        echo (isset($context["content"]) ? $context["content"] : null);
        echo "
  </div>
</div>
";
    }

    public function getTemplateName()
    {
        return "partials/shortcodes/tip.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  28 => 3,  24 => 2,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("<div class=\"ad-m-tip-container ad-m-tip-{{ type }}-container\">
  <div class=\"ad-m-tip ad-m-tip-{{ type }}\">
    {{ content|raw }}
  </div>
</div>
", "partials/shortcodes/tip.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/themes/amp-dev/templates/partials/shortcodes/tip.html.twig");
    }
}
