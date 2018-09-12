<?php

/* partials/default/header.html.twig */
class __TwigTemplate_37a30ececf76bbeb75925b2eb3f2720270f7509b276a777434741dfb834e38c1 extends Twig_Template
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
        echo "<header class=\"ad-o-header\">
  ";
        // line 3
        echo "  <nav class=\"ad-o-header-main-nav\">
    <ul class=\"ad-o-header-lnk-list\">
      <li class=\"ad-o-header-lnk\">
        <a class=\"ad-a-ico ad-a-ico-5 ad-a-ico-blue-ribbon \" href=\"/\">";
        // line 6
        echo $this->getAttribute((isset($context["icons"]) ? $context["icons"] : null), "useIcon", array(0 => "logo"), "method");
        echo "</a>
      </li>
      ";
        // line 8
        $context["mainNavigation"] = $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "evaluate", array(0 => array(0 => array("@root" => "/"))), "method"), "visible", array(), "method"), "published", array(), "method"), "routable", array(), "method");
        // line 9
        echo "      ";
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["mainNavigation"]) ? $context["mainNavigation"] : null));
        foreach ($context['_seq'] as $context["_key"] => $context["mainPage"]) {
            // line 10
            echo "      <li class=\"ad-o-header-lnk\">
        ";
            // line 12
            echo "        <a class=\"ad-m-lnk ad-m-lnk-underline-";
            if (($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "title", array()) != "Home")) {
                echo "dark";
            } else {
                echo "light";
            }
            echo "\" href=\"";
            echo $this->getAttribute($context["mainPage"], "route", array());
            echo "\">
          <span class=\"ad-a-txt ad-a-txt-3 ad-a-txt-strong ad-a-txt-";
            // line 13
            if (($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "title", array()) == $this->getAttribute($context["mainPage"], "title", array()))) {
                echo "blue-ribbon";
            } else {
                echo "dark";
            }
            echo "\">";
            echo $this->getAttribute($context["mainPage"], "title", array());
            echo "</span>
        </a>
      </li>
      ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['mainPage'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 17
        echo "    </ul>
  </nav>

  ";
        // line 20
        $context["subNavigation"] = $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "evaluate", array(0 => array(0 => array("@page.children" => $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "route", array())))), "method"), "visible", array(), "method"), "published", array(), "method"), "routable", array(), "method");
        // line 21
        echo "  ";
        if ( !twig_test_empty((isset($context["subNavigation"]) ? $context["subNavigation"] : null))) {
            // line 22
            echo "    ";
            $this->getAttribute((isset($context["assets"]) ? $context["assets"] : null), "addAmpComponent", array(0 => "amp-position-observer"), "method");
            // line 23
            echo "    ";
            $this->getAttribute((isset($context["assets"]) ? $context["assets"] : null), "addAmpComponent", array(0 => "amp-animation"), "method");
            // line 24
            echo "    <amp-position-observer
      intersection-ratios=\"0.5\"
      target=\"content\"
      on=\"enter:subnavAnim.start;exit:subnavAnimReverse.start\"
      layout=\"nodisplay\">
    </amp-position-observer>

    <nav class=\"ad-o-header-sub-nav\">
      <ul class=\"ad-o-header-lnk-list\">
        ";
            // line 33
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable((isset($context["subNavigation"]) ? $context["subNavigation"] : null));
            foreach ($context['_seq'] as $context["_key"] => $context["subPage"]) {
                // line 34
                echo "        <li class=\"ad-o-header-lnk\">
          <a class=\"ad-m-lnk ad-m-lnk-underline-dark\" href=\"";
                // line 35
                echo $this->getAttribute($context["subPage"], "route", array());
                echo "\">
            <span class=\"ad-a-txt ad-a-txt-3 ad-a-txt-strong ad-a-txt-";
                // line 36
                if (($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "title", array()) == $this->getAttribute($context["subPage"], "title", array()))) {
                    echo "blue-ribbon";
                } else {
                    echo "dark";
                }
                echo "\">";
                echo $this->getAttribute($context["subPage"], "title", array());
                echo "</span>
          </a>
        </li>
        ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['subPage'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 40
            echo "      </ul>
    </nav>
  ";
        }
        // line 43
        echo "</header>
";
    }

    public function getTemplateName()
    {
        return "partials/default/header.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  128 => 43,  123 => 40,  107 => 36,  103 => 35,  100 => 34,  96 => 33,  85 => 24,  82 => 23,  79 => 22,  76 => 21,  74 => 20,  69 => 17,  53 => 13,  42 => 12,  39 => 10,  34 => 9,  32 => 8,  27 => 6,  22 => 3,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("<header class=\"ad-o-header\">
  {# TODO: Comparing the title to 'Home' will not work in i18n #}
  <nav class=\"ad-o-header-main-nav\">
    <ul class=\"ad-o-header-lnk-list\">
      <li class=\"ad-o-header-lnk\">
        <a class=\"ad-a-ico ad-a-ico-5 ad-a-ico-blue-ribbon \" href=\"/\">{{ icons.useIcon('logo') }}</a>
      </li>
      {% set mainNavigation = page.evaluate([{'@root':'/'}]).visible().published().routable() %}
      {% for mainPage in mainNavigation %}
      <li class=\"ad-o-header-lnk\">
        {# TODO: Comparing the title to 'Home' will not work in i18n #}
        <a class=\"ad-m-lnk ad-m-lnk-underline-{% if page.title != 'Home' %}dark{% else %}light{% endif %}\" href=\"{{ mainPage.route }}\">
          <span class=\"ad-a-txt ad-a-txt-3 ad-a-txt-strong ad-a-txt-{% if page.title == mainPage.title %}blue-ribbon{% else %}dark{% endif %}\">{{ mainPage.title }}</span>
        </a>
      </li>
      {% endfor %}
    </ul>
  </nav>

  {% set subNavigation = page.evaluate([{'@page.children':page.route}]).visible().published().routable() %}
  {% if subNavigation is not empty  %}
    {% do assets.addAmpComponent('amp-position-observer') %}
    {% do assets.addAmpComponent('amp-animation') %}
    <amp-position-observer
      intersection-ratios=\"0.5\"
      target=\"content\"
      on=\"enter:subnavAnim.start;exit:subnavAnimReverse.start\"
      layout=\"nodisplay\">
    </amp-position-observer>

    <nav class=\"ad-o-header-sub-nav\">
      <ul class=\"ad-o-header-lnk-list\">
        {% for subPage in subNavigation %}
        <li class=\"ad-o-header-lnk\">
          <a class=\"ad-m-lnk ad-m-lnk-underline-dark\" href=\"{{ subPage.route }}\">
            <span class=\"ad-a-txt ad-a-txt-3 ad-a-txt-strong ad-a-txt-{% if page.title == subPage.title %}blue-ribbon{% else %}dark{% endif %}\">{{ subPage.title }}</span>
          </a>
        </li>
        {% endfor %}
      </ul>
    </nav>
  {% endif %}
</header>
", "partials/default/header.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/themes/amp-dev/templates/partials/default/header.html.twig");
    }
}
