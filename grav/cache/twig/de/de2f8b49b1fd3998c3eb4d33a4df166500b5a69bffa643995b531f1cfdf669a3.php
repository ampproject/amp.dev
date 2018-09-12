<?php

/* @Page:/Users/andrew.mckeever/amp.dev/grav/user/pages/02.styleguide/03.prototypes/list-filter */
class __TwigTemplate_90b499fa543e2bef3109f423e7f9b7a64e12dfb78b981e8f305a540771b54260 extends Twig_Template
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
        echo "<!doctype html>
<html ⚡>
<head>
    <meta charset=\"utf-8\">
    <title>";
        // line 5
        echo $this->getAttribute((isset($context["header"]) ? $context["header"] : null), "title", array());
        echo "</title>
    <meta name=\"viewport\" content=\"width=device-width,minimum-scale=1\">

\t\t<script async src=\"https://cdn.ampproject.org/v0.js\"></script>
    <script async custom-element=\"amp-bind\" src=\"https://cdn.ampproject.org/v0/amp-bind-0.1.js\"></script>

    <link href=\"https://fonts.googleapis.com/css?family=Noto+Sans:400|Poppins:700\" rel=\"stylesheet\">

    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
    :root {
      --color-black: #20202A;
      --color-grey: #e0e0e0;

      --color-red: #EF0000;
      --color-blue: #005AF0;
      --color-green: #00CD3C;
    }

    main {
      padding: 20px;
      max-width: 1600px;
      margin: 0 auto;
      font-family: 'Noto Sans', sans-serif;
    }

    .filter-list {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
    }

      .filter-list__item {

      }

        .filter-list__button {
          padding: 0 10px;
          margin-right: 5px;
          background-color: var(--color-grey);
          border: 1px solid var(--color-grey);
          border-radius: 2px;
          line-height: 2em;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .filter-list__button--active {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          background-color: white;
          border: 1px solid var(--color-black);
        }

    .tiles-list {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      margin: -10px;
    }

      .tiles-list__item {
        position: relative;
        box-sizing: border-box;
        flex: 1 0 25%;
        max-width: 25%;
        padding: 10px;
      }

        .tiles-list__item--hidden {
          display: none;
        }

        .tiles-list__item:before {
          content: \"\";
          display: block;
          padding-bottom: 100%;
        }

        .tiles-list__item--red:before {
          background-color: var(--color-red);
        }

        .tiles-list__item--green:before {
          background-color: var(--color-green);
        }

        .tiles-list__item--blue:before {
          background-color: var(--color-blue);
        }
    </style>
</head>
<body>
    <amp-state id=\"nav\">
        <script type=\"application/json\">
        {
            \"activeFilters\": {
              \"red\": false,
              \"green\": false,
              \"blue\": false
            }
        }
        </script>
    </amp-state>

    <amp-bind-macro id=\"isFilterActive\" arguments=\"filter\" expression=\"activeFilters[filter] == true || values(activeFilters).indexOf(true) == -1\"/>

    <main>
\t\t\t<h1>";
        // line 115
        echo $this->getAttribute((isset($context["header"]) ? $context["header"] : null), "title", array());
        echo "</h1>
      <p>Click one ore more colors to filter the tiles.</p>
  \t\t<ul class=\"filter-list\">
        <li class=\"filter-list__item\"><button class=\"filter-list__button filter-list__button--active\" [class]=\"isFilterActive('red') ? 'filter-list__button filter-list__button--active' : 'filter-list__button'\" on=\"tap:AMP.setState({'activeFilters': {'red': !activeFilters.red}})\">Red</button></li>
        <li class=\"filter-list__item\"><button class=\"filter-list__button filter-list__button--active\" [class]=\"isFilterActive('green') ? 'filter-list__button filter-list__button--active' : 'filter-list__button'\" on=\"tap:AMP.setState({'activeFilters': {'green': !activeFilters.green}})\">Green</button></li>
        <li class=\"filter-list__item\"><button class=\"filter-list__button filter-list__button--active\" [class]=\"isFilterActive('blue') ? 'filter-list__button filter-list__button--active' : 'filter-list__button'\" on=\"tap:AMP.setState({'activeFilters': {'blue': !activeFilters.blue}})\">Blue</button></li>
  \t\t</ul>

    \t<ul class=\"tiles-list\">
  \t\t\t";
        // line 124
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable($this->env->getExtension('Grav\Common\Twig\TwigExtension')->rangeFunc(0, 3));
        foreach ($context['_seq'] as $context["_key"] => $context["iteration"]) {
            // line 125
            echo "  \t\t\t";
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable(array(0 => "red", 1 => "green", 2 => "green", 3 => "blue", 4 => "blue", 5 => "red", 6 => "blue"));
            foreach ($context['_seq'] as $context["_key"] => $context["color"]) {
                // line 126
                echo "  \t\t\t<li class=\"tiles-list__item tiles-list__item--";
                echo $context["color"];
                echo "\" [class]=\"isFilterActive('";
                echo $context["color"];
                echo "') ? 'tiles-list__item tiles-list__item--";
                echo $context["color"];
                echo "' : 'tiles-list__item tiles-list__item--hidden'\"></li>
  \t\t\t";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['color'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 128
            echo "  \t\t\t";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['iteration'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 129
        echo "  \t\t</ul>
    </main>
</body>
</html>
";
    }

    public function getTemplateName()
    {
        return "@Page:/Users/andrew.mckeever/amp.dev/grav/user/pages/02.styleguide/03.prototypes/list-filter";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  178 => 129,  172 => 128,  159 => 126,  154 => 125,  150 => 124,  138 => 115,  25 => 5,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("<!doctype html>
<html ⚡>
<head>
    <meta charset=\"utf-8\">
    <title>{{ header.title }}</title>
    <meta name=\"viewport\" content=\"width=device-width,minimum-scale=1\">

\t\t<script async src=\"https://cdn.ampproject.org/v0.js\"></script>
    <script async custom-element=\"amp-bind\" src=\"https://cdn.ampproject.org/v0/amp-bind-0.1.js\"></script>

    <link href=\"https://fonts.googleapis.com/css?family=Noto+Sans:400|Poppins:700\" rel=\"stylesheet\">

    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
    :root {
      --color-black: #20202A;
      --color-grey: #e0e0e0;

      --color-red: #EF0000;
      --color-blue: #005AF0;
      --color-green: #00CD3C;
    }

    main {
      padding: 20px;
      max-width: 1600px;
      margin: 0 auto;
      font-family: 'Noto Sans', sans-serif;
    }

    .filter-list {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
    }

      .filter-list__item {

      }

        .filter-list__button {
          padding: 0 10px;
          margin-right: 5px;
          background-color: var(--color-grey);
          border: 1px solid var(--color-grey);
          border-radius: 2px;
          line-height: 2em;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .filter-list__button--active {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          background-color: white;
          border: 1px solid var(--color-black);
        }

    .tiles-list {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      margin: -10px;
    }

      .tiles-list__item {
        position: relative;
        box-sizing: border-box;
        flex: 1 0 25%;
        max-width: 25%;
        padding: 10px;
      }

        .tiles-list__item--hidden {
          display: none;
        }

        .tiles-list__item:before {
          content: \"\";
          display: block;
          padding-bottom: 100%;
        }

        .tiles-list__item--red:before {
          background-color: var(--color-red);
        }

        .tiles-list__item--green:before {
          background-color: var(--color-green);
        }

        .tiles-list__item--blue:before {
          background-color: var(--color-blue);
        }
    </style>
</head>
<body>
    <amp-state id=\"nav\">
        <script type=\"application/json\">
        {
            \"activeFilters\": {
              \"red\": false,
              \"green\": false,
              \"blue\": false
            }
        }
        </script>
    </amp-state>

    <amp-bind-macro id=\"isFilterActive\" arguments=\"filter\" expression=\"activeFilters[filter] == true || values(activeFilters).indexOf(true) == -1\"/>

    <main>
\t\t\t<h1>{{ header.title }}</h1>
      <p>Click one ore more colors to filter the tiles.</p>
  \t\t<ul class=\"filter-list\">
        <li class=\"filter-list__item\"><button class=\"filter-list__button filter-list__button--active\" [class]=\"isFilterActive('red') ? 'filter-list__button filter-list__button--active' : 'filter-list__button'\" on=\"tap:AMP.setState({'activeFilters': {'red': !activeFilters.red}})\">Red</button></li>
        <li class=\"filter-list__item\"><button class=\"filter-list__button filter-list__button--active\" [class]=\"isFilterActive('green') ? 'filter-list__button filter-list__button--active' : 'filter-list__button'\" on=\"tap:AMP.setState({'activeFilters': {'green': !activeFilters.green}})\">Green</button></li>
        <li class=\"filter-list__item\"><button class=\"filter-list__button filter-list__button--active\" [class]=\"isFilterActive('blue') ? 'filter-list__button filter-list__button--active' : 'filter-list__button'\" on=\"tap:AMP.setState({'activeFilters': {'blue': !activeFilters.blue}})\">Blue</button></li>
  \t\t</ul>

    \t<ul class=\"tiles-list\">
  \t\t\t{% for iteration in range(0, 3) %}
  \t\t\t{% for color in ['red', 'green', 'green', 'blue', 'blue', 'red', 'blue'] %}
  \t\t\t<li class=\"tiles-list__item tiles-list__item--{{ color }}\" [class]=\"isFilterActive('{{ color }}') ? 'tiles-list__item tiles-list__item--{{ color }}' : 'tiles-list__item tiles-list__item--hidden'\"></li>
  \t\t\t{% endfor %}
  \t\t\t{% endfor %}
  \t\t</ul>
    </main>
</body>
</html>
", "@Page:/Users/andrew.mckeever/amp.dev/grav/user/pages/02.styleguide/03.prototypes/list-filter", "");
    }
}
