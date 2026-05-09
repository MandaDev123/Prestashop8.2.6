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

/* __string_template__220f4ba3bdbd916b6419b2e63dbc3053 */
class __TwigTemplate_2c61afe529dd47af699611ce573cfb16 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
            'stylesheets' => [$this, 'block_stylesheets'],
            'extra_stylesheets' => [$this, 'block_extra_stylesheets'],
            'content_header' => [$this, 'block_content_header'],
            'content' => [$this, 'block_content'],
            'content_footer' => [$this, 'block_content_footer'],
            'sidebar_right' => [$this, 'block_sidebar_right'],
            'javascripts' => [$this, 'block_javascripts'],
            'extra_javascripts' => [$this, 'block_extra_javascripts'],
            'translate_javascripts' => [$this, 'block_translate_javascripts'],
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        echo "<!DOCTYPE html>
<html lang=\"fr\">
<head>
  <meta charset=\"utf-8\">
<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
<meta name=\"apple-mobile-web-app-capable\" content=\"yes\">
<meta name=\"robots\" content=\"NOFOLLOW, NOINDEX\">

<link rel=\"icon\" type=\"image/x-icon\" href=\"/Prestashop/img/favicon.ico\" />
<link rel=\"apple-touch-icon\" href=\"/Prestashop/img/app_icon.png\" />

<title>Webservice • My store</title>

  <script type=\"text/javascript\">
    var help_class_name = 'AdminWebservice';
    var iso_user = 'fr';
    var lang_is_rtl = '0';
    var full_language_code = 'fr';
    var full_cldr_language_code = 'fr-FR';
    var country_iso_code = 'MG';
    var _PS_VERSION_ = '8.2.6';
    var roundMode = 2;
    var youEditFieldFor = '';
        var new_order_msg = 'Une nouvelle commande a été passée sur votre boutique.';
    var order_number_msg = 'Numéro de commande : ';
    var total_msg = 'Total : ';
    var from_msg = 'Du ';
    var see_order_msg = 'Afficher cette commande';
    var new_customer_msg = 'Un nouveau client s\\'est inscrit sur votre boutique.';
    var customer_name_msg = 'Nom du client : ';
    var new_msg = 'Un nouveau message a été posté sur votre boutique.';
    var see_msg = 'Lire le message';
    var token = '6714214d155a94a2de2ea62c08c2fb45';
    var currentIndex = 'index.php?controller=AdminWebservice';
    var employee_token = '245599376290424f13bcb7143718747b';
    var choose_language_translate = 'Choisissez la langue :';
    var default_language = '1';
    var admin_modules_link = '/Prestashop/admin1694gejjgz33ijpxtei/index.php/improve/modules/manage?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo';
    var admin_notification_get_link = '/Prestashop/admin1694gejjgz33ijpxtei/index.php/common/notifications?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo';
    var admin_notification_push_link = adminNotificationPushLink = '/Prestashop/admin1694gejjgz33ijpxtei/index.php/common/notifications/ack?_token=_5o6zxU6TClWYAxUstenG1Li";
        // line 40
        echo "bD_jHvFFdz-CH_A0_eo';
    var tab_modules_list = '';
    var update_success_msg = 'Mise à jour réussie';
    var search_product_msg = 'Rechercher un produit';
  </script>



<link
      rel=\"preload\"
      href=\"/Prestashop/admin1694gejjgz33ijpxtei/themes/new-theme/public/2d8017489da689caedc1.preload..woff2\"
      as=\"font\"
      crossorigin
    >
      <link href=\"/Prestashop/admin1694gejjgz33ijpxtei/themes/new-theme/public/create_product_default_theme.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/Prestashop/admin1694gejjgz33ijpxtei/themes/new-theme/public/theme.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"https://unpkg.com/@prestashopcorp/edition-reskin/dist/back.min.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/Prestashop/js/jquery/plugins/chosen/jquery.chosen.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/Prestashop/js/jquery/plugins/fancybox/jquery.fancybox.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/Prestashop/modules/blockwishlist/public/backoffice.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/Prestashop/admin1694gejjgz33ijpxtei/themes/default/css/vendor/nv.d3.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/Prestashop/modules/klaviyopsautomation/dist/css/klaviyops-admin-global.b13cfc23.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/Prestashop/modules/psxmarketingwithgoogle/views/css/admin/menu.css\" rel=\"stylesheet\" type=\"text/css\"/>
      <link href=\"/Prestashop/modules/ps_facebook/views/css/admin/menu.css\" rel=\"stylesheet\" type=\"text/css\"/>
  
  <script type=\"text/javascript\">
var baseAdminDir = \"\\/Prestashop\\/admin1694gejjgz33ijpxtei\\/\";
var baseDir = \"\\/Prestashop\\/\";
var changeFormLanguageUrl = \"\\/Prestashop\\/admin1694gejjgz33ijpxtei\\/index.php\\/configure\\/advanced\\/employees\\/change-form-language?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\";
var currency = {\"iso_code\":\"MGA\",\"sign\":\"Ar\",\"name\":\"Ariary malgache\",\"format\":null};
var currency_specif";
        // line 70
        echo "ications = {\"symbol\":[\",\",\"\\u202f\",\";\",\"%\",\"-\",\"+\",\"E\",\"\\u00d7\",\"\\u2030\",\"\\u221e\",\"NaN\"],\"currencyCode\":\"MGA\",\"currencySymbol\":\"Ar\",\"numberSymbols\":[\",\",\"\\u202f\",\";\",\"%\",\"-\",\"+\",\"E\",\"\\u00d7\",\"\\u2030\",\"\\u221e\",\"NaN\"],\"positivePattern\":\"#,##0.00\\u00a0\\u00a4\",\"negativePattern\":\"-#,##0.00\\u00a0\\u00a4\",\"maxFractionDigits\":0,\"minFractionDigits\":0,\"groupingUsed\":true,\"primaryGroupSize\":3,\"secondaryGroupSize\":3};
var number_specifications = {\"symbol\":[\",\",\"\\u202f\",\";\",\"%\",\"-\",\"+\",\"E\",\"\\u00d7\",\"\\u2030\",\"\\u221e\",\"NaN\"],\"numberSymbols\":[\",\",\"\\u202f\",\";\",\"%\",\"-\",\"+\",\"E\",\"\\u00d7\",\"\\u2030\",\"\\u221e\",\"NaN\"],\"positivePattern\":\"#,##0.###\",\"negativePattern\":\"-#,##0.###\",\"maxFractionDigits\":3,\"minFractionDigits\":0,\"groupingUsed\":true,\"primaryGroupSize\":3,\"secondaryGroupSize\":3};
var prestashop = {\"debug\":false};
var ps_edition_basic_favicon = \"\\/Prestashop\\/modules\\/ps_edition_basic\\/views\\/favicon.png\";
var show_new_customers = \"1\";
var show_new_messages = \"1\";
var show_new_orders = \"1\";
</script>
<script type=\"text/javascript\" src=\"/Prestashop/modules/ps_edition_basic/views/js/favicon.js\"></script>
<script type=\"text/javascript\" src=\"/Prestashop/admin1694gejjgz33ijpxtei/themes/new-theme/public/main.bundle.js\"></script>
<script type=\"text/javascript\" src=\"/Prestashop/js/jquery/plugins/jquery.chosen.js\"></script>
<script type=\"text/javascript\" src=\"/Prestashop/js/jquery/plugins/fancybox/jquery.fancybox.js\"></script>
<script type=\"text/javascript\" src=\"/Prestashop/js/admin.js?v=8.2.6\"></script>
<script type=\"text/javascript\" src=\"/Prestashop/admin1694gejjgz33ijpxtei/themes/new-theme/public/cldr.bundle.js\"></script>
<script type=\"text/javascript\" src=\"/Prestashop/js/tools.js?v=8.2.6\"></script>
<script type=\"text/javascript\" src=\"/Prestashop/admin1694gejjgz33ijpxtei/themes/new-theme/public/create_product.bundle.js\"></script>
<script type=\"text/javascript\" src=\"/Prestashop/modules/blockwishlist/public/vendors.js\"></script>
<script type=\"text/javascript\" src=\"/Prestashop/modules/gamificatio";
        // line 87
        echo "n/views/js/gamification_bt.js\"></script>
<script type=\"text/javascript\" src=\"/Prestashop/js/vendor/d3.v3.min.js\"></script>
<script type=\"text/javascript\" src=\"/Prestashop/admin1694gejjgz33ijpxtei/themes/default/js/vendor/nv.d3.min.js\"></script>
<script type=\"text/javascript\" src=\"/Prestashop/modules/ps_emailalerts/js/admin/ps_emailalerts.js\"></script>
<script type=\"text/javascript\" src=\"/Prestashop/modules/ps_mbo/views/js/recommended-modules.js?v=4.14.1\"></script>
<script type=\"text/javascript\" src=\"/Prestashop/modules/ps_faviconnotificationbo/views/js/favico.js\"></script>
<script type=\"text/javascript\" src=\"/Prestashop/modules/ps_faviconnotificationbo/views/js/ps_faviconnotificationbo.js\"></script>

  <script>
            var admin_gamification_ajax_url = \"http:\\/\\/localhost\\/Prestashop\\/admin1694gejjgz33ijpxtei\\/index.php?controller=AdminGamification&token=6b91eb026d9fa6fd0f0a62017c6620d2\";
            var current_id_tab = 106;
        </script>    <script>
        window.userLocale  = 'fr';
        window.userflow_id = 'ct_55jfryadgneorc45cjqxpbf6o4';
    </script>
    <script type=\"module\" src=\"https://unpkg.com/@prestashopcorp/smb-edition-homepage/dist/assets/index.js\"></script><script>
  if (undefined !== ps_faviconnotificationbo) {
    ps_faviconnotificationbo.initialize({
      backgroundColor: '#DF0067',
      textColor: '#FFFFFF',
      notificationGetUrl: '/Prestashop/admin1694gejjgz33ijpxtei/index.php/common/notifications?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo',
      CHECKBOX_ORDER: 1,
      CHECKBOX_CUSTOMER: 1,
      CHECKBOX_MESSAGE: 1,
      timer: 120000, // Refresh every 2 minutes
    });
  }
</script>


";
        // line 117
        $this->displayBlock('stylesheets', $context, $blocks);
        $this->displayBlock('extra_stylesheets', $context, $blocks);
        echo "</head>";
        echo "

<body
  class=\"lang-fr adminwebservice\"
  data-base-url=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php\"  data-token=\"_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\">

  <header id=\"header\" class=\"d-print-none\">

    <nav id=\"header_infos\" class=\"main-header\">
      <button class=\"btn btn-primary-reverse onclick btn-lg unbind ajax-spinner\"></button>

            <i class=\"material-icons js-mobile-menu\">menu</i>
      <a id=\"header_logo\" class=\"logo float-left\" href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/modules/pseditionbasic/homepage?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\"></a>
      <span id=\"shop_version\">8.2.6</span>

      <div class=\"component\" id=\"quick-access-container\">
        <div class=\"dropdown quick-accesses\">
  <button class=\"btn btn-link btn-sm dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" id=\"quick_select\">
    Accès rapide
  </button>
  <div class=\"dropdown-menu\">
          <a class=\"dropdown-item quick-row-link \"
         href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php/sell/orders?token=5c43297b1168c75a70949d3278480d02\"
                 data-item=\"Commandes\"
      >Commandes</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminStats&amp;module=statscheckup&amp;token=cd844bcd4c3365192b7bbc4ee1049361\"
                 data-item=\"Évaluation du catalogue\"
      >Évaluation du catalogue</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php/improve/modules/manage?token=5c43297b1168c75a70949d3278480d02\"
                 data-item=\"Modules installés\"
      >Modules installés</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminCartRules&amp;addcart_rule&amp;token=d0012cf1c80b32de989d731b5c04706";
        // line 151
        echo "d\"
                 data-item=\"Nouveau bon de réduction\"
      >Nouveau bon de réduction</a>
          <a class=\"dropdown-item quick-row-link new-product-button\"
         href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php/sell/catalog/products-v2/create?token=5c43297b1168c75a70949d3278480d02\"
                 data-item=\"Nouveau produit\"
      >Nouveau produit</a>
          <a class=\"dropdown-item quick-row-link \"
         href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php/sell/catalog/categories/new?token=5c43297b1168c75a70949d3278480d02\"
                 data-item=\"Nouvelle catégorie\"
      >Nouvelle catégorie</a>
        <div class=\"dropdown-divider\"></div>
          <a id=\"quick-add-link\"
        class=\"dropdown-item js-quick-link\"
        href=\"#\"
        data-rand=\"103\"
        data-icon=\"icon-AdminAdvancedParameters\"
        data-method=\"add\"
        data-url=\"index.php/configure/advanced/webservice-keys/1/edit?-CH_A0_eo\"
        data-post-link=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminQuickAccesses&amp;token=c0aebc712deee4fe3784359eaedca145\"
        data-prompt-text=\"Veuillez nommer ce raccourci :\"
        data-link=\"Webservice - Liste\"
      >
        <i class=\"material-icons\">add_circle</i>
        Ajouter la page actuelle à l'accès rapide
      </a>
        <a id=\"quick-manage-link\" class=\"dropdown-item\" href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminQuickAccesses&amp;token=c0aebc712deee4fe3784359eaedca145\">
      <i class=\"material-icons\">settings</i>
      Gérez vos accès rapides
    </a>
  </div>
</div>
      </div>
      <div class=\"component component-search\" id=\"header-search-container\">
        <div class=\"component-search-body\">
          <div class=\"component-search-top\">
            <form id=\"header_search\"
      class=\"bo_search_form dropdown-form js-dropdown-form collapsed\"
      method=\"post\"
      action=\"/Prestashop/admin16";
        // line 190
        echo "94gejjgz33ijpxtei/index.php?controller=AdminSearch&amp;token=d54528b4b8cbd54ab97b593ebd02d8bd\"
      role=\"search\">
  <input type=\"hidden\" name=\"bo_search_type\" id=\"bo_search_type\" class=\"js-search-type\" />
    <div class=\"input-group\">
    <input type=\"text\" class=\"form-control js-form-search\" id=\"bo_query\" name=\"bo_query\" value=\"\" placeholder=\"Rechercher (ex. : référence produit, nom du client, etc.)\" aria-label=\"Barre de recherche\">
    <div class=\"input-group-append\">
      <button type=\"button\" class=\"btn btn-outline-secondary dropdown-toggle js-dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">
        Partout
      </button>
      <div class=\"dropdown-menu js-items-list\">
        <a class=\"dropdown-item\" data-item=\"Partout\" href=\"#\" data-value=\"0\" data-placeholder=\"Que souhaitez-vous trouver ?\" data-icon=\"icon-search\"><i class=\"material-icons\">search</i> Partout</a>
        <div class=\"dropdown-divider\"></div>
        <a class=\"dropdown-item\" data-item=\"Catalogue\" href=\"#\" data-value=\"1\" data-placeholder=\"Nom du produit, référence, etc.\" data-icon=\"icon-book\"><i class=\"material-icons\">store_mall_directory</i> Catalogue</a>
        <a class=\"dropdown-item\" data-item=\"Clients par nom\" href=\"#\" data-value=\"2\" data-placeholder=\"Nom\" data-icon=\"icon-group\"><i class=\"material-icons\">group</i> Clients par nom</a>
        <a class=\"dropdown-item\" data-item=\"Clients par adresse IP\" href=\"#\" data-value=\"6\" data-placeholder=\"123.45.67.89\" data-icon=\"icon-desktop\"><i class=\"material-icons\">desktop_mac</i> Clients par adresse IP</a>
        <a class=\"dropdown-item\" data-item=\"Commandes\" href=\"#\" data-value=\"3\" data-placeholder=\"ID commande\" data-icon=\"icon-credit-card\"><i class=\"material-icons\">shopping_basket</i> Commandes</a>
        <a class=\"dropdown-item\" data-item=\"Factures\" href=\"#\" data-value=\"4\" data-placeholder=\"Numéro de facture\" data-icon=\"icon-book\"><i class=\"material-icons\">book</i> Factures</a>
        <a class=\"dropdow";
        // line 207
        echo "n-item\" data-item=\"Paniers\" href=\"#\" data-value=\"5\" data-placeholder=\"ID panier\" data-icon=\"icon-shopping-cart\"><i class=\"material-icons\">shopping_cart</i> Paniers</a>
        <a class=\"dropdown-item\" data-item=\"Modules\" href=\"#\" data-value=\"7\" data-placeholder=\"Nom du module\" data-icon=\"icon-puzzle-piece\"><i class=\"material-icons\">extension</i> Modules</a>
      </div>
      <button class=\"btn btn-primary\" type=\"submit\"><span class=\"d-none\">RECHERCHE</span><i class=\"material-icons\">search</i></button>
    </div>
  </div>
</form>

<script type=\"text/javascript\">
 \$(document).ready(function(){
    \$('#bo_query').one('click', function() {
    \$(this).closest('form').removeClass('collapsed');
  });
});
</script>
            <button class=\"component-search-cancel d-none\">Annuler</button>
          </div>

          <div class=\"component-search-quickaccess d-none\">
  <p class=\"component-search-title\">Accès rapide</p>
      <a class=\"dropdown-item quick-row-link\"
       href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php/sell/orders?token=5c43297b1168c75a70949d3278480d02\"
             data-item=\"Commandes\"
    >Commandes</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminStats&amp;module=statscheckup&amp;token=cd844bcd4c3365192b7bbc4ee1049361\"
             data-item=\"Évaluation du catalogue\"
    >Évaluation du catalogue</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php/improve/modules/manage?token=5c43297b1168c75a70949d3278480d02\"
             data-item=\"Modules installés\"
    >Modules installés</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminCartRules&amp;addcart_rule&amp;token=d0012cf1c80b32de989d731b5c04706d\"
             data-item=\"Nouveau bon de réduction\"
    >Nouveau bon de réduction</";
        // line 242
        echo "a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php/sell/catalog/products-v2/create?token=5c43297b1168c75a70949d3278480d02\"
             data-item=\"Nouveau produit\"
    >Nouveau produit</a>
      <a class=\"dropdown-item quick-row-link\"
       href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php/sell/catalog/categories/new?token=5c43297b1168c75a70949d3278480d02\"
             data-item=\"Nouvelle catégorie\"
    >Nouvelle catégorie</a>
    <div class=\"dropdown-divider\"></div>
      <a id=\"quick-add-link\"
      class=\"dropdown-item js-quick-link\"
      href=\"#\"
      data-rand=\"91\"
      data-icon=\"icon-AdminAdvancedParameters\"
      data-method=\"add\"
      data-url=\"index.php/configure/advanced/webservice-keys/1/edit?-CH_A0_eo\"
      data-post-link=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminQuickAccesses&amp;token=c0aebc712deee4fe3784359eaedca145\"
      data-prompt-text=\"Veuillez nommer ce raccourci :\"
      data-link=\"Webservice - Liste\"
    >
      <i class=\"material-icons\">add_circle</i>
      Ajouter la page actuelle à l'accès rapide
    </a>
    <a id=\"quick-manage-link\" class=\"dropdown-item\" href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminQuickAccesses&amp;token=c0aebc712deee4fe3784359eaedca145\">
    <i class=\"material-icons\">settings</i>
    Gérez vos accès rapides
  </a>
</div>
        </div>

        <div class=\"component-search-background d-none\"></div>
      </div>

      
                      <div class=\"component hide-mobile-sm\" id=\"header-maintenance-mode-container\">
          <a class=\"link shop-state\"
             id=\"maintenance-mode\"
             data-toggle=\"pstooltip\"
             data-placement=\"bottom\"
             data-html=\"true\"
             title=\"          &lt;p class=&quot;text-left text-nowrap&quot;&gt;
            &lt;strong&gt;Votre boutique est en mode maintenance.&lt;/st";
        // line 284
        echo "rong&gt;
          &lt;/p&gt;
          &lt;p class=&quot;text-left&quot;&gt;
              Vos visiteurs et clients ne peuvent pas accéder à votre boutique lorsque le mode maintenance est activé.
          &lt;/p&gt;
          &lt;p class=&quot;text-left&quot;&gt;
              Pour gérer les paramètres de maintenance, rendez-vous sur la page Paramètres de la boutique &amp;gt; Paramètres généraux &amp;gt; Maintenance.
          &lt;/p&gt;
                      &lt;p class=&quot;text-left&quot;&gt;
              Les administrateurs peuvent accéder au front-office de la boutique sans que leur adresse IP ne soit enregistrée.
            &lt;/p&gt;
                  \"
             href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/shop/maintenance/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\"
          >
            <i class=\"material-icons\"
              style=\"color: var(--green);\"
            >build</i>
            <span>Mode maintenance</span>
          </a>
        </div>
      
      <div class=\"header-right\">
                  <div class=\"component\" id=\"header-shop-list-container\">
              <div class=\"shop-list\">
    <a class=\"link\" id=\"header_shopname\" href=\"http://localhost/Prestashop/\" target= \"_blank\">
      <i class=\"material-icons\">visibility</i>
      <span>Voir ma boutique</span>
    </a>
  </div>
          </div>
                          <div class=\"component header-right-component\" id=\"header-notifications-container\">
            <div id=\"notif\" class=\"notification-center dropdown dropdown-clickable\">
  <button class=\"btn notification js-notification dropdown-toggle\" data-toggle=\"dropdown\">
    <i class=\"material-icons\">notifications_none</i>
    <span id=\"notifications-total\" class=\"count hide\">0</span>
  </button>
  <div class=\"dropdown-menu dropdown-menu-right js-notifs_dropdown\">
    <div class=\"notifications\">
      <ul class=\"nav nav-tabs\" role=\"tablist\">
                          <li class=\"nav-item\">
       ";
        // line 324
        echo "     <a
              class=\"nav-link active\"
              id=\"orders-tab\"
              data-toggle=\"tab\"
              data-type=\"order\"
              href=\"#orders-notifications\"
              role=\"tab\"
            >
              Commandes<span id=\"_nb_new_orders_\"></span>
            </a>
          </li>
                                    <li class=\"nav-item\">
            <a
              class=\"nav-link \"
              id=\"customers-tab\"
              data-toggle=\"tab\"
              data-type=\"customer\"
              href=\"#customers-notifications\"
              role=\"tab\"
            >
              Clients<span id=\"_nb_new_customers_\"></span>
            </a>
          </li>
                                    <li class=\"nav-item\">
            <a
              class=\"nav-link \"
              id=\"messages-tab\"
              data-toggle=\"tab\"
              data-type=\"customer_message\"
              href=\"#messages-notifications\"
              role=\"tab\"
            >
              Messages<span id=\"_nb_new_messages_\"></span>
            </a>
          </li>
                        </ul>

      <!-- Tab panes -->
      <div class=\"tab-content\">
                          <div class=\"tab-pane active empty\" id=\"orders-notifications\" role=\"tabpanel\">
            <p class=\"no-notification\">
              Pas de nouvelle commande pour le moment :(<br>
              Avez-vous consulté vos <strong><a href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminCarts&action=filterOnlyAbandonedCarts&token=3c50bf1b3a58ef82ba73049b495d203c\">paniers abandonnés</a></strong> ?<br> Votre prochaine commande s'y trouve peut-être !
            </p>
            <div class=\"notification-elements\"></div>
          </div>
                                    <div class=\"tab-pane  empty\" id=\"customers-notifications\" role=\"tabpanel\">
            <p class=\"no-notification\">
              Aucun nouveau client pour l'instant :(<br>
              Êtes-vous act";
        // line 373
        echo "ifs sur les réseaux sociaux en ce moment ?
            </p>
            <div class=\"notification-elements\"></div>
          </div>
                                    <div class=\"tab-pane  empty\" id=\"messages-notifications\" role=\"tabpanel\">
            <p class=\"no-notification\">
              Pas de nouveau message pour l'instant.<br>
              On dirait que vos clients sont satisfaits :)
            </p>
            <div class=\"notification-elements\"></div>
          </div>
                        </div>
    </div>
  </div>
</div>

  <script type=\"text/html\" id=\"order-notification-template\">
    <a class=\"notif\" href='order_url'>
      #_id_order_ -
      de <strong>_customer_name_</strong> (_iso_code_)_carrier_
      <strong class=\"float-sm-right\">_total_paid_</strong>
    </a>
  </script>

  <script type=\"text/html\" id=\"customer-notification-template\">
    <a class=\"notif\" href='customer_url'>
      #_id_customer_ - <strong>_customer_name_</strong>_company_ - enregistré le <strong>_date_add_</strong>
    </a>
  </script>

  <script type=\"text/html\" id=\"message-notification-template\">
    <a class=\"notif\" href='message_url'>
    <span class=\"message-notification-status _status_\">
      <i class=\"material-icons\">fiber_manual_record</i> _status_
    </span>
      - <strong>_customer_name_</strong> (_company_) - <i class=\"material-icons\">access_time</i> _date_add_
    </a>
  </script>
          </div>
        
        <div class=\"component\" id=\"header-employee-container\">
          <div class=\"dropdown employee-dropdown\">
  <div class=\"rounded-circle person\" data-toggle=\"dropdown\">
    <i class=\"material-icons\">account_circle</i>
  </div>
  <div class=\"dropdown-menu dropdown-menu-right\">
    <div class=\"employee-wrapper-avatar\">
      <div class=\"employee-top\">
        <span class=\"employee-avatar\"><img class=\"avatar rounded-circle\" src=\"http://localhost/Prestashop/img/pr/default.jpg\" alt=\"Manda\" /></span>
        <span class=\"employee_profile\">Ravi de vous re";
        // line 422
        echo "voir Manda</span>
      </div>

      <a class=\"dropdown-item employee-link profile-link\" href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/advanced/employees/1/edit?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\">
      <i class=\"material-icons\">edit</i>
      <span>Votre profil</span>
    </a>
    </div>

    <p class=\"divider\"></p>

                  <a class=\"dropdown-item \" href=\"https://accounts.distribution.prestashop.net?utm_source=localhost&utm_medium=back-office&utm_campaign=ps_accounts&utm_content=headeremployeedropdownlink\"  target=\"_blank\" rel=\"noopener noreferrer nofollow\">
            <i class=\"material-icons\">open_in_new</i> Manage your PrestaShop account
        </a>
                          <a class=\"dropdown-item ps_mbo\" href=\"https://www.prestashop.com/fr/formation?utm_source=back-office&utm_medium=menu&utm_content=download8_2&utm_campaign=training-fr\"  target=\"_blank\" rel=\"noopener noreferrer nofollow\">
            <i class=\"material-icons\">school</i> Formation
        </a>
                          <a class=\"dropdown-item ps_mbo\" href=\"https://www.prestashop.com/fr/experts?utm_source=back-office&utm_medium=menu&utm_content=download8_2&utm_campaign=expert-fr\"  target=\"_blank\" rel=\"noopener noreferrer nofollow\">
            <i class=\"material-icons\">person_pin_circle</i> Trouver un expert
        </a>
                          <a class=\"dropdown-item ps_mbo\" href=\"/Prestashop/admin/index.php/modules/mbo/modules/catalog/?utm_mbo_source=menu-user-back-office&_token=EgKZ-442O54tHyVg59pz8Zj0opxHbpSFagQWkRzlu7A&utm_source=back-office&utm_medium=menu&utm_content=download8_2&utm_campaign=addons-fr\"  rel=\"noopener noreferrer nofollow\">
            <i class=\"material-icons\">extension</i> Marketplace Prestashop
        </a>
                          <a class=\"dropdown-item ps_mbo\" href=\"https://help-center.prestashop.com/fr?utm_source=back-office&utm_medium=menu&utm_content=download8_2&utm_campaign=help-center-fr\"  target=\"_blank\" rel=\"no";
        // line 445
        echo "opener noreferrer nofollow\">
            <i class=\"material-icons\">help</i> Centre d'assistance
        </a>
                  <p class=\"divider\"></p>
            
    <a class=\"dropdown-item employee-link text-center\" id=\"header_logout\" href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminLogin&amp;logout=1&amp;token=b63558f3c0d27334393dd73b82dae00c\">
      <i class=\"material-icons d-lg-none\">power_settings_new</i>
      <span>Déconnexion</span>
    </a>
  </div>
</div>
        </div>
              </div>
    </nav>
  </header>

  <nav class=\"nav-bar d-none d-print-none d-md-block\">
  <span class=\"menu-collapse\" data-toggle-url=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/advanced/employees/toggle-navigation?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\">
    <i class=\"material-icons rtl-flip\">chevron_left</i>
    <i class=\"material-icons rtl-flip\">chevron_left</i>
  </span>

  <div class=\"nav-bar-overflow\">
      <div class=\"logo-container\">
          <a id=\"header_logo\" class=\"logo float-left\" href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/modules/pseditionbasic/homepage?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\"></a>
          <span id=\"shop_version\" class=\"header-version\">8.2.6</span>
      </div>

      <ul class=\"main-menu\">
              
                                          
                    
          
            <li class=\"category-title\" data-submenu=\"152\" id=\"tab-HOME\">
                <span class=\"title\">Bienvenue</span>
            </li>

                              
                  
                                                      
                  
                  <li class=\"link-levelone\" data-submenu=\"153\" id=\"subtab-AdminPsEditionBasicHomepageController\">
                    <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/modules/pseditionbasic/homepage?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\">
                      <i class=\"mat";
        // line 488
        echo "erial-icons mi-home\">home</i>
                      <span>
                      Accueil
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone\" data-submenu=\"1\" id=\"subtab-AdminDashboard\">
                    <a href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminDashboard&amp;token=eba87ff896ab7c92b4a7ce89abbf154a\" class=\"link\">
                      <i class=\"material-icons mi-trending_up\">trending_up</i>
                      <span>
                      Tableau de bord
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                        </li>
                              
          
                      
                                          
                    
          
            <li class=\"category-title\" data-submenu=\"2\" id=\"tab-SELL\">
                <span class=\"title\">Vendre</span>
            </li>

                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"3\" id=\"subtab-AdminParentOrders\">
                    <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/sell/orders/?_token=_5o6zxU6TClW";
        // line 527
        echo "YAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\">
                      <i class=\"material-icons mi-shopping_basket\">shopping_basket</i>
                      <span>
                      Commandes
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-3\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"4\" id=\"subtab-AdminOrders\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/sell/orders/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Commandes
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"5\" id=\"subtab-AdminInvoices\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/sell/orders/invoices/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Factures
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"6\" id=\"subtab-AdminSlip\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/in";
        // line 557
        echo "dex.php/sell/orders/credit-slips/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Avoirs
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"7\" id=\"subtab-AdminDeliverySlip\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/sell/orders/delivery-slips/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Bons de livraison
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"8\" id=\"subtab-AdminCarts\">
                                <a href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminCarts&amp;token=3c50bf1b3a58ef82ba73049b495d203c\" class=\"link\"> Paniers
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"9\" id=\"subtab-AdminCatalog\">
                    <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/sell/catalog/products?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\">
                      <i class=\"material-icons mi-store\">store</i>
                      <span>
                      Catalogue
                      </span>
                                     ";
        // line 589
        echo "               <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-9\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"10\" id=\"subtab-AdminProducts\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/sell/catalog/products?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Produits
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"11\" id=\"subtab-AdminCategories\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/sell/catalog/categories?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Catégories
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"12\" id=\"subtab-AdminTracking\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/sell/catalog/monitoring/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Suivi
                                </a>
                              </li>

                                                           ";
        // line 618
        echo "                       
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"13\" id=\"subtab-AdminParentAttributesGroups\">
                                <a href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminAttributesGroups&amp;token=2cfcd63fdb3c582ebd4044d1df713b57\" class=\"link\"> Attributs &amp; caractéristiques
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"16\" id=\"subtab-AdminParentManufacturers\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/sell/catalog/brands/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Marques et fournisseurs
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"19\" id=\"subtab-AdminAttachments\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/sell/attachments/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Fichiers
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"20\" id=\"subtab-AdminParentCartRules\">
                                <a href=\"http://localhost/Prestashop/admin1694gejjgz33ijp";
        // line 646
        echo "xtei/index.php?controller=AdminCartRules&amp;token=d0012cf1c80b32de989d731b5c04706d\" class=\"link\"> Réductions
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"23\" id=\"subtab-AdminStockManagement\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/sell/stocks/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Stock
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"24\" id=\"subtab-AdminParentCustomer\">
                    <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/sell/customers/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\">
                      <i class=\"material-icons mi-account_circle\">account_circle</i>
                      <span>
                      Clients
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-24\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li ";
        // line 678
        echo "class=\"link-leveltwo\" data-submenu=\"25\" id=\"subtab-AdminCustomers\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/sell/customers/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Clients
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"26\" id=\"subtab-AdminAddresses\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/sell/addresses/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Adresses
                                </a>
                              </li>

                                                                                                                                    </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"28\" id=\"subtab-AdminParentCustomerThreads\">
                    <a href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminCustomerThreads&amp;token=56e461b15135808eb31a98851a8ab570\" class=\"link\">
                      <i class=\"material-icons mi-chat\">chat</i>
                      <span>
                      SAV
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-28\" class=\"submenu pa";
        // line 707
        echo "nel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"29\" id=\"subtab-AdminCustomerThreads\">
                                <a href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminCustomerThreads&amp;token=56e461b15135808eb31a98851a8ab570\" class=\"link\"> SAV
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"30\" id=\"subtab-AdminOrderMessage\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/sell/customer-service/order-messages/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Messages prédéfinis
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"31\" id=\"subtab-AdminReturn\">
                                <a href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminReturn&amp;token=3f455f9c73da6aad978cd55f4b6f0f01\" class=\"link\"> Retours produits
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone\" data-submenu=\"32\" id=\"subt";
        // line 738
        echo "ab-AdminStats\">
                    <a href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminStats&amp;token=cd844bcd4c3365192b7bbc4ee1049361\" class=\"link\">
                      <i class=\"material-icons mi-assessment\">assessment</i>
                      <span>
                      Statistiques
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                        </li>
                              
          
                      
                                          
                    
          
            <li class=\"category-title\" data-submenu=\"37\" id=\"tab-IMPROVE\">
                <span class=\"title\">Personnaliser</span>
            </li>

                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"38\" id=\"subtab-AdminParentModulesSf\">
                    <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/modules/mbo/modules/catalog/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\">
                      <i class=\"material-icons mi-extension\">extension</i>
                      <span>
                      Modules
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-38\" class=\"submenu panel-collapse\">
                                              ";
        // line 774
        echo "                                                                                                                    
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"162\" id=\"subtab-AdminPsMboModuleParent\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/modules/mbo/modules/catalog/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Marketplace
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"39\" id=\"subtab-AdminModulesSf\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/improve/modules/manage?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Gestionnaire de modules 
                                </a>
                              </li>

                                                                                                                                                                                          </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"43\" id=\"subtab-AdminParentThemes\">
                    <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/improve/design/themes/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\">
                      <i class=\"material-icons mi-desktop_mac\">desktop_mac</i>
                      <span>
                      Apparence
                      </span>
                                        ";
        // line 802
        echo "            <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-43\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"169\" id=\"subtab-AdminThemesParent\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/improve/design/themes/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Thème et logo
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"166\" id=\"subtab-AdminPsMboTheme\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/modules/mbo/themes/catalog/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Themes Catalog
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"45\" id=\"subtab-AdminParentMailTheme\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/improve/design/mail_theme/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Thème d&#039;e-mail
                                </a>
                              </li>

                 ";
        // line 831
        echo "                                                                 
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"47\" id=\"subtab-AdminCmsContent\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/improve/design/cms-pages/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Pages
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"48\" id=\"subtab-AdminModulesPositions\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/improve/design/modules/positions/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Positions
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"49\" id=\"subtab-AdminImages\">
                                <a href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminImages&amp;token=40b82801f233ad39fc76c1acff305b42\" class=\"link\"> Images
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"118\" id=\"subtab-AdminLinkWidget\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/modules/link-wid";
        // line 859
        echo "get/list?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Liste de liens
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"50\" id=\"subtab-AdminParentShipping\">
                    <a href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminCarriers&amp;token=4a028b39730515be5702972b001f0142\" class=\"link\">
                      <i class=\"material-icons mi-local_shipping\">local_shipping</i>
                      <span>
                      Livraison
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-50\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"51\" id=\"subtab-AdminCarriers\">
                                <a href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminCarriers&amp;token=4a028b39730515be5702972b001f0142\" class=\"link\"> Transporteurs
                                </a>
                              </li>

                                                                                  
                              
                                                            
               ";
        // line 891
        echo "               <li class=\"link-leveltwo\" data-submenu=\"52\" id=\"subtab-AdminShipping\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/improve/shipping/preferences/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Préférences
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"53\" id=\"subtab-AdminParentPayment\">
                    <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/improve/payment/payment_methods?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\">
                      <i class=\"material-icons mi-payment\">payment</i>
                      <span>
                      Paiement
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-53\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"54\" id=\"subtab-AdminPayment\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/improve/payment/payment_methods?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Moyens de paiement
                                </a>
                              </li>

          ";
        // line 921
        echo "                                                                        
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"55\" id=\"subtab-AdminPaymentPreferences\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/improve/payment/preferences?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Préférences
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"56\" id=\"subtab-AdminInternational\">
                    <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/improve/international/localization/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\">
                      <i class=\"material-icons mi-language\">language</i>
                      <span>
                      International
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-56\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"57\" id=\"subtab-AdminParentLocalization\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/i";
        // line 950
        echo "ndex.php/improve/international/localization/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Localisation
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"62\" id=\"subtab-AdminParentCountries\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/improve/international/zones/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Zones géographiques
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"66\" id=\"subtab-AdminParentTaxes\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/improve/international/taxes/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Taxes
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"69\" id=\"subtab-AdminTranslations\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/improve/international/translations/settings?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Traductions
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
     ";
        // line 980
        echo "                                         
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"138\" id=\"subtab-Marketing\">
                    <a href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminPsxMktgWithGoogleModule&amp;token=7371bd1fcbd40a818db75e2d4e85a4a3\" class=\"link\">
                      <i class=\"material-icons mi-campaign\">campaign</i>
                      <span>
                      Marketing
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-138\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"139\" id=\"subtab-AdminPsxMktgWithGoogleModule\">
                                <a href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminPsxMktgWithGoogleModule&amp;token=7371bd1fcbd40a818db75e2d4e85a4a3\" class=\"link\"> Google
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"158\" id=\"subtab-AdminPsfacebookModule\">
                                <a href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminPsfacebookModule&amp;token=9e68df25f1adea3397f8e510f3db9614\" clas";
        // line 1007
        echo "s=\"link\"> Facebook &amp; Instagram
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                              
          
                      
                                          
                    
          
            <li class=\"category-title link-active\" data-submenu=\"70\" id=\"tab-CONFIGURE\">
                <span class=\"title\">Configurer</span>
            </li>

                              
                  
                                                      
                  
                  <li class=\"link-levelone\" data-submenu=\"154\" id=\"subtab-AdminPsEditionBasicSettingsController\">
                    <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/modules/pseditionbasic/settings?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\">
                      <i class=\"material-icons mi-settings\">settings</i>
                      <span>
                      Paramètres
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone has_submenu\" data-submenu=\"71\" id=\"subtab-ShopParameters\">
                    <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/shop/preferences/preferences?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\">
                      <i class=\"material-icons mi-settings\">settings</i>
                      <span>
              ";
        // line 1046
        echo "        Paramètres de la boutique
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-71\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"72\" id=\"subtab-AdminParentPreferences\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/shop/preferences/preferences?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Paramètres généraux
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"75\" id=\"subtab-AdminParentOrderPreferences\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/shop/order-preferences/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Commandes
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"78\" id=\"subtab-AdminPPreferences\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/shop/product-preferences/?_token=_5o6zxU6TClWYAxUsten";
        // line 1073
        echo "G1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Produits
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"79\" id=\"subtab-AdminParentCustomerPreferences\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/shop/customer-preferences/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Clients
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"83\" id=\"subtab-AdminParentStores\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/shop/contacts/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Contact
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"86\" id=\"subtab-AdminParentMeta\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/shop/seo-urls/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Trafic et SEO
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-level";
        // line 1104
        echo "two\" data-submenu=\"89\" id=\"subtab-AdminParentSearchConf\">
                                <a href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminSearchConf&amp;token=8ea6dca3bfd004d83c4a91815f9e088b\" class=\"link\"> Rechercher
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                                              
                  
                                                      
                                                          
                  <li class=\"link-levelone has_submenu link-active open ul-open\" data-submenu=\"92\" id=\"subtab-AdminAdvancedParameters\">
                    <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/advanced/system-information/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\">
                      <i class=\"material-icons mi-settings_applications\">settings_applications</i>
                      <span>
                      Paramètres avancés
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_up
                                                            </i>
                                            </a>
                                              <ul id=\"collapse-92\" class=\"submenu panel-collapse\">
                                                      
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"93\" id=\"subtab-AdminInformation\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/advanced/system-information/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Inf";
        // line 1130
        echo "ormations
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"94\" id=\"subtab-AdminPerformance\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/advanced/performance/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Performances
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"95\" id=\"subtab-AdminAdminPreferences\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/advanced/administration/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Administration
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"96\" id=\"subtab-AdminEmails\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/advanced/emails/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> E-mail
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"97\" id=\"subtab-AdminI";
        // line 1161
        echo "mport\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/advanced/import/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Importer
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"98\" id=\"subtab-AdminParentEmployees\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/advanced/employees/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Équipe
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"102\" id=\"subtab-AdminParentRequestSql\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/advanced/sql-requests/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Base de données
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"105\" id=\"subtab-AdminLogs\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/advanced/logs/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Logs
                                </a>
                              </li>

                                                                                  
  ";
        // line 1191
        echo "                            
                                                            
                              <li class=\"link-leveltwo link-active\" data-submenu=\"106\" id=\"subtab-AdminWebservice\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/advanced/webservice-keys/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Webservice
                                </a>
                              </li>

                                                                                                                                                                                                                                                    
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"110\" id=\"subtab-AdminFeatureFlag\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/advanced/feature-flags/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Fonctionnalités nouvelles et expérimentales
                                </a>
                              </li>

                                                                                  
                              
                                                            
                              <li class=\"link-leveltwo\" data-submenu=\"111\" id=\"subtab-AdminParentSecurity\">
                                <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/advanced/security/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\"> Sécurité
                                </a>
                              </li>

                                                                              </ul>
                                        </li>
                                              
                  
                      ";
        // line 1218
        echo "                                
                  
                  <li class=\"link-levelone\" data-submenu=\"128\" id=\"subtab-AdminKlaviyoPsConfig\">
                    <a href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminKlaviyoPsConfig&amp;token=a8aeef07a8b2bf6d987f38cfdd6d1743\" class=\"link\">
                      <i class=\"material-icons mi-trending_up\">trending_up</i>
                      <span>
                      Klaviyo
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                        </li>
                                              
                  
                                                      
                  
                  <li class=\"link-levelone\" data-submenu=\"130\" id=\"subtab-AdminPsAssistantSettings\">
                    <a href=\"http://localhost/Prestashop/admin1694gejjgz33ijpxtei/index.php?controller=AdminPsAssistantSettings&amp;token=c7cf0228ae395541c1b88208fcc3cfd1\" class=\"link\">
                      <i class=\"material-icons mi-extension\">extension</i>
                      <span>
                      Assistance By PrestaShop
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                        </li>
                              
          
                      
                                          
                    
          
            <li class=\"category-title\" data-submenu=\"150\" id=\"tab-Adm";
        // line 1252
        echo "inPsdistributionapiclientCommunity\">
                <span class=\"title\">Community</span>
            </li>

                              
                  
                                                      
                  
                  <li class=\"link-levelone\" data-submenu=\"151\" id=\"subtab-AdminPsdistributionapiclient\">
                    <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/modules/ps_distributionapiclient/top-contributors?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"link\">
                      <i class=\"material-icons mi-groups\">groups</i>
                      <span>
                      Wall of Fame
                      </span>
                                                    <i class=\"material-icons sub-tabs-arrow\">
                                                                    keyboard_arrow_down
                                                            </i>
                                            </a>
                                        </li>
                              
          
                  </ul>
  </div>
  
</nav>


<div class=\"header-toolbar d-print-none\">
    
  <div class=\"container-fluid\">

    
      <nav aria-label=\"Breadcrumb\">
        <ol class=\"breadcrumb\">
                      <li class=\"breadcrumb-item\">Paramètres avancés</li>
          
                      <li class=\"breadcrumb-item active\">
              <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/configure/advanced/webservice-keys/?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" aria-current=\"page\">Webservice</a>
            </li>
                  </ol>
      </nav>
    

    <div class=\"title-row\">
      
          <h1 class=\"title\">
            Webservice          </h1>
      

      
        <div class=\"toolbar-icons\">
          <div class=\"wrapper\">
            
                        
            
                              <a class=\"btn btn-outline-secondary btn-help\" href=\"https://";
        // line 1307
        echo "help.prestashop-project.org/fr/doc/AdminWebservice?version=8.2.6&amp;country=fr\" title=\"Aide\">
                  Aide
                </a>
                                    </div>
        </div>

      
    </div>
  </div>

  
  
  <div class=\"btn-floating\">
    <button class=\"btn btn-primary collapsed\" data-toggle=\"collapse\" data-target=\".btn-floating-container\" aria-expanded=\"false\">
      <i class=\"material-icons\">add</i>
    </button>
    <div class=\"btn-floating-container collapse\">
      <div class=\"btn-floating-menu\">
        
        
                              <a class=\"btn btn-floating-item btn-help\" href=\"https://help.prestashop-project.org/fr/doc/AdminWebservice?version=8.2.6&amp;country=fr\" title=\"Aide\">
              Aide
            </a>
                        </div>
    </div>
  </div>
  
</div>

<div id=\"main-div\">
          
      <div class=\"content-div  \">

        

                                                        
        <div id=\"ajax_confirmation\" class=\"alert alert-success\" style=\"display: none;\"></div>
<div id=\"content-message-box\"></div>


  ";
        // line 1347
        $this->displayBlock('content_header', $context, $blocks);
        $this->displayBlock('content', $context, $blocks);
        $this->displayBlock('content_footer', $context, $blocks);
        $this->displayBlock('sidebar_right', $context, $blocks);
        echo "

        

      </div>
    </div>

  <div id=\"non-responsive\" class=\"js-non-responsive\">
  <h1>Oh non !</h1>
  <p class=\"mt-3\">
    La version mobile de cette page n'est pas encore disponible.
  </p>
  <p class=\"mt-2\">
    Cette page n'est pas encore disponible sur mobile, merci de la consulter sur ordinateur.
  </p>
  <p class=\"mt-2\">
    Merci.
  </p>
  <a href=\"/Prestashop/admin1694gejjgz33ijpxtei/index.php/modules/pseditionbasic/homepage?_token=_5o6zxU6TClWYAxUstenG1LibD_jHvFFdz-CH_A0_eo\" class=\"btn btn-primary py-1 mt-3\">
    <i class=\"material-icons rtl-flip\">arrow_back</i>
    Précédent
  </a>
</div>
  <div class=\"mobile-layer\"></div>

      <div id=\"footer\" class=\"bootstrap\">
    
</div>
  

      <div class=\"bootstrap\">
      
    </div>
  
";
        // line 1381
        $this->displayBlock('javascripts', $context, $blocks);
        $this->displayBlock('extra_javascripts', $context, $blocks);
        $this->displayBlock('translate_javascripts', $context, $blocks);
        echo "</body>";
        echo "
</html>";
    }

    // line 117
    public function block_stylesheets($context, array $blocks = [])
    {
        $macros = $this->macros;
    }

    public function block_extra_stylesheets($context, array $blocks = [])
    {
        $macros = $this->macros;
    }

    // line 1347
    public function block_content_header($context, array $blocks = [])
    {
        $macros = $this->macros;
    }

    public function block_content($context, array $blocks = [])
    {
        $macros = $this->macros;
    }

    public function block_content_footer($context, array $blocks = [])
    {
        $macros = $this->macros;
    }

    public function block_sidebar_right($context, array $blocks = [])
    {
        $macros = $this->macros;
    }

    // line 1381
    public function block_javascripts($context, array $blocks = [])
    {
        $macros = $this->macros;
    }

    public function block_extra_javascripts($context, array $blocks = [])
    {
        $macros = $this->macros;
    }

    public function block_translate_javascripts($context, array $blocks = [])
    {
        $macros = $this->macros;
    }

    public function getTemplateName()
    {
        return "__string_template__220f4ba3bdbd916b6419b2e63dbc3053";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  1558 => 1381,  1537 => 1347,  1526 => 117,  1517 => 1381,  1477 => 1347,  1435 => 1307,  1378 => 1252,  1342 => 1218,  1313 => 1191,  1281 => 1161,  1248 => 1130,  1220 => 1104,  1187 => 1073,  1158 => 1046,  1117 => 1007,  1088 => 980,  1056 => 950,  1025 => 921,  993 => 891,  959 => 859,  929 => 831,  898 => 802,  868 => 774,  830 => 738,  797 => 707,  766 => 678,  732 => 646,  702 => 618,  671 => 589,  637 => 557,  605 => 527,  564 => 488,  519 => 445,  494 => 422,  443 => 373,  392 => 324,  350 => 284,  306 => 242,  269 => 207,  250 => 190,  209 => 151,  170 => 117,  138 => 87,  119 => 70,  87 => 40,  46 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "__string_template__220f4ba3bdbd916b6419b2e63dbc3053", "");
    }
}
