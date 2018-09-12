<?php

/* partials/login.html.twig */
class __TwigTemplate_dd8b530706b8b4c084bc0d9115c3b942b42ef249c7224997f0229a1f1829a40a extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("partials/base.html.twig", "partials/login.html.twig", 1);
        $this->blocks = array(
            'messages' => array($this, 'block_messages'),
            'body' => array($this, 'block_body'),
            'instructions' => array($this, 'block_instructions'),
            'integration' => array($this, 'block_integration'),
            'form' => array($this, 'block_form'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "partials/base.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 2
        $context["scope"] = (((isset($context["scope"]) ? $context["scope"] : null)) ? ((isset($context["scope"]) ? $context["scope"] : null)) : ("data."));
        // line 1
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_messages($context, array $blocks = array())
    {
    }

    // line 5
    public function block_body($context, array $blocks = array())
    {
        // line 6
        echo "<body id=\"admin-login-wrapper\">
    <section id=\"admin-login\" class=\"login-box-shadow ";
        // line 7
        echo twig_escape_filter($this->env, (isset($context["classes"]) ? $context["classes"] : null), "html", null, true);
        echo "\">
        <h1>
            ";
        // line 9
        echo twig_escape_filter($this->env, (isset($context["title"]) ? $context["title"] : null), "html", null, true);
        echo "
        </h1>

        ";
        // line 12
        $this->loadTemplate("partials/messages.html.twig", "partials/login.html.twig", 12)->display($context);
        // line 13
        echo "
        ";
        // line 14
        $this->displayBlock('instructions', $context, $blocks);
        // line 15
        echo "
        ";
        // line 16
        $this->displayBlock('integration', $context, $blocks);
        // line 17
        echo "
        ";
        // line 18
        $context["redirect"] = (((isset($context["redirect"]) ? $context["redirect"] : null)) ? ((isset($context["redirect"]) ? $context["redirect"] : null)) : ((($this->getAttribute((isset($context["uri"]) ? $context["uri"] : null), "path", array()) . $this->getAttribute((isset($context["uri"]) ? $context["uri"] : null), "params", array())) . (($this->getAttribute((isset($context["uri"]) ? $context["uri"] : null), "query", array())) ? (("?" . $this->getAttribute((isset($context["uri"]) ? $context["uri"] : null), "query", array()))) : ("")))));
        // line 19
        echo "
        <form method=\"post\" action=\"";
        // line 20
        echo twig_escape_filter($this->env, (isset($context["base_url_relative"]) ? $context["base_url_relative"] : null), "html", null, true);
        echo "\">
            <div class=\"padding\">
                ";
        // line 22
        $this->displayBlock('form', $context, $blocks);
        // line 23
        echo "                <input type=\"hidden\" name=\"redirect\" value=\"";
        echo twig_escape_filter($this->env, (isset($context["redirect"]) ? $context["redirect"] : null), "html", null, true);
        echo "\" />
                ";
        // line 24
        echo $this->env->getExtension('Grav\Common\Twig\TwigExtension')->nonceFieldFunc("admin-form", "admin-nonce");
        echo "
            </div>
        </form>

        <script>
            \$(document).ready( function() {
                \$('#messages').delay(5000).animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
            });
        </script>
    </section>
</body>
";
    }

    // line 14
    public function block_instructions($context, array $blocks = array())
    {
    }

    // line 16
    public function block_integration($context, array $blocks = array())
    {
    }

    // line 22
    public function block_form($context, array $blocks = array())
    {
    }

    public function getTemplateName()
    {
        return "partials/login.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  115 => 22,  110 => 16,  105 => 14,  89 => 24,  84 => 23,  82 => 22,  77 => 20,  74 => 19,  72 => 18,  69 => 17,  67 => 16,  64 => 15,  62 => 14,  59 => 13,  57 => 12,  51 => 9,  46 => 7,  43 => 6,  40 => 5,  35 => 3,  31 => 1,  29 => 2,  11 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("{% extends 'partials/base.html.twig' %}
{% set scope = scope ?: 'data.' %}
{% block messages %}{% endblock %}

{% block body %}
<body id=\"admin-login-wrapper\">
    <section id=\"admin-login\" class=\"login-box-shadow {{ classes }}\">
        <h1>
            {{ title }}
        </h1>

        {% include 'partials/messages.html.twig' %}

        {% block instructions %}{% endblock %}

        {% block integration %}{% endblock %}

        {% set redirect = redirect ?: uri.path ~ uri.params ~ (uri.query ? '?' ~ uri.query : '') %}

        <form method=\"post\" action=\"{{ base_url_relative }}\">
            <div class=\"padding\">
                {% block form %}{% endblock %}
                <input type=\"hidden\" name=\"redirect\" value=\"{{ redirect }}\" />
                {{ nonce_field('admin-form', 'admin-nonce')|raw }}
            </div>
        </form>

        <script>
            \$(document).ready( function() {
                \$('#messages').delay(5000).animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
            });
        </script>
    </section>
</body>
{% endblock %}
", "partials/login.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/plugins/admin/themes/grav/templates/partials/login.html.twig");
    }
}
