<?php
/* Smarty version 4.3.4, created on 2026-05-06 10:20:13
  from 'C:\xampp\htdocs\Prestashop\themes\classic\templates\_partials\helpers.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_69faebadee7d91_82338077',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'e462a7ba255538abba48c190b20969af62904d2b' => 
    array (
      0 => 'C:\\xampp\\htdocs\\Prestashop\\themes\\classic\\templates\\_partials\\helpers.tpl',
      1 => 1738258500,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_69faebadee7d91_82338077 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->smarty->ext->_tplFunction->registerTplFunctions($_smarty_tpl, array (
  'renderLogo' => 
  array (
    'compiled_filepath' => 'C:\\xampp\\htdocs\\Prestashop\\var\\cache\\prod\\smarty\\compile\\classiclayouts_layout_left_column_tpl\\e4\\62\\a7\\e462a7ba255538abba48c190b20969af62904d2b_2.file.helpers.tpl.php',
    'uid' => 'e462a7ba255538abba48c190b20969af62904d2b',
    'call_name' => 'smarty_template_function_renderLogo_55267829069faebaded62c4_33918844',
  ),
));
?> 

<?php }
/* smarty_template_function_renderLogo_55267829069faebaded62c4_33918844 */
if (!function_exists('smarty_template_function_renderLogo_55267829069faebaded62c4_33918844')) {
function smarty_template_function_renderLogo_55267829069faebaded62c4_33918844(Smarty_Internal_Template $_smarty_tpl,$params) {
foreach ($params as $key => $value) {
$_smarty_tpl->tpl_vars[$key] = new Smarty_Variable($value, $_smarty_tpl->isRenderingCache);
}
?>

  <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['pages']['index'], ENT_QUOTES, 'UTF-8');?>
">
    <img
      class="logo img-fluid"
      src="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['logo_details']['src'], ENT_QUOTES, 'UTF-8');?>
"
      alt="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['name'], ENT_QUOTES, 'UTF-8');?>
"
      width="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['logo_details']['width'], ENT_QUOTES, 'UTF-8');?>
"
      height="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['logo_details']['height'], ENT_QUOTES, 'UTF-8');?>
">
  </a>
<?php
}}
/*/ smarty_template_function_renderLogo_55267829069faebaded62c4_33918844 */
}
