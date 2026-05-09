<?php

class ModuleRepository_091bb2f extends \PrestaShop\PrestaShop\Core\Module\ModuleRepository implements \ProxyManager\Proxy\VirtualProxyInterface
{
    private $valueHolder5ac87 = null;
    private $initializer8d6cb = null;
    private static $publicProperties89d89 = [
        
    ];
    public function getList() : \PrestaShop\PrestaShop\Core\Module\ModuleCollection
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'getList', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->getList();
    }
    public function getInstalledModules() : \PrestaShop\PrestaShop\Core\Module\ModuleCollection
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'getInstalledModules', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->getInstalledModules();
    }
    public function getMustBeConfiguredModules() : \PrestaShop\PrestaShop\Core\Module\ModuleCollection
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'getMustBeConfiguredModules', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->getMustBeConfiguredModules();
    }
    public function getUpgradableModules() : \PrestaShop\PrestaShop\Core\Module\ModuleCollection
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'getUpgradableModules', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->getUpgradableModules();
    }
    public function getModule(string $moduleName) : \PrestaShop\PrestaShop\Core\Module\ModuleInterface
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'getModule', array('moduleName' => $moduleName), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->getModule($moduleName);
    }
    public function getModulePath(string $moduleName) : ?string
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'getModulePath', array('moduleName' => $moduleName), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->getModulePath($moduleName);
    }
    public function setActionUrls(\PrestaShop\PrestaShop\Core\Module\ModuleCollection $collection) : \PrestaShop\PrestaShop\Core\Module\ModuleCollection
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'setActionUrls', array('collection' => $collection), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->setActionUrls($collection);
    }
    public function clearCache(?string $moduleName = null, bool $allShops = false) : bool
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'clearCache', array('moduleName' => $moduleName, 'allShops' => $allShops), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->clearCache($moduleName, $allShops);
    }
    public static function staticProxyConstructor($initializer)
    {
        static $reflection;
        $reflection = $reflection ?? new \ReflectionClass(__CLASS__);
        $instance   = $reflection->newInstanceWithoutConstructor();
        \Closure::bind(function (\PrestaShop\PrestaShop\Core\Module\ModuleRepository $instance) {
            unset($instance->moduleDataProvider, $instance->adminModuleDataProvider, $instance->hookManager, $instance->cacheProvider, $instance->modulePath, $instance->installedModules, $instance->modulesFromHook, $instance->contextLangId);
        }, $instance, 'PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository')->__invoke($instance);
        $instance->initializer8d6cb = $initializer;
        return $instance;
    }
    public function __construct(\PrestaShop\PrestaShop\Adapter\Module\ModuleDataProvider $moduleDataProvider, \PrestaShop\PrestaShop\Adapter\Module\AdminModuleDataProvider $adminModuleDataProvider, \Doctrine\Common\Cache\CacheProvider $cacheProvider, \PrestaShop\PrestaShop\Adapter\HookManager $hookManager, string $modulePath, int $contextLangId)
    {
        static $reflection;
        if (! $this->valueHolder5ac87) {
            $reflection = $reflection ?? new \ReflectionClass('PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository');
            $this->valueHolder5ac87 = $reflection->newInstanceWithoutConstructor();
        \Closure::bind(function (\PrestaShop\PrestaShop\Core\Module\ModuleRepository $instance) {
            unset($instance->moduleDataProvider, $instance->adminModuleDataProvider, $instance->hookManager, $instance->cacheProvider, $instance->modulePath, $instance->installedModules, $instance->modulesFromHook, $instance->contextLangId);
        }, $this, 'PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository')->__invoke($this);
        }
        $this->valueHolder5ac87->__construct($moduleDataProvider, $adminModuleDataProvider, $cacheProvider, $hookManager, $modulePath, $contextLangId);
    }
    public function & __get($name)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, '__get', ['name' => $name], $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        if (isset(self::$publicProperties89d89[$name])) {
            return $this->valueHolder5ac87->$name;
        }
        $realInstanceReflection = new \ReflectionClass('PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository');
        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolder5ac87;
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
        $targetObject = $this->valueHolder5ac87;
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
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, '__set', array('name' => $name, 'value' => $value), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        $realInstanceReflection = new \ReflectionClass('PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository');
        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolder5ac87;
            $targetObject->$name = $value;
            return $targetObject->$name;
        }
        $targetObject = $this->valueHolder5ac87;
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
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, '__isset', array('name' => $name), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        $realInstanceReflection = new \ReflectionClass('PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository');
        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolder5ac87;
            return isset($targetObject->$name);
        }
        $targetObject = $this->valueHolder5ac87;
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
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, '__unset', array('name' => $name), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        $realInstanceReflection = new \ReflectionClass('PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository');
        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolder5ac87;
            unset($targetObject->$name);
            return;
        }
        $targetObject = $this->valueHolder5ac87;
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
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, '__clone', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        $this->valueHolder5ac87 = clone $this->valueHolder5ac87;
    }
    public function __sleep()
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, '__sleep', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return array('valueHolder5ac87');
    }
    public function __wakeup()
    {
        \Closure::bind(function (\PrestaShop\PrestaShop\Core\Module\ModuleRepository $instance) {
            unset($instance->moduleDataProvider, $instance->adminModuleDataProvider, $instance->hookManager, $instance->cacheProvider, $instance->modulePath, $instance->installedModules, $instance->modulesFromHook, $instance->contextLangId);
        }, $this, 'PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository')->__invoke($this);
    }
    public function setProxyInitializer(\Closure $initializer = null) : void
    {
        $this->initializer8d6cb = $initializer;
    }
    public function getProxyInitializer() : ?\Closure
    {
        return $this->initializer8d6cb;
    }
    public function initializeProxy() : bool
    {
        return $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'initializeProxy', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
    }
    public function isProxyInitialized() : bool
    {
        return null !== $this->valueHolder5ac87;
    }
    public function getWrappedValueHolderValue()
    {
        return $this->valueHolder5ac87;
    }
}
