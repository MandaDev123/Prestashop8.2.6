<?php

class ModuleRepository_091bb2f extends \PrestaShop\PrestaShop\Core\Module\ModuleRepository implements \ProxyManager\Proxy\VirtualProxyInterface
{
    private $valueHolderc63a2 = null;
    private $initializere25be = null;
    private static $publicPropertiese580e = [
        
    ];
    public function getList() : \PrestaShop\PrestaShop\Core\Module\ModuleCollection
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'getList', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->getList();
    }
    public function getInstalledModules() : \PrestaShop\PrestaShop\Core\Module\ModuleCollection
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'getInstalledModules', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->getInstalledModules();
    }
    public function getMustBeConfiguredModules() : \PrestaShop\PrestaShop\Core\Module\ModuleCollection
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'getMustBeConfiguredModules', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->getMustBeConfiguredModules();
    }
    public function getUpgradableModules() : \PrestaShop\PrestaShop\Core\Module\ModuleCollection
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'getUpgradableModules', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->getUpgradableModules();
    }
    public function getModule(string $moduleName) : \PrestaShop\PrestaShop\Core\Module\ModuleInterface
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'getModule', array('moduleName' => $moduleName), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->getModule($moduleName);
    }
    public function getModulePath(string $moduleName) : ?string
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'getModulePath', array('moduleName' => $moduleName), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->getModulePath($moduleName);
    }
    public function setActionUrls(\PrestaShop\PrestaShop\Core\Module\ModuleCollection $collection) : \PrestaShop\PrestaShop\Core\Module\ModuleCollection
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'setActionUrls', array('collection' => $collection), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->setActionUrls($collection);
    }
    public function clearCache(?string $moduleName = null, bool $allShops = false) : bool
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'clearCache', array('moduleName' => $moduleName, 'allShops' => $allShops), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->clearCache($moduleName, $allShops);
    }
    public static function staticProxyConstructor($initializer)
    {
        static $reflection;
        $reflection = $reflection ?? new \ReflectionClass(__CLASS__);
        $instance   = $reflection->newInstanceWithoutConstructor();
        \Closure::bind(function (\PrestaShop\PrestaShop\Core\Module\ModuleRepository $instance) {
            unset($instance->moduleDataProvider, $instance->adminModuleDataProvider, $instance->hookManager, $instance->cacheProvider, $instance->modulePath, $instance->installedModules, $instance->modulesFromHook, $instance->contextLangId);
        }, $instance, 'PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository')->__invoke($instance);
        $instance->initializere25be = $initializer;
        return $instance;
    }
    public function __construct(\PrestaShop\PrestaShop\Adapter\Module\ModuleDataProvider $moduleDataProvider, \PrestaShop\PrestaShop\Adapter\Module\AdminModuleDataProvider $adminModuleDataProvider, \Doctrine\Common\Cache\CacheProvider $cacheProvider, \PrestaShop\PrestaShop\Adapter\HookManager $hookManager, string $modulePath, int $contextLangId)
    {
        static $reflection;
        if (! $this->valueHolderc63a2) {
            $reflection = $reflection ?? new \ReflectionClass('PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository');
            $this->valueHolderc63a2 = $reflection->newInstanceWithoutConstructor();
        \Closure::bind(function (\PrestaShop\PrestaShop\Core\Module\ModuleRepository $instance) {
            unset($instance->moduleDataProvider, $instance->adminModuleDataProvider, $instance->hookManager, $instance->cacheProvider, $instance->modulePath, $instance->installedModules, $instance->modulesFromHook, $instance->contextLangId);
        }, $this, 'PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository')->__invoke($this);
        }
        $this->valueHolderc63a2->__construct($moduleDataProvider, $adminModuleDataProvider, $cacheProvider, $hookManager, $modulePath, $contextLangId);
    }
    public function & __get($name)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, '__get', ['name' => $name], $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        if (isset(self::$publicPropertiese580e[$name])) {
            return $this->valueHolderc63a2->$name;
        }
        $realInstanceReflection = new \ReflectionClass('PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository');
        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolderc63a2;
            $backtrace = debug_backtrace(false, 1);
            trigger_error(
                sprintf(
                    'Undefined property: %s::$%s in %s on line %s',
                    $realInstanceReflection->getName(),
                    $name,
                    $backtrace[0]['file'],
                    $backtrace[0]['line']
                ),
                \E_USER_NOTICE
            );
            return $targetObject->$name;
        }
        $targetObject = $this->valueHolderc63a2;
        $accessor = function & () use ($targetObject, $name) {
            return $targetObject->$name;
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $returnValue = & $accessor();
        return $returnValue;
    }
    public function __set($name, $value)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, '__set', array('name' => $name, 'value' => $value), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        $realInstanceReflection = new \ReflectionClass('PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository');
        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolderc63a2;
            $targetObject->$name = $value;
            return $targetObject->$name;
        }
        $targetObject = $this->valueHolderc63a2;
        $accessor = function & () use ($targetObject, $name, $value) {
            $targetObject->$name = $value;
            return $targetObject->$name;
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $returnValue = & $accessor();
        return $returnValue;
    }
    public function __isset($name)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, '__isset', array('name' => $name), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        $realInstanceReflection = new \ReflectionClass('PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository');
        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolderc63a2;
            return isset($targetObject->$name);
        }
        $targetObject = $this->valueHolderc63a2;
        $accessor = function () use ($targetObject, $name) {
            return isset($targetObject->$name);
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $returnValue = $accessor();
        return $returnValue;
    }
    public function __unset($name)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, '__unset', array('name' => $name), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        $realInstanceReflection = new \ReflectionClass('PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository');
        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolderc63a2;
            unset($targetObject->$name);
            return;
        }
        $targetObject = $this->valueHolderc63a2;
        $accessor = function () use ($targetObject, $name) {
            unset($targetObject->$name);
            return;
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $accessor();
    }
    public function __clone()
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, '__clone', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        $this->valueHolderc63a2 = clone $this->valueHolderc63a2;
    }
    public function __sleep()
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, '__sleep', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return array('valueHolderc63a2');
    }
    public function __wakeup()
    {
        \Closure::bind(function (\PrestaShop\PrestaShop\Core\Module\ModuleRepository $instance) {
            unset($instance->moduleDataProvider, $instance->adminModuleDataProvider, $instance->hookManager, $instance->cacheProvider, $instance->modulePath, $instance->installedModules, $instance->modulesFromHook, $instance->contextLangId);
        }, $this, 'PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository')->__invoke($this);
    }
    public function setProxyInitializer(\Closure $initializer = null) : void
    {
        $this->initializere25be = $initializer;
    }
    public function getProxyInitializer() : ?\Closure
    {
        return $this->initializere25be;
    }
    public function initializeProxy() : bool
    {
        return $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'initializeProxy', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
    }
    public function isProxyInitialized() : bool
    {
        return null !== $this->valueHolderc63a2;
    }
    public function getWrappedValueHolderValue()
    {
        return $this->valueHolderc63a2;
    }
}
