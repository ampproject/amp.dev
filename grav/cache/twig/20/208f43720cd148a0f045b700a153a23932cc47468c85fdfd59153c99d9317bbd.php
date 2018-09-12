<?php

/* forms/fields/tabs/tabs.html.twig */
class __TwigTemplate_ac2ecba977fbfee6f91bc485a36f0fa2e9e0e7a33b17da4eaf7fe3ed2989b8a2 extends Twig_Template
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
        echo "<div class=\"form-tabs ";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "class", array()), "html", null, true);
        echo " ";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "classes", array()), "html", null, true);
        echo "\">

";
        // line 3
        if ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "fields", array())) {
            // line 4
            echo "
    ";
            // line 5
            $context["tabsKey"] = twig_join_filter(twig_get_array_keys_filter($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "fields", array())), ".");
            // line 6
            echo "    ";
            $context["storedValue"] = $this->env->getExtension('Grav\Common\Twig\TwigExtension')->jsonDecodeFilter(_twig_default_filter($this->env->getExtension('Grav\Common\Twig\TwigExtension')->getCookie("grav-tabs-state"), "{}"));
            // line 7
            echo "    ";
            $context["storedTab"] = $this->getAttribute((isset($context["storedValue"]) ? $context["storedValue"] : null), ("tab-" . (isset($context["tabsKey"]) ? $context["tabsKey"] : null)));
            // line 8
            echo "
    ";
            // line 9
            if (twig_test_empty((isset($context["storedTab"]) ? $context["storedTab"] : null))) {
                // line 10
                echo "        ";
                if ($this->getAttribute($this->getAttribute((isset($context["uri"]) ? $context["uri"] : null), "params", array()), "tab", array())) {
                    // line 11
                    echo "            ";
                    $context["active"] = $this->getAttribute($this->getAttribute((isset($context["uri"]) ? $context["uri"] : null), "params", array()), "tab", array());
                    // line 12
                    echo "        ";
                } elseif ($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "active", array())) {
                    // line 13
                    echo "            ";
                    $context["active"] = $this->getAttribute((isset($context["field"]) ? $context["field"] : null), "active", array());
                    // line 14
                    echo "        ";
                } else {
                    // line 15
                    echo "            ";
                    $context["active"] = 1;
                    // line 16
                    echo "        ";
                }
                // line 17
                echo "    ";
            }
            // line 18
            echo "
    <div class=\"tabs-nav\">
    ";
            // line 20
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable($this->getAttribute((isset($context["field"]) ? $context["field"] : null), "fields", array()));
            $context['loop'] = array(
              'parent' => $context['_parent'],
              'index0' => 0,
              'index'  => 1,
              'first'  => true,
            );
            if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof Countable)) {
                $length = count($context['_seq']);
                $context['loop']['revindex0'] = $length - 1;
                $context['loop']['revindex'] = $length;
                $context['loop']['length'] = $length;
                $context['loop']['last'] = 1 === $length;
            }
            foreach ($context['_seq'] as $context["_key"] => $context["tab"]) {
                // line 21
                echo "        ";
                if ((($this->getAttribute($context["tab"], "type", array()) == "tab") && (twig_test_empty($this->getAttribute($context["tab"], "security", array())) || $this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize($this->env->getExtension('Grav\Common\Twig\TwigExtension')->arrayFilter($this->getAttribute($context["tab"], "security", array())))))) {
                    // line 22
                    echo "            <a class=\"tab__link ";
                    echo (((((isset($context["storedTab"]) ? $context["storedTab"] : null) == ((isset($context["scope"]) ? $context["scope"] : null) . $this->getAttribute($context["tab"], "name", array()))) || ((isset($context["active"]) ? $context["active"] : null) == $this->getAttribute($context["loop"], "index", array())))) ? ("active") : (""));
                    echo "\" data-tabid=\"tab-";
                    echo twig_escape_filter($this->env, ((isset($context["tabsKey"]) ? $context["tabsKey"] : null) . $this->getAttribute($context["loop"], "index", array())), "html", null, true);
                    echo "\" data-tabkey=\"tab-";
                    echo twig_escape_filter($this->env, (isset($context["tabsKey"]) ? $context["tabsKey"] : null), "html", null, true);
                    echo "\" data-scope=\"";
                    echo twig_escape_filter($this->env, ((isset($context["scope"]) ? $context["scope"] : null) . $this->getAttribute($context["tab"], "name", array())), "html", null, true);
                    echo "\">
                <span>
                ";
                    // line 24
                    if ($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["grav"]) ? $context["grav"] : null), "twig", array(), "any", false, true), "twig", array(), "any", false, true), "filters", array(), "any", false, true), "tu", array(), "array", true, true)) {
                        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute($context["tab"], "title", array())), "html", null, true);
                    } else {
                        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->translate($this->getAttribute($context["tab"], "title", array())), "html", null, true);
                    }
                    // line 25
                    echo "                </span>
            </a>
        ";
                }
                // line 28
                echo "    ";
                ++$context['loop']['index0'];
                ++$context['loop']['index'];
                $context['loop']['first'] = false;
                if (isset($context['loop']['length'])) {
                    --$context['loop']['revindex0'];
                    --$context['loop']['revindex'];
                    $context['loop']['last'] = 0 === $context['loop']['revindex0'];
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['tab'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 29
            echo "    </div>
    <div class=\"tabs-content\">
        ";
            // line 31
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable($this->getAttribute($context["field"], "fields", array()));
            $context['loop'] = array(
              'parent' => $context['_parent'],
              'index0' => 0,
              'index'  => 1,
              'first'  => true,
            );
            if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof Countable)) {
                $length = count($context['_seq']);
                $context['loop']['revindex0'] = $length - 1;
                $context['loop']['revindex'] = $length;
                $context['loop']['length'] = $length;
                $context['loop']['last'] = 1 === $length;
            }
            foreach ($context['_seq'] as $context["_key"] => $context["field"]) {
                // line 32
                echo "            ";
                if (($this->getAttribute($context["field"], "type", array()) == "tab")) {
                    // line 33
                    echo "                ";
                    if ((twig_test_empty($this->getAttribute($context["field"], "security", array())) || $this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize($this->env->getExtension('Grav\Common\Twig\TwigExtension')->arrayFilter($this->getAttribute($context["field"], "security", array()))))) {
                        // line 34
                        echo "                    ";
                        $context["value"] = (($this->getAttribute($context["field"], "name", array())) ? ($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "value", array(0 => $this->getAttribute($context["field"], "name", array())), "method")) : ($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "toArray", array())));
                        // line 35
                        echo "                    <div id=\"tab-";
                        echo twig_escape_filter($this->env, ((isset($context["tabsKey"]) ? $context["tabsKey"] : null) . $this->getAttribute($context["loop"], "index", array())), "html", null, true);
                        echo "\" class=\"tab__content ";
                        echo (((((isset($context["storedTab"]) ? $context["storedTab"] : null) == ((isset($context["scope"]) ? $context["scope"] : null) . $this->getAttribute($context["field"], "name", array()))) || ((isset($context["active"]) ? $context["active"] : null) == $this->getAttribute($context["loop"], "index", array())))) ? ("active") : (""));
                        echo "\">
                        ";
                        // line 36
                        $this->loadTemplate(array(0 => (((("forms/fields/" . $this->getAttribute($context["field"], "type", array())) . "/") . $this->getAttribute($context["field"], "type", array())) . ".html.twig"), 1 => "forms/fields/text/text.html.twig"), "forms/fields/tabs/tabs.html.twig", 36)->display($context);
                        // line 37
                        echo "                    </div>
                ";
                    }
                    // line 39
                    echo "            ";
                }
                // line 40
                echo "        ";
                ++$context['loop']['index0'];
                ++$context['loop']['index'];
                $context['loop']['first'] = false;
                if (isset($context['loop']['length'])) {
                    --$context['loop']['revindex0'];
                    --$context['loop']['revindex'];
                    $context['loop']['last'] = 0 === $context['loop']['revindex0'];
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['field'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 41
            echo "    </div>
";
        }
        // line 43
        echo "</div>

";
    }

    public function getTemplateName()
    {
        return "forms/fields/tabs/tabs.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  194 => 43,  190 => 41,  176 => 40,  173 => 39,  169 => 37,  167 => 36,  160 => 35,  157 => 34,  154 => 33,  151 => 32,  134 => 31,  130 => 29,  116 => 28,  111 => 25,  105 => 24,  93 => 22,  90 => 21,  73 => 20,  69 => 18,  66 => 17,  63 => 16,  60 => 15,  57 => 14,  54 => 13,  51 => 12,  48 => 11,  45 => 10,  43 => 9,  40 => 8,  37 => 7,  34 => 6,  32 => 5,  29 => 4,  27 => 3,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("<div class=\"form-tabs {{ field.class }} {{ field.classes }}\">

{% if field.fields %}

    {% set tabsKey = field.fields|keys|join('.') %}
    {% set storedValue = get_cookie('grav-tabs-state')|default('{}')|json_decode %}
    {% set storedTab = attribute(storedValue, 'tab-' ~ tabsKey) %}

    {% if storedTab is empty %}
        {% if uri.params.tab %}
            {% set active = uri.params.tab %}
        {% elseif field.active %}
            {% set active = field.active %}
        {% else %}
            {% set active = 1 %}
        {% endif %}
    {% endif %}

    <div class=\"tabs-nav\">
    {% for tab in field.fields %}
        {% if tab.type == 'tab' and (tab.security is empty or authorize(array(tab.security))) %}
            <a class=\"tab__link {{ (storedTab == scope ~ tab.name) or active == loop.index ? 'active' : '' }}\" data-tabid=\"tab-{{ tabsKey ~ loop.index }}\" data-tabkey=\"tab-{{ tabsKey }}\" data-scope=\"{{ scope ~ tab.name }}\">
                <span>
                {% if grav.twig.twig.filters['tu'] is defined %}{{ tab.title|tu }}{% else %}{{ tab.title|t }}{% endif %}
                </span>
            </a>
        {% endif %}
    {% endfor %}
    </div>
    <div class=\"tabs-content\">
        {% for field in field.fields %}
            {% if field.type == 'tab' %}
                {% if field.security is empty or authorize(array(field.security)) %}
                    {% set value = field.name ? data.value(field.name) : data.toArray %}
                    <div id=\"tab-{{ tabsKey ~ loop.index }}\" class=\"tab__content {{ (storedTab == scope ~ field.name) or active == loop.index ? 'active' : '' }}\">
                        {% include [\"forms/fields/#{field.type}/#{field.type}.html.twig\", 'forms/fields/text/text.html.twig'] %}
                    </div>
                {% endif %}
            {% endif %}
        {% endfor %}
    </div>
{% endif %}
</div>

", "forms/fields/tabs/tabs.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/plugins/admin/themes/grav/templates/forms/fields/tabs/tabs.html.twig");
    }
}
