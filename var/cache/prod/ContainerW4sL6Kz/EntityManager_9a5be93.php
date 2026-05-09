<?php

class EntityManager_9a5be93 extends \Doctrine\ORM\EntityManager implements \ProxyManager\Proxy\VirtualProxyInterface
{
    private $valueHolder5ac87 = null;
    private $initializer8d6cb = null;
    private static $publicProperties89d89 = [
        
    ];
    public function getConnection()
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'getConnection', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->getConnection();
    }
    public function getMetadataFactory()
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'getMetadataFactory', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->getMetadataFactory();
    }
    public function getExpressionBuilder()
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'getExpressionBuilder', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->getExpressionBuilder();
    }
    public function beginTransaction()
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'beginTransaction', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->beginTransaction();
    }
    public function getCache()
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'getCache', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->getCache();
    }
    public function transactional($func)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'transactional', array('func' => $func), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->transactional($func);
    }
    public function wrapInTransaction(callable $func)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'wrapInTransaction', array('func' => $func), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->wrapInTransaction($func);
    }
    public function commit()
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'commit', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->commit();
    }
    public function rollback()
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'rollback', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->rollback();
    }
    public function getClassMetadata($className)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'getClassMetadata', array('className' => $className), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->getClassMetadata($className);
    }
    public function createQuery($dql = '')
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'createQuery', array('dql' => $dql), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->createQuery($dql);
    }
    public function createNamedQuery($name)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'createNamedQuery', array('name' => $name), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->createNamedQuery($name);
    }
    public function createNativeQuery($sql, \Doctrine\ORM\Query\ResultSetMapping $rsm)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'createNativeQuery', array('sql' => $sql, 'rsm' => $rsm), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->createNativeQuery($sql, $rsm);
    }
    public function createNamedNativeQuery($name)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'createNamedNativeQuery', array('name' => $name), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->createNamedNativeQuery($name);
    }
    public function createQueryBuilder()
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'createQueryBuilder', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->createQueryBuilder();
    }
    public function flush($entity = null)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'flush', array('entity' => $entity), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->flush($entity);
    }
    public function find($className, $id, $lockMode = null, $lockVersion = null)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'find', array('className' => $className, 'id' => $id, 'lockMode' => $lockMode, 'lockVersion' => $lockVersion), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->find($className, $id, $lockMode, $lockVersion);
    }
    public function getReference($entityName, $id)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'getReference', array('entityName' => $entityName, 'id' => $id), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->getReference($entityName, $id);
    }
    public function getPartialReference($entityName, $identifier)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'getPartialReference', array('entityName' => $entityName, 'identifier' => $identifier), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->getPartialReference($entityName, $identifier);
    }
    public function clear($entityName = null)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'clear', array('entityName' => $entityName), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->clear($entityName);
    }
    public function close()
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'close', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->close();
    }
    public function persist($entity)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'persist', array('entity' => $entity), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->persist($entity);
    }
    public function remove($entity)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'remove', array('entity' => $entity), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->remove($entity);
    }
    public function refresh($entity)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'refresh', array('entity' => $entity), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->refresh($entity);
    }
    public function detach($entity)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'detach', array('entity' => $entity), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->detach($entity);
    }
    public function merge($entity)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'merge', array('entity' => $entity), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->merge($entity);
    }
    public function copy($entity, $deep = false)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'copy', array('entity' => $entity, 'deep' => $deep), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->copy($entity, $deep);
    }
    public function lock($entity, $lockMode, $lockVersion = null)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'lock', array('entity' => $entity, 'lockMode' => $lockMode, 'lockVersion' => $lockVersion), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->lock($entity, $lockMode, $lockVersion);
    }
    public function getRepository($entityName)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'getRepository', array('entityName' => $entityName), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->getRepository($entityName);
    }
    public function contains($entity)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'contains', array('entity' => $entity), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->contains($entity);
    }
    public function getEventManager()
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'getEventManager', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->getEventManager();
    }
    public function getConfiguration()
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'getConfiguration', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->getConfiguration();
    }
    public function isOpen()
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'isOpen', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->isOpen();
    }
    public function getUnitOfWork()
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'getUnitOfWork', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->getUnitOfWork();
    }
    public function getHydrator($hydrationMode)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'getHydrator', array('hydrationMode' => $hydrationMode), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->getHydrator($hydrationMode);
    }
    public function newHydrator($hydrationMode)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'newHydrator', array('hydrationMode' => $hydrationMode), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->newHydrator($hydrationMode);
    }
    public function getProxyFactory()
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'getProxyFactory', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->getProxyFactory();
    }
    public function initializeObject($obj)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'initializeObject', array('obj' => $obj), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->initializeObject($obj);
    }
    public function getFilters()
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'getFilters', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->getFilters();
    }
    public function isFiltersStateClean()
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'isFiltersStateClean', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->isFiltersStateClean();
    }
    public function hasFilters()
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, 'hasFilters', array(), $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        return $this->valueHolder5ac87->hasFilters();
    }
    public static function staticProxyConstructor($initializer)
    {
        static $reflection;
        $reflection = $reflection ?? new \ReflectionClass(__CLASS__);
        $instance   = $reflection->newInstanceWithoutConstructor();
        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $instance, 'Doctrine\\ORM\\EntityManager')->__invoke($instance);
        $instance->initializer8d6cb = $initializer;
        return $instance;
    }
    protected function __construct(\Doctrine\DBAL\Connection $conn, \Doctrine\ORM\Configuration $config, \Doctrine\Common\EventManager $eventManager)
    {
        static $reflection;
        if (! $this->valueHolder5ac87) {
            $reflection = $reflection ?? new \ReflectionClass('Doctrine\\ORM\\EntityManager');
            $this->valueHolder5ac87 = $reflection->newInstanceWithoutConstructor();
        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $this, 'Doctrine\\ORM\\EntityManager')->__invoke($this);
        }
        $this->valueHolder5ac87->__construct($conn, $config, $eventManager);
    }
    public function & __get($name)
    {
        $this->initializer8d6cb && ($this->initializer8d6cb->__invoke($valueHolder5ac87, $this, '__get', ['name' => $name], $this->initializer8d6cb) || 1) && $this->valueHolder5ac87 = $valueHolder5ac87;
        if (isset(self::$publicProperties89d89[$name])) {
            return $this->valueHolder5ac87->$name;
        }
        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');
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
        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');
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
        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');
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
        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');
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
        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $this, 'Doctrine\\ORM\\EntityManager')->__invoke($this);
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
