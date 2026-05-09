<?php
/* Smarty version 4.3.4, created on 2026-05-08 13:19:16
  from 'C:\xampp\htdocs\Prestashop\modules\ps_checkout\views\templates\hook\adminAfterHeader\promotionBlock.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_69fdb8a45f05b6_60001560',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'e50ea096b259a48d943940e84735fd1c87a8ec50' => 
    array (
      0 => 'C:\\xampp\\htdocs\\Prestashop\\modules\\ps_checkout\\views\\templates\\hook\\adminAfterHeader\\promotionBlock.tpl',
      1 => 1777407618,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_69fdb8a45f05b6_60001560 (Smarty_Internal_Template $_smarty_tpl) {
?><div class="container">
    <div class="row">
        <div class="col">
            <div class="card" data-test="ps-checkout-card">
                <h3 class="card-header">
                    <i class="material-icons">extension</i> <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'One module, all payments methods.','d'=>'Modules.Checkout.Pscheckout'),$_smarty_tpl ) );?>

                </h3>
                <div class="card-block">
                    <div class="module-item-list">
                        <div class="row module-item-wrapper-list py-3">
                            <div class="col-12 col-sm-2 col-md-2 col-lg-3">
                                <div class="img m-auto">
                                </div>
                            </div>
                            <div class="row col-12 col-sm-6 col-md-7 col-lg-7 pl-0">
                                <div class="col-12 col-sm-12 col-md-12 col-lg-8 pl-0">
                                    <ul class="text-muted">
                                        <li class="mb-1"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Offer the widest range of payment methods: cards, PayPal, etc.','d'=>'Modules.Checkout.Pscheckout'),$_smarty_tpl ) );?>
</li>
                                        <li class="mb-1"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Benefit from all PayPal expertise and advantages','d'=>'Modules.Checkout.Pscheckout'),$_smarty_tpl ) );?>
</li>
                                        <li><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Give access to relevant local payment methods for customers around the globe','d'=>'Modules.Checkout.Pscheckout'),$_smarty_tpl ) );?>
</li>
                                    </ul>
                                </div>
                                <div class="col-12 col-sm-12 col-md-12 col-lg-4 pl-0">
                                    <label class="text-muted">
                                        <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Including:','d'=>'Modules.Checkout.Pscheckout'),$_smarty_tpl ) );?>

                                    </label>
                                    <div>
                                        <img class="payment-icon" src="<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['modulePath']->value,'htmlall','UTF-8' ));?>
views/img/paypal.jpg" alt="">
                                        <img class="payment-icon" src="<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['modulePath']->value,'htmlall','UTF-8' ));?>
views/img/visa.jpg" alt="">
                                        <img class="payment-icon" src="<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['modulePath']->value,'htmlall','UTF-8' ));?>
views/img/mastercard.jpg" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-4 col-md-3 col-lg-2 mb-3 m-auto">
                                <div class="text-xs-center">
                                    <a href="<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['configureLink']->value,'htmlall','UTF-8' ));?>
" class="btn btn-primary-reverse btn-outline-primary light-button">
                                        <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Configure','d'=>'Modules.Checkout.Pscheckout'),$_smarty_tpl ) );?>

                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php }
}
