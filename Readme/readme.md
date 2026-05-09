# Architecture et Fonctionnement de PrestaShop 8.2.6

Ce projet est basé sur **PrestaShop 8.2.6**, une solution e-commerce open-source très populaire. Ce document explique en détail le fonctionnement global de la plateforme ainsi que la structure et le rôle des principales tables de sa base de données.

## 1. Architecture Globale

PrestaShop utilise une architecture hybride, combinant son propre framework "Legacy" (historique) et le framework **Symfony**. Depuis les versions 1.7 et 8.x, une migration progressive vers Symfony est en cours, principalement pour le Back-Office (panneau d'administration).

### 1.1 Le Modèle MVC (Modèle-Vue-Contrôleur)
* **Modèle (Classes)** : Situées dans les dossiers `classes/` et `src/`, ces entités gèrent l'accès et la manipulation des données (ex: `Product.php`, `Customer.php`). Elles font le lien avec la base de données. L'ORM maison s'appelle `ObjectModel`, et pour les nouvelles parties Symfony, Doctrine est également utilisé.
* **Vue (Templates)** : Situées dans `themes/` (pour le Front-Office en utilisant le moteur **Smarty**) et dans `src/PrestaShopBundle/Resources/views/` (pour le Back-Office avec le moteur **Twig**).
* **Contrôleur** : Situés dans `controllers/` (Legacy) et dans `src/PrestaShopBundle/Controller/` (Symfony). Ils reçoivent les requêtes des utilisateurs, interrogent les Modèles et renvoient les Vues.

### 1.2 Structure des Dossiers Principaux
* **`/app`** et **`/src`** : Contiennent le code basé sur Symfony (configuration, contrôleurs, services) utilisé pour le nouveau Back-Office.
* **`/classes`** : Contient le code Legacy des modèles de données (ex. classe `Product`).
* **`/controllers`** : Les contrôleurs Legacy pour le Front-Office (ex: `ProductController.php`) et certaines parties du Back-Office non migrées.
* **`/modules`** : Les plugins/extensions qui ajoutent des fonctionnalités au cœur (ex: méthodes de paiement, transporteurs, blocs d'affichage). Ils utilisent le système de *Hooks* pour s'accrocher à différents endroits du site.
* **`/themes`** : Contient les thèmes visuels du site (le thème par défaut s'appelle `classic`).
* **`/var`** : Les fichiers générés, comme le cache et les logs (gérés par Symfony). **Attention** : il est très fréquent de devoir vider le dossier `var/cache/` lors du développement.
* **`/config`** : Les fichiers de configuration de la plateforme (variables globales, alias, etc.). Les accès base de données se trouvent spécifiquement dans `app/config/parameters.php`.
* **`/override`** : Permet de surcharger les classes et les contrôleurs natifs sans modifier le cœur (core) du système, ce qui facilite les mises à jour.

### 1.3 Gestion Multi-boutique et Multilingue
PrestaShop est nativement conçu pour gérer plusieurs boutiques ("multiboutique") et plusieurs langues. Cela se traduit en base de données par l'ajout des suffixes `_shop` (liaison boutique) et `_lang` (traduction) aux tables principales.

---

## 2. Fonctionnement des Principales Tables de la Base de Données

Le préfixe des tables de ce projet est configuré sur **`ps_`** (comme défini dans `app/config/parameters.php`). Voici comment les données y sont structurées :

### 2.1 Les Produits
La gestion des produits est répartie sur plusieurs tables en raison du multilinguisme et du mode multi-boutique :
* **`ps_product`** : Contient les données intrinsèques du produit, indépendantes de la langue ou de la boutique (ex: `id_product`, `reference`, `price`, `weight`, `active`).
* **`ps_product_lang`** : Contient toutes les données textuelles traduites (ex: `name`, `description`, `link_rewrite`). Elle est liée par la clé composée `(id_product, id_lang)`.
* **`ps_product_shop`** : Gère l'activation, la TVA et le prix spécifique du produit par boutique (très utile en mode multi-boutique).
* **`ps_category_product`** : Table de liaison (Many-to-Many) indiquant à quelles catégories le produit appartient et définissant sa catégorie par défaut.

### 2.2 Les Catégories
* **`ps_category`** : Gère l'arborescence structurelle des catégories (relation parent-enfant avec `id_parent` et gestion de la profondeur `level_depth`).
* **`ps_category_lang`** : Contient les noms, descriptions et balises SEO (titres, méta-descriptions) de la catégorie dans chaque langue.

### 2.3 Les Clients
* **`ps_customer`** : Stocke les informations de base des utilisateurs inscrits (ex: `firstname`, `lastname`, `email`, `passwd` haché, date de création `date_add`, statut `active`).
* **`ps_address`** : Stocke les adresses postales liées aux clients ou aux fabricants (`id_customer`, `address1`, `city`, `id_country`, `id_state`). Un client peut en avoir plusieurs (facturation, livraison).

### 2.4 Les Paniers et Commandes
Le cycle d'achat est scindé en deux grandes étapes pour assurer la persistance et la fiabilité de l'historique : le Panier (avant validation) et la Commande (après paiement).
* **`ps_cart`** : L'entité panier. Dès qu'un visiteur (même non connecté) ajoute un produit, un panier est créé.
* **`ps_cart_product`** : Lie le panier aux produits choisis et stocke la quantité (`id_cart`, `id_product`, `id_product_attribute` (déclinaisons), `quantity`).
* **`ps_orders`** : Une fois le panier validé et le paiement confirmé, une commande est générée. On y trouve le montant total (`total_paid`), le client (`id_customer`), la référence alphanumérique de la commande, et l'identifiant du panier source (`id_cart`).
* **`ps_order_detail`** : C'est une "photographie" des produits au moment précis de l'achat. Elle stocke le nom du produit, le prix unitaire payé et les taxes de l'instant T. Ainsi, si le prix d'un produit change plus tard dans le catalogue, l'historique de commande reste intact (le client a bien payé le prix d'avant).
* **`ps_order_history`** : Historique des statuts de la commande (ex: En attente de paiement, Paiement accepté, Expédié, Livré).

### 2.5 La Configuration Globale
* **`ps_configuration`** : C'est le "registre" principal de PrestaShop. C'est une table de type clé-valeur (`name` => `value`) qui stocke tous les paramètres de la boutique configurés depuis le Back-Office (ex: nom de la boutique, réglages SEO, clés API de modules).

## Conclusion

Développer sur PrestaShop demande de bien respecter la séparation entre le "Core" (qu'il ne faut **jamais** modifier directement pour pouvoir mettre à jour la plateforme sereinement) et les éléments personnalisés. Toute modification doit passer par :
1. **Les Modules** : Pour ajouter de nouvelles fonctionnalités et s'accrocher aux Hooks.
2. **Les Thèmes** : Pour tout ce qui touche à l'interface visuelle.
3. **Les Overrides** : Pour surcharger/modifier un comportement natif d'une classe (`/classes`) ou d'un contrôleur (`/controllers`).

La base de données, quant à elle, est hautement normalisée. Chaque entité de type "contenu" possède presque systématiquement sa déclinaison `_lang` et `_shop` pour assurer une scalabilité internationale (multilingue) et multi-entreprises (multi-boutiques).
