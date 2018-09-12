<?php

/* partials/nav.html.twig */
class __TwigTemplate_1209595addc8e19de61dfd3b646f23b60578b01c1dae91ff9bdcdffca3d42981 extends Twig_Template
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
        if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize(array(0 => "admin.login", 1 => "admin.super"))) {
            // line 2
            echo "    <nav id=\"admin-sidebar\" data-quickopen=\"";
            echo ((($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["config"]) ? $context["config"] : null), "plugins", array()), "admin", array()), "sidebar", array()), "activate", array()) == "hover")) ? ("true") : ("false"));
            echo "\" data-quickopen-delay=\"";
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["config"]) ? $context["config"] : null), "plugins", array()), "admin", array()), "sidebar", array()), "hover_delay", array()), "html", null, true);
            echo "\">
        ";
            // line 3
            if (($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["config"]) ? $context["config"] : null), "plugins", array()), "admin", array()), "sidebar", array()), "activate", array()) != "hover")) {
                // line 4
                echo "            <div id=\"open-handle\" data-sidebar-toggle><i class=\"fa fa-angle-right\"></i></div>
        ";
            }
            // line 6
            echo "
        <div id=\"admin-logo\">
            ";
            // line 8
            $this->loadTemplate("partials/logo.html.twig", "partials/nav.html.twig", 8)->display($context);
            // line 9
            echo "        </div>

        ";
            // line 11
            $this->loadTemplate("partials/nav-user-details.html.twig", "partials/nav.html.twig", 11)->display($context);
            // line 12
            echo "
        ";
            // line 13
            $this->loadTemplate("partials/nav-quick-tray.html.twig", "partials/nav.html.twig", 13)->display($context);
            // line 14
            echo "
        <div class=\"admin-menu-wrapper\">
            <ul id=\"admin-menu\">
                <li class=\"";
            // line 17
            echo ((((isset($context["location"]) ? $context["location"] : null) == "dashboard")) ? ("selected") : (""));
            echo "\">
                    <a href=\"";
            // line 18
            echo twig_escape_filter($this->env, (isset($context["base_url_relative"]) ? $context["base_url_relative"] : null), "html", null, true);
            echo "\"><i class=\"fa fa-fw fa-th\"></i><em>";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.DASHBOARD"), "html", null, true);
            echo "</em></a>
                </li>
                ";
            // line 20
            if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize(array(0 => "admin.configuration", 1 => "admin.super"))) {
                // line 21
                echo "                    <li class=\"";
                echo ((((((isset($context["location"]) ? $context["location"] : null) == "system") || ((isset($context["location"]) ? $context["location"] : null) == "site")) || ((isset($context["location"]) ? $context["location"] : null) == "config"))) ? ("selected") : (""));
                echo "\">
                        <a href=\"";
                // line 22
                echo twig_escape_filter($this->env, (isset($context["base_url_relative"]) ? $context["base_url_relative"] : null), "html", null, true);
                echo "/config/system\"><i class=\"fa fa-fw fa-wrench\"></i><em>";
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CONFIGURATION"), "html", null, true);
                echo "</em></a>
                    </li>
                ";
            }
            // line 25
            echo "                ";
            if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize(array(0 => "admin.pages", 1 => "admin.super"))) {
                // line 26
                echo "                    <li class=\"";
                echo ((((isset($context["location"]) ? $context["location"] : null) == "pages")) ? ("selected") : (""));
                echo "\">
                        <a href=\"";
                // line 27
                echo twig_escape_filter($this->env, (isset($context["base_url_relative"]) ? $context["base_url_relative"] : null), "html", null, true);
                echo "/pages\">
                            <i class=\"fa fa-fw fa-file-text-o\"></i>
                            <em>";
                // line 29
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.PAGES"), "html", null, true);
                echo "</em>
                            <span class=\"badges\">
                                <span class=\"badge count\">";
                // line 31
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "pagesCount", array()), "html", null, true);
                echo "</span>
                            </span>
                        </a>
                    </li>
                ";
            }
            // line 36
            echo "                ";
            if ($this->getAttribute($this->getAttribute((isset($context["grav"]) ? $context["grav"] : null), "twig", array()), "plugins_hooked_nav", array())) {
                // line 37
                echo "                    ";
                $context['_parent'] = $context;
                $context['_seq'] = twig_ensure_traversable($this->getAttribute($this->getAttribute((isset($context["grav"]) ? $context["grav"] : null), "twig", array()), "plugins_hooked_nav", array()));
                foreach ($context['_seq'] as $context["label"] => $context["item"]) {
                    // line 38
                    echo "                        ";
                    if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize(((($this->getAttribute($context["item"], "authorize", array(), "any", true, true) && twig_test_iterable($this->getAttribute($context["item"], "authorize", array())))) ? ($this->getAttribute($context["item"], "authorize", array())) : (array(0 => (($this->getAttribute($context["item"], "authorize", array())) ? ($this->getAttribute($context["item"], "authorize", array())) : (("admin." . (($this->getAttribute($context["item"], "location", array())) ? ($this->getAttribute($context["item"], "location", array())) : ($this->getAttribute($context["item"], "route", array())))))), 1 => "admin.super"))))) {
                        // line 39
                        echo "                            <li class=\"";
                        echo ((((isset($context["location"]) ? $context["location"] : null) == (($this->getAttribute($context["item"], "location", array())) ? ($this->getAttribute($context["item"], "location", array())) : ($this->getAttribute($context["item"], "route", array()))))) ? ("selected") : (""));
                        echo "\">
                                <a href=\"";
                        // line 40
                        echo twig_escape_filter($this->env, (isset($context["base_url_relative"]) ? $context["base_url_relative"] : null), "html", null, true);
                        echo "/";
                        echo twig_escape_filter($this->env, (($this->getAttribute($context["item"], "route", array())) ? ($this->getAttribute($context["item"], "route", array())) : ($this->getAttribute($context["item"], "location", array()))), "html", null, true);
                        echo "\">
                                    <i class=\"fa fa-fw ";
                        // line 41
                        echo twig_escape_filter($this->env, $this->getAttribute($context["item"], "icon", array()), "html", null, true);
                        echo "\"></i>
                                    <em>";
                        // line 42
                        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($context["label"]), "html", null, true);
                        echo "</em>
                                    ";
                        // line 43
                        if ($this->getAttribute($context["item"], "badge", array())) {
                            // line 44
                            echo "                                    <span class=\"badges ";
                            if ($this->getAttribute($this->getAttribute($context["item"], "badge", array(), "any", false, true), "updates", array(), "any", true, true)) {
                                echo "with-updates";
                            }
                            echo "\">
                                        ";
                            // line 45
                            if ($this->getAttribute($this->getAttribute($context["item"], "badge", array(), "any", false, true), "updates", array(), "any", true, true)) {
                                echo "<span class=\"badge updates\">";
                                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($context["item"], "badge", array()), "updates", array()), "html", null, true);
                                echo "</span>";
                            }
                            // line 46
                            echo "                                        <span class=\"badge count\">";
                            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($context["item"], "badge", array()), "count", array()), "html", null, true);
                            echo "</span>
                                    </span>
                                    ";
                        }
                        // line 49
                        echo "                                </a>
                            </li>
                        ";
                    }
                    // line 52
                    echo "                    ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['label'], $context['item'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 53
                echo "                ";
            }
            // line 54
            echo "                ";
            if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize(array(0 => "admin.plugins", 1 => "admin.super"))) {
                // line 55
                echo "                    <li class=\"";
                echo ((((isset($context["location"]) ? $context["location"] : null) == "plugins")) ? ("selected") : (""));
                echo "\">
                        <a href=\"";
                // line 56
                echo twig_escape_filter($this->env, (isset($context["base_url_relative"]) ? $context["base_url_relative"] : null), "html", null, true);
                echo "/plugins\">
                            <i class=\"fa fa-fw fa-plug\"></i>
                            <em>";
                // line 58
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.PLUGINS"), "html", null, true);
                echo "</em>
                            <span class=\"badges\">
                                <span class=\"badge updates\"></span>
                                <span class=\"badge count\">";
                // line 61
                echo twig_escape_filter($this->env, twig_length_filter($this->env, $this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "plugins", array())), "html", null, true);
                echo "</span>
                            </span>
                        </a>
                    </li>
                ";
            }
            // line 66
            echo "                ";
            if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize(array(0 => "admin.themes", 1 => "admin.super"))) {
                // line 67
                echo "                    <li class=\"";
                echo ((((isset($context["location"]) ? $context["location"] : null) == "themes")) ? ("selected") : (""));
                echo "\">
                        <a href=\"";
                // line 68
                echo twig_escape_filter($this->env, (isset($context["base_url_relative"]) ? $context["base_url_relative"] : null), "html", null, true);
                echo "/themes\">
                            <i class=\"fa fa-fw fa-tint\"></i>
                            <em>";
                // line 70
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.THEMES"), "html", null, true);
                echo "</em>
                            <span class=\"badges\">
                                <span class=\"badge updates\"></span>
                                <span class=\"badge count\">";
                // line 73
                echo twig_escape_filter($this->env, twig_length_filter($this->env, $this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "themes", array())), "html", null, true);
                echo "</span>
                            </span>
                        </a>
                    </li>
                ";
            }
            // line 78
            echo "                ";
            if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize(array(0 => "admin.tools", 1 => "admin.super"))) {
                // line 79
                echo "                    <li class=\"";
                echo ((((isset($context["location"]) ? $context["location"] : null) == "tools")) ? ("selected") : (""));
                echo "\">
                        <a href=\"";
                // line 80
                echo twig_escape_filter($this->env, (isset($context["base_url_relative"]) ? $context["base_url_relative"] : null), "html", null, true);
                echo "/tools\">
                            <i class=\"fa fa-fw fa-briefcase\"></i>
                            <em>";
                // line 82
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.TOOLS"), "html", null, true);
                echo "</em>
                        </a>
                    </li>
                ";
            }
            // line 86
            echo "
                ";
            // line 87
            try {
                $this->loadTemplate("partials/nav-pro.html.twig", "partials/nav.html.twig", 87)->display($context);
            } catch (Twig_Error_Loader $e) {
                // ignore missing template
            }

            // line 88
            echo "
                <li>
                    <a href=\"";
            // line 90
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["uri"]) ? $context["uri"] : null), "addNonce", array(0 => ((((isset($context["base_url_relative"]) ? $context["base_url_relative"] : null) . "/task") . $this->getAttribute($this->getAttribute((isset($context["config"]) ? $context["config"] : null), "system", array()), "param_sep", array())) . "logout"), 1 => "logout-form", 2 => "logout-nonce"), "method"), "html", null, true);
            echo "\"><i class=\"fa fa-fw fa-sign-out\"></i><em>";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.LOGOUT"), "html", null, true);
            echo "</em></a>
                </li>
            </ul>
        </div>
    </nav>
";
        }
    }

    public function getTemplateName()
    {
        return "partials/nav.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  262 => 90,  258 => 88,  251 => 87,  248 => 86,  241 => 82,  236 => 80,  231 => 79,  228 => 78,  220 => 73,  214 => 70,  209 => 68,  204 => 67,  201 => 66,  193 => 61,  187 => 58,  182 => 56,  177 => 55,  174 => 54,  171 => 53,  165 => 52,  160 => 49,  153 => 46,  147 => 45,  140 => 44,  138 => 43,  134 => 42,  130 => 41,  124 => 40,  119 => 39,  116 => 38,  111 => 37,  108 => 36,  100 => 31,  95 => 29,  90 => 27,  85 => 26,  82 => 25,  74 => 22,  69 => 21,  67 => 20,  60 => 18,  56 => 17,  51 => 14,  49 => 13,  46 => 12,  44 => 11,  40 => 9,  38 => 8,  34 => 6,  30 => 4,  28 => 3,  21 => 2,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("{% if authorize(['admin.login', 'admin.super']) %}
    <nav id=\"admin-sidebar\" data-quickopen=\"{{ config.plugins.admin.sidebar.activate == 'hover' ? 'true' : 'false' }}\" data-quickopen-delay=\"{{ config.plugins.admin.sidebar.hover_delay }}\">
        {% if config.plugins.admin.sidebar.activate != 'hover' %}
            <div id=\"open-handle\" data-sidebar-toggle><i class=\"fa fa-angle-right\"></i></div>
        {% endif %}

        <div id=\"admin-logo\">
            {% include 'partials/logo.html.twig' %}
        </div>

        {% include 'partials/nav-user-details.html.twig' %}

        {% include 'partials/nav-quick-tray.html.twig' %}

        <div class=\"admin-menu-wrapper\">
            <ul id=\"admin-menu\">
                <li class=\"{{ (location == 'dashboard') ? 'selected' : '' }}\">
                    <a href=\"{{ base_url_relative }}\"><i class=\"fa fa-fw fa-th\"></i><em>{{ \"PLUGIN_ADMIN.DASHBOARD\"|tu }}</em></a>
                </li>
                {% if authorize(['admin.configuration', 'admin.super']) %}
                    <li class=\"{{ (location == 'system' or location == 'site' or location == 'config') ? 'selected' : '' }}\">
                        <a href=\"{{ base_url_relative }}/config/system\"><i class=\"fa fa-fw fa-wrench\"></i><em>{{ \"PLUGIN_ADMIN.CONFIGURATION\"|tu }}</em></a>
                    </li>
                {% endif %}
                {% if authorize(['admin.pages', 'admin.super']) %}
                    <li class=\"{{ (location == 'pages') ? 'selected' : '' }}\">
                        <a href=\"{{ base_url_relative }}/pages\">
                            <i class=\"fa fa-fw fa-file-text-o\"></i>
                            <em>{{ \"PLUGIN_ADMIN.PAGES\"|tu }}</em>
                            <span class=\"badges\">
                                <span class=\"badge count\">{{ admin.pagesCount }}</span>
                            </span>
                        </a>
                    </li>
                {% endif %}
                {% if grav.twig.plugins_hooked_nav %}
                    {% for label, item in grav.twig.plugins_hooked_nav %}
                        {% if authorize((item.authorize is defined and item.authorize is iterable) ? item.authorize : [item.authorize ?: ('admin.' ~ (item.location ?: item.route)), 'admin.super']) %}
                            <li class=\"{{ (location == (item.location ?: item.route)) ? 'selected' : '' }}\">
                                <a href=\"{{ base_url_relative }}/{{ item.route ?: item.location }}\">
                                    <i class=\"fa fa-fw {{ item.icon }}\"></i>
                                    <em>{{ label|tu }}</em>
                                    {% if item.badge %}
                                    <span class=\"badges {% if item.badge.updates is defined %}with-updates{% endif %}\">
                                        {% if item.badge.updates is defined %}<span class=\"badge updates\">{{ item.badge.updates }}</span>{% endif %}
                                        <span class=\"badge count\">{{ item.badge.count }}</span>
                                    </span>
                                    {% endif %}
                                </a>
                            </li>
                        {% endif %}
                    {% endfor %}
                {% endif %}
                {% if authorize(['admin.plugins', 'admin.super']) %}
                    <li class=\"{{ (location == 'plugins') ? 'selected' : '' }}\">
                        <a href=\"{{ base_url_relative }}/plugins\">
                            <i class=\"fa fa-fw fa-plug\"></i>
                            <em>{{ \"PLUGIN_ADMIN.PLUGINS\"|tu }}</em>
                            <span class=\"badges\">
                                <span class=\"badge updates\"></span>
                                <span class=\"badge count\">{{ admin.plugins|length }}</span>
                            </span>
                        </a>
                    </li>
                {% endif %}
                {% if authorize(['admin.themes', 'admin.super']) %}
                    <li class=\"{{ (location == 'themes') ? 'selected' : '' }}\">
                        <a href=\"{{ base_url_relative }}/themes\">
                            <i class=\"fa fa-fw fa-tint\"></i>
                            <em>{{ \"PLUGIN_ADMIN.THEMES\"|tu }}</em>
                            <span class=\"badges\">
                                <span class=\"badge updates\"></span>
                                <span class=\"badge count\">{{ admin.themes|length }}</span>
                            </span>
                        </a>
                    </li>
                {% endif %}
                {% if authorize(['admin.tools', 'admin.super']) %}
                    <li class=\"{{ (location == 'tools') ? 'selected' : '' }}\">
                        <a href=\"{{ base_url_relative }}/tools\">
                            <i class=\"fa fa-fw fa-briefcase\"></i>
                            <em>{{ \"PLUGIN_ADMIN.TOOLS\"|tu }}</em>
                        </a>
                    </li>
                {% endif %}

                {% include 'partials/nav-pro.html.twig' ignore missing %}

                <li>
                    <a href=\"{{ uri.addNonce(base_url_relative ~ '/task' ~ config.system.param_sep ~ 'logout', 'logout-form', 'logout-nonce') }}\"><i class=\"fa fa-fw fa-sign-out\"></i><em>{{ \"PLUGIN_ADMIN.LOGOUT\"|tu }}</em></a>
                </li>
            </ul>
        </div>
    </nav>
{% endif %}
", "partials/nav.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/plugins/admin/themes/grav/templates/partials/nav.html.twig");
    }
}
