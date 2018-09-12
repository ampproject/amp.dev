<?php

/* default.html.twig */
class __TwigTemplate_a75a70f21d295f528332f40afd40b2f75738101e083d20117796b78e8ab907c7 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'head' => array($this, 'block_head'),
            'stylesheets' => array($this, 'block_stylesheets'),
            'javascripts' => array($this, 'block_javascripts'),
            'icons' => array($this, 'block_icons'),
            'header' => array($this, 'block_header'),
            'body' => array($this, 'block_body'),
            'content' => array($this, 'block_content'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<!DOCTYPE html>
<html amp lang=\"";
        // line 2
        echo (($this->getAttribute($this->getAttribute((isset($context["grav"]) ? $context["grav"] : null), "language", array()), "getActive", array())) ? ($this->getAttribute($this->getAttribute((isset($context["grav"]) ? $context["grav"] : null), "language", array()), "getActive", array())) : ($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["grav"]) ? $context["grav"] : null), "config", array()), "site", array()), "default_lang", array())));
        echo "\">
<head>
  ";
        // line 4
        $this->displayBlock('head', $context, $blocks);
        // line 33
        echo "</head>

<body>
  <amp-animation id=\"subnavAnim\" layout=\"nodisplay\">
    <script type=\"application/json\">
        {
        \"duration\": \"0500ms\",
        \"fill\": \"both\",
        \"animations\": [
          {
            \"selector\": \".ad-o-header\",
            \"keyframes\": [
              { \"transform\": \"translateY(0%)\" },
              { \"transform\": \"translateY(-50%)\" }
            ]
          }
        ]
      }
    </script>
  </amp-animation>
  <amp-animation id=\"subnavAnimReverse\" layout=\"nodisplay\">
      <script type=\"application/json\">
          {
          \"duration\": \"0500ms\",
          \"fill\": \"both\",
          \"animations\": [
            {
              \"selector\": \".ad-o-header\",
              \"keyframes\": [
                { \"transform\": \"translateY(-50%)\" },
                { \"transform\": \"translateY(0%)\" }
              ]
            }
          ]
        }
      </script>
    </amp-animation>
    ";
        // line 70
        $this->displayBlock('icons', $context, $blocks);
        // line 72
        echo "    <svg style=\"position: absolute; width: 0; height: 0; overflow: hidden;\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">
      ";
        // line 73
        echo $this->getAttribute((isset($context["icons"]) ? $context["icons"] : null), "definitions", array(), "method");
        echo "
    </svg>
  ";
        // line 75
        $this->displayBlock('header', $context, $blocks);
        // line 79
        echo "
  ";
        // line 80
        $this->displayBlock('body', $context, $blocks);
        // line 87
        echo "
  ";
        // line 88
        $this->getAttribute((isset($context["assets"]) ? $context["assets"] : null), "addAmpComponent", array(0 => "amp-font"), "method");
        // line 89
        echo "  <amp-font layout=\"nodisplay\" font-family=\"Noto Sans\" timeout=\"3000\"></amp-font>
  <amp-font layout=\"nodisplay\" font-family=\"Poppins\" timeout=\"3000\"></amp-font>
</body>
";
    }

    // line 4
    public function block_head($context, array $blocks = array())
    {
        // line 5
        echo "  <meta charset=\"utf-8\" />
  <title>
    ";
        // line 7
        if ($this->getAttribute((isset($context["header"]) ? $context["header"] : null), "title", array())) {
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["header"]) ? $context["header"] : null), "title", array()), "html");
            echo " | ";
        }
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["site"]) ? $context["site"] : null), "title", array()), "html");
        echo "
  </title>

  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">
  <meta name=\"viewport\" content=\"width=device-width,minimum-scale=1, initial-scale=1\">
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  ";
        // line 13
        $this->loadTemplate("partials/metadata.html.twig", "default.html.twig", 13)->display($context);
        // line 14
        echo "
  <link rel=\"canonical\" href=\"";
        // line 15
        echo $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "url", array(0 => true, 1 => true), "method");
        echo "\" />

  ";
        // line 17
        $this->displayBlock('stylesheets', $context, $blocks);
        // line 20
        echo "  ";
        echo $this->getAttribute((isset($context["assets"]) ? $context["assets"] : null), "ampCustomCss", array(), "method");
        echo "
  <link href=\"https://fonts.googleapis.com/css?family=Noto+Sans:400,700|Poppins:700\" rel=\"stylesheet\">

  ";
        // line 23
        $this->displayBlock('javascripts', $context, $blocks);
        // line 29
        echo "  ";
        echo $this->getAttribute((isset($context["assets"]) ? $context["assets"] : null), "js", array(), "method");
        echo "
  ";
        // line 30
        echo $this->getAttribute((isset($context["assets"]) ? $context["assets"] : null), "ampComponents", array(), "method");
        echo "

  ";
    }

    // line 17
    public function block_stylesheets($context, array $blocks = array())
    {
        // line 18
        echo "      ";
        $this->getAttribute((isset($context["assets"]) ? $context["assets"] : null), "addCss", array(0 => "theme://css/default.css", 1 => array("loading" => "inline")), "method");
        // line 19
        echo "  ";
    }

    // line 23
    public function block_javascripts($context, array $blocks = array())
    {
        // line 24
        echo "    ";
        $this->getAttribute((isset($context["assets"]) ? $context["assets"] : null), "addJs", array(0 => "https://cdn.ampproject.org/v0.js", 1 => array("loading" => "async")), "method");
        // line 25
        echo "    ";
        $this->getAttribute((isset($context["assets"]) ? $context["assets"] : null), "addAmpComponent", array(0 => "amp-sidebar"), "method");
        // line 26
        echo "    ";
        $this->getAttribute((isset($context["assets"]) ? $context["assets"] : null), "addAmpComponent", array(0 => "amp-animation"), "method");
        // line 27
        echo "
  ";
    }

    // line 70
    public function block_icons($context, array $blocks = array())
    {
        // line 71
        echo "    ";
    }

    // line 75
    public function block_header($context, array $blocks = array())
    {
        // line 76
        echo "
  ";
        // line 77
        $this->loadTemplate("partials/default/header.html.twig", "default.html.twig", 77)->display($context);
        // line 78
        echo "  ";
    }

    // line 80
    public function block_body($context, array $blocks = array())
    {
        // line 81
        echo "  <main id=\"content\">
    ";
        // line 82
        $this->displayBlock('content', $context, $blocks);
        // line 85
        echo "  </main>
  ";
    }

    // line 82
    public function block_content($context, array $blocks = array())
    {
        // line 83
        echo "    ";
        echo $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "content", array());
        echo "
    ";
    }

    public function getTemplateName()
    {
        return "default.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  219 => 83,  216 => 82,  211 => 85,  209 => 82,  206 => 81,  203 => 80,  199 => 78,  197 => 77,  194 => 76,  191 => 75,  187 => 71,  184 => 70,  179 => 27,  176 => 26,  173 => 25,  170 => 24,  167 => 23,  163 => 19,  160 => 18,  157 => 17,  150 => 30,  145 => 29,  143 => 23,  136 => 20,  134 => 17,  129 => 15,  126 => 14,  124 => 13,  111 => 7,  107 => 5,  104 => 4,  97 => 89,  95 => 88,  92 => 87,  90 => 80,  87 => 79,  85 => 75,  80 => 73,  77 => 72,  75 => 70,  36 => 33,  34 => 4,  29 => 2,  26 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("<!DOCTYPE html>
<html amp lang=\"{{ grav.language.getActive ?: grav.config.site.default_lang }}\">
<head>
  {% block head %}
  <meta charset=\"utf-8\" />
  <title>
    {% if header.title %}{{ header.title|e('html') }} | {% endif %}{{ site.title|e('html') }}
  </title>

  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">
  <meta name=\"viewport\" content=\"width=device-width,minimum-scale=1, initial-scale=1\">
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  {% include 'partials/metadata.html.twig' %}

  <link rel=\"canonical\" href=\"{{ page.url(true, true) }}\" />

  {% block stylesheets %}
      {% do assets.addCss('theme://css/default.css', {'loading': 'inline'}) %}
  {% endblock %}
  {{ assets.ampCustomCss() }}
  <link href=\"https://fonts.googleapis.com/css?family=Noto+Sans:400,700|Poppins:700\" rel=\"stylesheet\">

  {% block javascripts %}
    {% do assets.addJs('https://cdn.ampproject.org/v0.js', {'loading': 'async'}) %}
    {% do assets.addAmpComponent('amp-sidebar') %}
    {% do assets.addAmpComponent('amp-animation') %}

  {% endblock %}
  {{ assets.js() }}
  {{ assets.ampComponents() }}

  {% endblock head %}
</head>

<body>
  <amp-animation id=\"subnavAnim\" layout=\"nodisplay\">
    <script type=\"application/json\">
        {
        \"duration\": \"0500ms\",
        \"fill\": \"both\",
        \"animations\": [
          {
            \"selector\": \".ad-o-header\",
            \"keyframes\": [
              { \"transform\": \"translateY(0%)\" },
              { \"transform\": \"translateY(-50%)\" }
            ]
          }
        ]
      }
    </script>
  </amp-animation>
  <amp-animation id=\"subnavAnimReverse\" layout=\"nodisplay\">
      <script type=\"application/json\">
          {
          \"duration\": \"0500ms\",
          \"fill\": \"both\",
          \"animations\": [
            {
              \"selector\": \".ad-o-header\",
              \"keyframes\": [
                { \"transform\": \"translateY(-50%)\" },
                { \"transform\": \"translateY(0%)\" }
              ]
            }
          ]
        }
      </script>
    </amp-animation>
    {% block icons %}
    {% endblock icons %}
    <svg style=\"position: absolute; width: 0; height: 0; overflow: hidden;\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">
      {{ icons.definitions() }}
    </svg>
  {% block header %}

  {% include 'partials/default/header.html.twig' %}
  {% endblock %}

  {% block body %}
  <main id=\"content\">
    {% block content %}
    {{ page.content }}
    {% endblock %}
  </main>
  {% endblock body %}

  {% do assets.addAmpComponent('amp-font') %}
  <amp-font layout=\"nodisplay\" font-family=\"Noto Sans\" timeout=\"3000\"></amp-font>
  <amp-font layout=\"nodisplay\" font-family=\"Poppins\" timeout=\"3000\"></amp-font>
</body>
", "default.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/themes/amp-dev/templates/default.html.twig");
    }
}
