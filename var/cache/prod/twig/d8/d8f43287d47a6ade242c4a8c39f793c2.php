<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* @PrestaShop/Admin/Sell/Address/Blocks/form.html.twig */
class __TwigTemplate_bab3a905d0ea480b3bf97a7db0d0143b extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
            'customer_information' => [$this, 'block_customer_information'],
            'address_form_widget' => [$this, 'block_address_form_widget'],
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 25
        echo "
";
        // line 26
        $this->env->getRuntime("Symfony\\Component\\Form\\FormRenderer")->setTheme(($context["addressForm"] ?? null), [0 => "@PrestaShop/Admin/TwigTemplateForm/prestashop_ui_kit.html.twig"], true);
        // line 27
        echo "
";
        // line 28
        $macros["ps"] = $this->macros["ps"] = $this->loadTemplate("@PrestaShop/Admin/macros.html.twig", "@PrestaShop/Admin/Sell/Address/Blocks/form.html.twig", 28)->unwrap();
        // line 29
        echo "
";
        // line 30
        echo         $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->renderBlock(($context["addressForm"] ?? null), 'form_start');
        echo "
<div class=\"card\">
  <div class=\"card-header\">
    <i class=\"material-icons\">mail_outline</i>
    ";
        // line 34
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Addresses", [], "Admin.Navigation.Menu"), "html", null, true);
        echo "
  </div>

  <div class=\"card-body\">
    <div class=\"form-wrapper\">
      ";
        // line 39
        echo $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->searchAndRenderBlock(($context["addressForm"] ?? null), 'errors');
        echo "

      ";
        // line 41
        $this->displayBlock('customer_information', $context, $blocks);
        // line 59
        echo "      ";
        $this->displayBlock('address_form_widget', $context, $blocks);
        // line 62
        echo "    </div>
  </div>

  <div class=\"card-footer\">
    <div class=\"d-inline-flex\">
        ";
        // line 69
        echo "        ";
        if ((array_key_exists("displayInIframe", $context) && (($context["displayInIframe"] ?? null) == true))) {
            // line 70
            echo "          <a href=\"javascript:window.parent.\$.fancybox.close();\" class=\"btn btn-outline-secondary\">
        ";
        } else {
            // line 72
            echo "          <a href=\"";
            echo twig_escape_filter($this->env, ((array_key_exists("cancelPath", $context)) ? (_twig_default_filter(($context["cancelPath"] ?? null), $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("admin_addresses_index"))) : ($this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("admin_addresses_index"))), "html", null, true);
            echo "\" class=\"btn btn-outline-secondary\">
        ";
        }
        // line 74
        echo "        ";
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Cancel", [], "Admin.Actions"), "html", null, true);
        echo "
      </a>
    </div>
    <div class=\"d-inline-flex float-right\">
      <button class=\"btn btn-primary\" id=\"save-button\">";
        // line 78
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Save", [], "Admin.Actions"), "html", null, true);
        echo "</button>
    </div>
  </div>
</div>
";
        // line 82
        echo         $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->renderBlock(($context["addressForm"] ?? null), 'form_end');
        echo "
";
    }

    // line 41
    public function block_customer_information($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 42
        echo "        ";
        if ( !(null === ($context["customerInformation"] ?? null))) {
            // line 43
            echo "          ";
            if (twig_get_attribute($this->env, $this->source, ($context["addressForm"] ?? null), "id_customer", [], "any", true, true, false, 43)) {
                // line 44
                echo "            ";
                echo twig_call_macro($macros["ps"], "macro_form_widget_with_error", [twig_get_attribute($this->env, $this->source, ($context["addressForm"] ?? null), "id_customer", [], "any", false, false, false, 44)], 44, $context, $this->getSourceContext());
                echo "
          ";
            }
            // line 46
            echo "          <div class=\"form-group row\">
            <label class=\"form-control-label\">
              ";
            // line 48
            echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Customer", [], "Admin.Global"), "html", null, true);
            echo "
            </label>
            <div class=\"col-sm\">
              <a href=\"";
            // line 51
            echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("admin_customers_view", ["customerId" => ($context["customerId"] ?? null)]), "html", null, true);
            echo "\" class=\"btn btn-outline-secondary\">
                <i class=\"material-icons\">remove_red_eye</i>
                ";
            // line 53
            echo twig_escape_filter($this->env, ($context["customerInformation"] ?? null), "html", null, true);
            echo "
              </a>
            </div>
          </div>
        ";
        }
        // line 58
        echo "      ";
    }

    // line 59
    public function block_address_form_widget($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 60
        echo "        ";
        echo $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->searchAndRenderBlock(($context["addressForm"] ?? null), 'widget');
        echo "
      ";
    }

    public function getTemplateName()
    {
        return "@PrestaShop/Admin/Sell/Address/Blocks/form.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  165 => 60,  161 => 59,  157 => 58,  149 => 53,  144 => 51,  138 => 48,  134 => 46,  128 => 44,  125 => 43,  122 => 42,  118 => 41,  112 => 82,  105 => 78,  97 => 74,  91 => 72,  87 => 70,  84 => 69,  77 => 62,  74 => 59,  72 => 41,  67 => 39,  59 => 34,  52 => 30,  49 => 29,  47 => 28,  44 => 27,  42 => 26,  39 => 25,);
    }

    public function getSourceContext()
    {
        return new Source("", "@PrestaShop/Admin/Sell/Address/Blocks/form.html.twig", "C:\\xampp\\htdocs\\Prestashop\\src\\PrestaShopBundle\\Resources\\views\\Admin\\Sell\\Address\\Blocks\\form.html.twig");
    }
}
