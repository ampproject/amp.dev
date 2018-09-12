<?php

/* partials/blueprints.html.twig */
class __TwigTemplate_53ae39bc7b22aedce2b8731e06c9ef61826eacffc8b8a6db7dc6a3d5c27f1c36 extends Twig_Template
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
        $context["form_id"] = (((isset($context["form_id"]) ? $context["form_id"] : null)) ? ((isset($context["form_id"]) ? $context["form_id"] : null)) : ("blueprints"));
        // line 2
        $context["scope"] = (((isset($context["scope"]) ? $context["scope"] : null)) ? ((isset($context["scope"]) ? $context["scope"] : null)) : ("data."));
        // line 3
        echo "
";
        // line 4
        if ($this->getAttribute((isset($context["admin"]) ? $context["admin"] : null), "findFormFields", array(0 => "file", 1 => $this->getAttribute((isset($context["blueprints"]) ? $context["blueprints"] : null), "fields", array())), "method")) {
            // line 5
            echo "    ";
            $context["multipart"] = " enctype=\"multipart/form-data\"";
        }
        // line 7
        echo "
<form id=\"";
        // line 8
        echo twig_escape_filter($this->env, (isset($context["form_id"]) ? $context["form_id"] : null), "html", null, true);
        echo "\" method=\"post\" data-grav-form=\"";
        echo twig_escape_filter($this->env, (isset($context["form_id"]) ? $context["form_id"] : null), "html", null, true);
        echo "\" data-grav-keepalive=\"true\"";
        echo (isset($context["multipart"]) ? $context["multipart"] : null);
        echo ">
    ";
        // line 9
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable($this->getAttribute((isset($context["blueprints"]) ? $context["blueprints"] : null), "fields", array()));
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
            // line 10
            echo "        ";
            if ($this->getAttribute($context["field"], "type", array())) {
                // line 11
                echo "            ";
                $context["value"] = (($this->getAttribute($context["field"], "name", array())) ? ($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "value", array(0 => $this->getAttribute($context["field"], "name", array())), "method")) : ($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "toArray", array())));
                // line 12
                echo "            <div class=\"block block-";
                echo twig_escape_filter($this->env, $this->getAttribute($context["field"], "type", array()), "html", null, true);
                echo "\">
                ";
                // line 13
                $this->loadTemplate(array(0 => (((("forms/fields/" . $this->getAttribute($context["field"], "type", array())) . "/") . $this->getAttribute($context["field"], "type", array())) . ".html.twig"), 1 => "forms/fields/text/text.html.twig"), "partials/blueprints.html.twig", 13)->display($context);
                // line 14
                echo "            </div>
        ";
            }
            // line 16
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
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['field'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 17
        echo "
    ";
        // line 18
        if ($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "extra", array())) {
            // line 19
            echo "    ";
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable($this->getAttribute((isset($context["data"]) ? $context["data"] : null), "extra", array()));
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
            foreach ($context['_seq'] as $context["name"] => $context["value"]) {
                // line 20
                echo "        ";
                if (!twig_in_filter($context["name"], array(0 => "_json", 1 => "task", 2 => "admin-nonce"))) {
                    // line 21
                    echo "            ";
                    $context["field"] = array("name" => ("_json." . $context["name"]));
                    // line 22
                    echo "            ";
                    $context["value"] = twig_jsonencode_filter($context["value"]);
                    // line 23
                    echo "            ";
                    $this->loadTemplate("forms/fields/hidden/hidden.html.twig", "partials/blueprints.html.twig", 23)->display($context);
                    // line 24
                    echo "        ";
                }
                // line 25
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
            unset($context['_seq'], $context['_iterated'], $context['name'], $context['value'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 26
            echo "    ";
        }
        // line 27
        echo "
    ";
        // line 28
        echo $this->env->getExtension('Grav\Common\Twig\TwigExtension')->nonceFieldFunc("admin-form", "admin-nonce");
        echo "
</form>
";
    }

    public function getTemplateName()
    {
        return "partials/blueprints.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  149 => 28,  146 => 27,  143 => 26,  129 => 25,  126 => 24,  123 => 23,  120 => 22,  117 => 21,  114 => 20,  96 => 19,  94 => 18,  91 => 17,  77 => 16,  73 => 14,  71 => 13,  66 => 12,  63 => 11,  60 => 10,  43 => 9,  35 => 8,  32 => 7,  28 => 5,  26 => 4,  23 => 3,  21 => 2,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("{% set form_id = form_id ? form_id : 'blueprints' %}
{% set scope = scope ?: 'data.' %}

{% if admin.findFormFields('file', blueprints.fields) %}
    {% set multipart = ' enctype=\"multipart/form-data\"' %}
{% endif %}

<form id=\"{{ form_id }}\" method=\"post\" data-grav-form=\"{{ form_id }}\" data-grav-keepalive=\"true\"{{ multipart|raw }}>
    {% for field in blueprints.fields %}
        {% if field.type %}
            {% set value = field.name ? data.value(field.name) : data.toArray %}
            <div class=\"block block-{{ field.type }}\">
                {% include [\"forms/fields/#{field.type}/#{field.type}.html.twig\", 'forms/fields/text/text.html.twig'] %}
            </div>
        {% endif %}
    {% endfor %}

    {% if data.extra %}
    {% for name, value in data.extra %}
        {% if name not in ['_json','task','admin-nonce'] %}
            {% set field = {name: '_json.' ~ name} %}
            {% set value = value|raw|json_encode %}
            {% include 'forms/fields/hidden/hidden.html.twig' %}
        {% endif %}
    {% endfor %}
    {% endif %}

    {{ nonce_field('admin-form', 'admin-nonce')|raw }}
</form>
", "partials/blueprints.html.twig", "/Users/andrew.mckeever/amp.dev/grav/user/plugins/admin/themes/grav/templates/partials/blueprints.html.twig");
    }
}
