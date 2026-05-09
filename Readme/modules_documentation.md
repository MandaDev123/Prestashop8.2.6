# Documentation Complète du Fonctionnement et des Modules de PrestaShop

Ce document fait suite à l'analyse de l'architecture (`readme.md`) et détaille en profondeur le "cycle de vie" du projet, la mécanique d'intégration, ainsi qu'une analyse exhaustive des 80 modules installés sur cette instance PrestaShop.

---

## 1. Cycle de Vie d'une Requête et Mécanique des Modules

PrestaShop repose sur un système événementiel très puissant appelé **Les Hooks** (points d'accroche). C'est ce système qui permet aux modules de fonctionner de manière totalement décentralisée sans toucher au cœur du code (le *Core*).

### 1.1 Le Fonctionnement des "Hooks"
Un "Hook" est une zone d'affichage (ex: `displayHome`, `displayHeader`, `displayLeftColumn`) ou un point d'action (ex: `actionValidateOrder`, `actionProductAdd`). 
Lorsqu'un visiteur charge une page :
1. Le **FrontController** prépare la page.
2. Le moteur de template (Smarty) rencontre un appel de hook, par exemple : `{hook h='displayHome'}`.
3. PrestaShop interroge la table `ps_hook_module` pour savoir quels modules sont greffés sur ce hook.
4. Le système exécute la méthode `hookDisplayHome()` de chaque module greffé, et concatène leur rendu HTML.

### 1.2 Pipeline de Fonctionnement
* **Initialisation** : Chargement de `config/config.inc.php`, connexion à la BDD, chargement des classes.
* **Le Dispatcher** : Identifie le contrôleur à appeler selon l'URL (ex: `ProductController` si on est sur la page d'un produit).
* **Exécution du Contrôleur** : Récupération des données du modèle (ex: les infos du produit `id=5`).
* **Appel des Modules** : Déclenchement de tous les hooks pertinents pour enrichir la page (ex: ajouter le bouton "Partager", afficher les "Produits de la même catégorie").
* **Rendu Final** : Le template HTML est généré et envoyé au navigateur.

---

## 2. Analyse Détaillée des Modules Intégrés

Votre projet contient 80 modules. Pour comprendre leur fonctionnement de manière intelligible, ils sont classés par grandes familles fonctionnelles.

### Famille A : Interface Utilisateur (Front-Office)
Ces modules sont responsables de ce que le client final voit sur le site. Ils s'accrochent généralement sur les hooks d'affichage (`displayHeader`, `displayTop`, `displayHome`, `displayFooter`).

* **`ps_mainmenu`** : Le menu de navigation principal (en haut de page). Il gère une arborescence (catégories, pages CMS, liens personnalisés).
* **`ps_searchbar`** : La barre de recherche. Elle interroge de manière asynchrone (AJAX) le contrôleur de recherche de PrestaShop.
* **`ps_imageslider`** : Le carrousel d'images sur la page d'accueil (greffé sur `displayHome`).
* **`ps_banner`** & **`ps_customtext`** : Permettent d'ajouter des bannières promotionnelles et du texte riche sans coder.
* **`ps_shoppingcart`** : Le bloc panier (souvent en haut à droite). Il utilise AJAX pour se mettre à jour sans recharger la page entière lorsqu'un produit est ajouté (grâce à l'API `core.js` de PrestaShop).
* **`ps_linklist`** : Gère les listes de liens, principalement utilisées dans le Footer (A propos, Mentions légales, etc.).
* **`ps_languageselector`** & **`ps_currencyselector`** : Permettent au visiteur de changer la langue et la devise. Ils stockent le choix en cookie et modifient le contexte utilisateur.

### Famille B : Navigation et Parcours Client
Ces modules facilitent la découverte des produits dans le catalogue.

* **`ps_facetedsearch` (Navigation à facettes)** : **Module Critique**. C'est le système de filtres (par prix, couleur, marque, taille) présent dans les catégories. Il génère ses propres tables d'indexation (ex: `ps_layered_filter`) pour être extrêmement rapide, même avec des milliers de produits. Un script CRON (tâche planifiée) doit souvent être configuré pour réindexer ce module lors de l'ajout de nouveaux produits.
* **`ps_categorytree`** : Affiche l'arbre des catégories, souvent dans la colonne de gauche.
* **`ps_brandlist`** & **`ps_supplierlist`** : Affichent les marques (Fabricants) et Fournisseurs.

### Famille C : Merchandising et Ventes Croisées
Conçus pour augmenter le panier moyen (Upsell / Cross-sell).

* **`ps_featuredproducts`** : Les produits "Coup de cœur" ou mis en avant sur la page d'accueil.
* **`ps_newproducts`** : Affiche un bloc des derniers produits ajoutés à la boutique.
* **`ps_bestsellers`** : Calcule et affiche les meilleures ventes en se basant sur l'historique des commandes.
* **`ps_crossselling`** : Affiche "Les clients qui ont acheté ce produit ont également acheté...". Il analyse la table `ps_order_detail` pour trouver des corrélations.
* **`ps_viewedproduct`** : Bloc "Produits déjà vus" (stocké via les cookies du visiteur).
* **`ps_categoryproducts`** : Affiche les "Produits de la même catégorie" sur la page d'un article.

### Famille D : Tunnel de Commande et Paiements (Checkout)
Ces modules interviennent à la fin du parcours client.

* **`ps_wirepayment` (Virement bancaire)** : Module natif. Si choisi, il met la commande en statut "En attente de paiement par virement" et affiche le RIB du marchand.
* **`ps_checkpayment` (Chèque)** : Similaire au virement, met la commande en attente de la réception du chèque.
* **`ps_cashondelivery` (Paiement à la livraison)** : Permet au client de payer au moment où le transporteur lui remet le colis.
* **`ps_checkout`** : Module très complet développé avec PayPal. Il unifie le paiement par Carte Bancaire, PayPal, et des méthodes locales au sein d'une interface fluide.

### Famille E : Statistiques et Tableaux de Bord (Back-Office)
Une immense partie de vos modules (`stats...` et `dash...`) sert à remplir les graphiques du panneau d'administration. Ils s'accrochent sur le hook `displayAdminStats` ou sur les zones du Dashboard.

* **Les modules `dash...` (`dashactivity`, `dashgoals`, `dashproducts`, `dashtrends`)** : Gèrent le tableau de bord principal à la connexion de l'administrateur (Trafic en temps réel, Objectifs de chiffre d'affaires, Tendances).
* **Les modules `stats...`** : Chacun est responsable d'un rapport très précis.
  - `statssales` : Évolution des ventes.
  - `statsproduct` : Performance de chaque produit (vues vs achats).
  - `statsbestcustomers` : Identifie les clients VIP.
  - `statsstock` : Rapports sur l'inventaire.
* **`graphnvd3`** & **`gridhtml`** : Ce sont des "modules techniques" qui ne font rien côté client, mais qui fournissent les librairies Javascript (NVD3/D3.js) pour dessiner les graphiques du Back-Office.

### Famille F : Marketing, Externe et Réseaux Sociaux
Pour l'acquisition et la fidélisation.

* **`ps_emailsubscription`** : Le bloc Newsletter. Il enregistre les emails soit dans la table `ps_emailsubscription`, soit synchronise avec le compte client.
* **`klaviyopsautomation`** : Intégration de l'outil Klaviyo (marketing automatisé par email/SMS).
* **`ps_facebook`** : Connecte le catalogue produit au Business Manager de Facebook/Instagram (pour créer des boutiques Facebook ou faire du reciblage publicitaire).
* **`ps_googleanalytics`** : Injecte le tag de suivi Google (GA4) sur toutes les pages pour tracker les visites, les paniers abandonnés et les conversions e-commerce.
* **`psxmarketingwithgoogle`** : Permet de synchroniser les produits avec Google Merchant Center (pour apparaître dans Google Shopping).

### Famille G : Services PrestaShop et Juridique
* **`ps_mbo` (PrestaShop MarketPlace in Back Office)** : Ce module intègre la boutique Addons de PrestaShop directement dans votre panneau d'administration, vous permettant d'acheter/installer d'autres modules sans quitter votre site.
* **`ps_accounts`** & **`ps_eventbus`** : Modules techniques servant à relier votre boutique à l'écosystème cloud de PrestaShop (nécessaire pour des modules comme PrestaShop Checkout ou Facebook).
* **`psgdpr` (RGPD)** : Très important. Il gère la conformité légale (consentements, effacement des données personnelles sur demande d'un client, export de données).
* **`blockreassurance`** : Affiche les "garanties" (ex: "Paiement 100% sécurisé", "Livraison 48h") généralement sous le bouton d'ajout au panier.

---

## 3. Détail Technique d'un Module (Exemple : `ps_emailalerts`)
Pour comprendre comment le code fonctionne à l'intérieur d'un de ces dossiers (ex: `modules/ps_emailalerts/`) :
1. **Fichier principal (`ps_emailalerts.php`)** : Contient la classe du module. Lors de l'installation, il enregistre ses "hooks", par exemple `actionValidateOrder` (déclenché quand une commande est payée) et `actionUpdateQuantity` (quand un stock baisse).
2. **La logique** : Si le hook `actionValidateOrder` est appelé, la fonction `hookActionValidateOrder()` va récupérer les infos de la commande, générer un template d'email (dossier `mails/`), et utiliser `Mail::Send()` pour notifier le gérant de la boutique d'une nouvelle commande.
3. **Le front-office** : Il se greffe aussi sur `displayProductAdditionalInfo` pour afficher au client un champ "Prévenez-moi lorsque le produit sera disponible" (si le produit est en rupture de stock).

## Conclusion
La robustesse de ce projet provient de son extrême modularité. Le "Cœur" (Core) gère uniquement la sécurité, la base de données, le routage et le panier basique. Tout le reste, de la navigation à facettes jusqu'aux paiements en passant par les simples blocs de texte, est déporté dans ce dossier `/modules`. Cela garantit qu'en cas de mise à jour critique de PrestaShop, les fonctionnalités propres à la boutique ne se "cassent" pas, à condition de maintenir les modules à jour.
