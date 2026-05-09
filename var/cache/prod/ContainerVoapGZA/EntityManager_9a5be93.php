<?php

class EntityManager_9a5be93 extends \Doctrine\ORM\EntityManager implements \ProxyManager\Proxy\VirtualProxyInterface
{
    private $valueHolderc63a2 = null;
    private $initializere25be = null;
    private static $publicPropertiese580e = [
        
    ];
    public function getConnection()
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'getConnection', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->getConnection();
    }
    public function getMetadataFactory()
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'getMetadataFactory', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->getMetadataFactory();
    }
    public function getExpressionBuilder()
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'getExpressionBuilder', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->getExpressionBuilder();
    }
    public function beginTransaction()
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'beginTransaction', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->beginTransaction();
    }
    public function getCache()
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'getCache', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->getCache();
    }
    public function transactional($func)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'transactional', array('func' => $func), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->transactional($func);
    }
    public function wrapInTransaction(callable $func)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'wrapInTransaction', array('func' => $func), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->wrapInTransaction($func);
    }
    public function commit()
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'commit', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->commit();
    }
    public function rollback()
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'rollback', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->rollback();
    }
    public function getClassMetadata($className)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'getClassMetadata', array('className' => $className), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->getClassMetadata($className);
    }
    public function createQuery($dql = '')
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'createQuery', array('dql' => $dql), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->createQuery($dql);
    }
    public function createNamedQuery($name)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'createNamedQuery', array('name' => $name), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->createNamedQuery($name);
    }
    public function createNativeQuery($sql, \Doctrine\ORM\Query\ResultSetMapping $rsm)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'createNativeQuery', array('sql' => $sql, 'rsm' => $rsm), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->createNativeQuery($sql, $rsm);
    }
    public function createNamedNativeQuery($name)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'createNamedNativeQuery', array('name' => $name), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->createNamedNativeQuery($name);
    }
    public function createQueryBuilder()
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'createQueryBuilder', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->createQueryBuilder();
    }
    public function flush($entity = null)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'flush', array('entity' => $entity), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->flush($entity);
    }
    public function find($className, $id, $lockMode = null, $lockVersion = null)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'find', array('className' => $className, 'id' => $id, 'lockMode' => $lockMode, 'lockVersion' => $lockVersion), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->find($className, $id, $lockMode, $lockVersion);
    }
    public function getReference($entityName, $id)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'getReference', array('entityName' => $entityName, 'id' => $id), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->getReference($entityName, $id);
    }
    public function getPartialReference($entityName, $identifier)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'getPartialReference', array('entityName' => $entityName, 'identifier' => $identifier), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->getPartialReference($entityName, $identifier);
    }
    public function clear($entityName = null)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'clear', array('entityName' => $entityName), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->clear($entityName);
    }
    public function close()
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'close', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->close();
    }
    public function persist($entity)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'persist', array('entity' => $entity), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->persist($entity);
    }
    public function remove($entity)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'remove', array('entity' => $entity), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->remove($entity);
    }
    public function refresh($entity)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'refresh', array('entity' => $entity), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->refresh($entity);
    }
    public function detach($entity)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'detach', array('entity' => $entity), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->detach($entity);
    }
    public function merge($entity)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'merge', array('entity' => $entity), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->merge($entity);
    }
    public function copy($entity, $deep = false)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'copy', array('entity' => $entity, 'deep' => $deep), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->copy($entity, $deep);
    }
    public function lock($entity, $lockMode, $lockVersion = null)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'lock', array('entity' => $entity, 'lockMode' => $lockMode, 'lockVersion' => $lockVersion), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->lock($entity, $lockMode, $lockVersion);
    }
    public function getRepository($entityName)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'getRepository', array('entityName' => $entityName), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->getRepository($entityName);
    }
    public function contains($entity)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'contains', array('entity' => $entity), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->contains($entity);
    }
    public function getEventManager()
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'getEventManager', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->getEventManager();
    }
    public function getConfiguration()
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'getConfiguration', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->getConfiguration();
    }
    public function isOpen()
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'isOpen', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->isOpen();
    }
    public function getUnitOfWork()
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'getUnitOfWork', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->getUnitOfWork();
    }
    public function getHydrator($hydrationMode)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'getHydrator', array('hydrationMode' => $hydrationMode), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->getHydrator($hydrationMode);
    }
    public function newHydrator($hydrationMode)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'newHydrator', array('hydrationMode' => $hydrationMode), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->newHydrator($hydrationMode);
    }
    public function getProxyFactory()
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'getProxyFactory', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->getProxyFactory();
    }
    public function initializeObject($obj)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'initializeObject', array('obj' => $obj), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->initializeObject($obj);
    }
    public function getFilters()
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'getFilters', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->getFilters();
    }
    public function isFiltersStateClean()
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'isFiltersStateClean', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->isFiltersStateClean();
    }
    public function hasFilters()
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, 'hasFilters', array(), $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        return $this->valueHolderc63a2->hasFilters();
    }
    public static function staticProxyConstructor($initializer)
    {
        static $reflection;
        $reflection = $reflection ?? new \ReflectionClass(__CLASS__);
        $instance   = $reflection->newInstanceWithoutConstructor();
        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $instance, 'Doctrine\\ORM\\EntityManager')->__invoke($instance);
        $instance->initializere25be = $initializer;
        return $instance;
    }
    protected function __construct(\Doctrine\DBAL\Connection $conn, \Doctrine\ORM\Configuration $config, \Doctrine\Common\EventManager $eventManager)
    {
        static $reflection;
        if (! $this->valueHolderc63a2) {
            $reflection = $reflection ?? new \ReflectionClass('Doctrine\\ORM\\EntityManager');
            $this->valueHolderc63a2 = $reflection->newInstanceWithoutConstructor();
        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $this, 'Doctrine\\ORM\\EntityManager')->__invoke($this);
        }
        $this->valueHolderc63a2->__construct($conn, $config, $eventManager);
    }
    public function & __get($name)
    {
        $this->initializere25be && ($this->initializere25be->__invoke($valueHolderc63a2, $this, '__get', ['name' => $name], $this->initializere25be) || 1) && $this->valueHolderc63a2 = $valueHolderc63a2;
        if (isset(self::$publicPropertiese580e[$name])) {
            return $this->valueHolderc63a2->$name;
        }
        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');
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
        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');
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
        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');
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
        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');
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
        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $this, 'Doctrine\\ORM\\EntityManager')->__invoke($this);
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
