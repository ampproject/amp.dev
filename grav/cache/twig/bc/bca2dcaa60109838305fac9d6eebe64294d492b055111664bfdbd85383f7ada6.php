<?php

/* partials/shortcodes/float-image.html.twig */
class __TwigTemplate_e5fe19e4b871b4609f9bac97cac7c2160e588e9b9901cc1fa1f8eb57943adeb3 extends Twig_Template
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
        echo "<div class=\"ad-o-container\">
  <div class=\"ad-m-float-image col-full\">
    ";
        // line 3
        $context["staticImage"] = $this->getAttribute((isset($context["images"]) ? $context["images"] : null), 0, array());
        // line 4
        echo "    <div class=\"ad-a-img ad-a-img-static\">
      <amp-img src=\"";
        // line 5
        echo $this->getAttribute((isset($context["staticImage"]) ? $context["staticImage"] : null), "src", array());
        echo "\" layout=\"responsive\" width=\"";
        echo $this->getAttribute((isset($context["staticImage"]) ? $context["staticImage"] : null), "width", array());
        echo "\" height=\"";
        echo $this->getAttribute((isset($context["staticImage"]) ? $context["staticImage"] : null), "width", array());
        echo "\" alt=\"";
        echo $this->getAttribute((isset($context["staticImage"]) ? $context["staticImage"] : null), "alt", array());
        echo "\"></amp-img>
    </div>

    ";
        // line 8
        $context["parallaxImage"] = $this->getAttribute((isset($context["images"]) ? $context["images"] : null), 1, array());
        // line 9
        echo "    <div class=\"ad-a-img ad-a-img-shadow-static ad-a-img-parallax\">
      ";
        // line 10
        $this->getAttribute((isset($context["assets"]) ? $context["assets"] : null), "addAmpComponent", array(0 => "amp-fx-collection"), "method");
        // line 11
        echo "      <amp-img src=\"";
        echo $this->getAttribute((isset($context["parallaxImage"]) ? $context["parallaxImage"] : null), "src", array());
        echo "\" layout=\"fill\" width=\"";
        echo $this->getAttribute((isset($context["parallaxImage"]) ? $context["parallaxImage"] : null), "width", array());
        echo "\" height=\"";
        echo $this->getAttribute((isset($context["parallaxImage"]) ? $context["parallaxImage"] : null), "width", array());
        echo "\" alt=\"";
        echo $this->getAttribute((isset($context["parallaxImage"]) ? $context["parallaxImage"] : null), "alt", array());
        echo "\" amp-fx=\"parallax\"
\t\t  data-parallax-factor=\"1.1\"></amp-img>
    </div>
  </div>
</div>
";
    }

    public function getTemplateName()
    {
        return "partials/shortcodes/float-image.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  47 => 11,  45 => 10,  42 => 9,  40 => 8,  28 => 5,  25 => 4,  23 => 3,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("<div class=\"ad-o-container\">
  <div class=\"ad-m-float-image col-full\">
    {% set staticImage = images.0 %}
    <div class=\"ad-a-img ad-a-img-static\">
      <amp-img src=\"{{ staticImage.src }}\" layout=\"responsive\" width=\"{{staticImage.width}}\" height=\"{{staticImage.width}}\" alt=\"{{ staticImage.alt}}\"></amp-img>
    </div>

    {% set parallaxImage = images.1 %}
    <div class=\"ad-a-img ad-a-img-shadow-static ad-a-img-parallax\">
      {% do assets.addAmpComponent('amp-fx-collection') %}
      <amp-img src=\"{{ parallaxImage.src }}\" layout=\"fill\" width=\"{{parallaxImage.width}}\" height=\"{{parallaxImage.width}}\" alt=\"{{ parallaxImage.alt}}\" amp-fx=\"parallax\"
\t\t  data-parallax-factor=\"1.1\"></amp-img>
    </div>
  </div>
</div>
", "partials/shortcodes/float-image.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/themes/amp-dev/templates/partials/shortcodes/float-image.html.twig");
    }
}
