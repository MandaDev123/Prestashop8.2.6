# Étapes et Processus d'Implémentation (Front-Office & Back-Office)

Voici le détail des tâches et la logique à suivre pour implémenter chaque fonctionnalité, sans inclure de code.

---

## 🛒 1. FRONT-OFFICE : Boutique Client

### 🏠 HomePage (Catalogue)
**1. Tri des produits (Prix, Nom, Date)**
- *Processus* : Ajouter un état pour le critère de tri, puis appliquer une fonction de tri au tableau filtré avant le rendu.
- *Tâches* : 
  1. Créer un état `sortOption` (défaut : 'pertinence').
  2. Ajouter un `<select>` dans la barre de filtres avec les options de tri.
  3. Créer une fonction de tri qui compare les produits selon l'option choisie (prix via `getPrices()`, nom via `getName()`).
  4. Appliquer cette fonction au tableau `filtered`.

**2. Vue Liste / Vue Grille**
- *Processus* : Utiliser un état pour basculer une classe CSS sur le conteneur des produits.
- *Tâches* :
  1. Créer un état booléen `isListView`.
  2. Ajouter deux boutons icônes (grille/liste) pour modifier cet état.
  3. Conditionner la classe du conteneur parent (`product-grid` vs `product-list`).
  4. Créer les règles CSS pour `.product-list` (disposition horizontale).

**3. Afficher le stock sur la carte produit**
- *Processus* : Récupérer les données de stock dès le chargement des produits et les lier aux cartes.
- *Tâches* :
  1. Dans le `useEffect`, ajouter un appel à `fetchStockAvailables` sans ID spécifique (ou filtré).
  2. Créer un mapping ou une recherche pour lier `id_product` à sa quantité.
  3. Dans la carte, ajouter une condition : si quantité > 0 afficher "En stock", sinon "Rupture".

**4. Bouton Favoris (localStorage)**
- *Processus* : Stocker un tableau d'ID de produits dans le navigateur de l'utilisateur.
- *Tâches* :
  1. Au chargement, lire le `localStorage` pour initialiser l'état `favorites`.
  2. Créer une fonction `toggleFavorite(id)` qui ajoute ou retire l'ID du tableau et met à jour le `localStorage`.
  3. Ajouter une icône cœur sur chaque carte (remplie si favori, vide sinon).
  4. Optionnel : ajouter un filtre "Voir mes favoris" dans la recherche.

**5. Produits en promotion en haut**
- *Processus* : Séparer les produits ayant une réduction des autres, et les afficher dans une section distincte.
- *Tâches* :
  1. Filtrer le tableau principal pour extraire ceux présents dans l'état `discounts`.
  2. Créer une nouvelle section visuelle (ex: "Offres du moment") avant la grille principale.
  3. Afficher les autres produits en dessous.

**6. Nombre de résultats affiché**
- *Processus* : Compter la longueur du tableau final filtré.
- *Tâches* : Afficher `filtered.length` dans une petite zone de texte sous les filtres de recherche.

**7. Réinitialiser les filtres**
- *Processus* : Remettre tous les états de recherche à leur valeur initiale.
- *Tâches* : Créer une fonction `clearFilters()` qui met à vide `searchName`, `searchCat`, `minPrice`, `maxPrice`. L'attacher à un bouton "Effacer".

### 📦 ProductPage (Fiche Produit)
**9. Galerie multi-images**
- *Processus* : Gérer un état de l'image actuellement sélectionnée et afficher toutes les images disponibles.
- *Tâches* :
  1. Créer un état `mainImage` initialisé avec la première image du produit.
  2. Parcourir le tableau `imgs` du produit pour générer des miniatures.
  3. Au clic sur une miniature, mettre à jour `mainImage`.

**10. Sélecteur de quantité**
- *Processus* : Permettre à l'utilisateur de choisir combien d'articles il veut ajouter au panier.
- *Tâches* :
  1. Créer un état `quantity` (défaut : 1).
  2. Ajouter une interface avec boutons `+` et `-` et un champ input (limité par `availableQuantity`).
  3. Modifier l'appel à `addItem()` pour lui passer la quantité choisie au lieu de 1.

**11. Options en boutons visuels**
- *Processus* : Remplacer les menus déroulants des déclinaisons par des boutons sélectionnables.
- *Tâches* :
  1. Supprimer le tag `<select>`.
  2. Boucler sur les valeurs d'options pour créer des `<button>`.
  3. Appliquer une classe CSS `active` si la valeur correspond à l'état `selections[optId]`.
  4. Mettre à jour l'état au clic.

**13. Breadcrumb (Fil d'Ariane)**
- *Processus* : Afficher le chemin de navigation de l'utilisateur.
- *Tâches* : 
  1. Trouver le nom de la catégorie par défaut du produit dans le tableau `categories` (s'il est passé en contexte ou re-fetché).
  2. Afficher les liens cliquables : Accueil > [Nom Catégorie] > [Nom Produit].

### 🛒 CartPage & CheckoutPage
**15. Code Promo**
- *Processus* : Appliquer une réduction fictive locale sur le total du panier.
- *Tâches* :
  1. Créer un état `promoCode` et `discountAmount`.
  2. Ajouter un champ texte et un bouton "Appliquer".
  3. Vérifier le code saisi contre une liste définie en dur. Si valide, définir `discountAmount`.
  4. Soustraire `discountAmount` du total final calculé.

**16. Sauvegarder le panier (Context)**
- *Processus* : Modifier `contexts.jsx` pour persister le panier.
- *Tâches* :
  1. Dans `useCart`, utiliser `useEffect` pour écrire `items` dans `localStorage` à chaque modification.
  2. Lors de l'initialisation du `useState` d'items, lire le `localStorage` pour récupérer l'ancien panier.

**20. Mémoriser l'adresse (Checkout)**
- *Processus* : Sauvegarder les champs du formulaire d'adresse.
- *Tâches* :
  1. Sauvegarder l'objet `form` dans `localStorage` quand la commande est validée, ou à chaque changement d'input.
  2. Au chargement du composant, initialiser l'état `form` avec les valeurs du `localStorage`.

**24. Détail des articles d'une commande (MyOrdersPage)**
- *Processus* : Effectuer un appel API supplémentaire pour récupérer les lignes (cart_rows) d'une commande passée.
- *Tâches* :
  1. Ajouter un état `expandedOrderId` pour savoir quelle commande est ouverte.
  2. Au clic sur "Détails", si les détails ne sont pas chargés, appeler l'endpoint API des détails de la commande.
  3. Afficher les articles en liste déroulante sous la carte de la commande.

**25. Filtrer par état (MyOrdersPage)**
- *Processus* : Créer des onglets pour séparer les commandes selon leur statut.
- *Tâches* :
  1. Créer un état `statusFilter` (défaut : "all").
  2. Générer des boutons pour chaque statut existant dans les commandes chargées.
  3. Filtrer le tableau `orders` avant l'affichage.

**26. Ré-commander (MyOrdersPage)**
- *Processus* : Transférer les produits d'une ancienne commande dans le panier actuel.
- *Tâches* :
  1. Mettre en place un bouton "Ré-commander".
  2. Au clic, parcourir les lignes de la commande et appeler `addItem()` du contexte `useCart` pour chaque ligne.
  3. Rediriger l'utilisateur vers la page Panier.

---

## ⚙️ 2. BACK-OFFICE : Admin & Import

### 🗂️ Import CSV (`customImport.js` & `ImportPage.jsx`)
**1. Aperçu des données avant import**
- *Processus* : Bloquer l'exécution automatique et afficher un résumé des CSV parsés.
- *Tâches* :
  1. Dans `ImportPage`, après le chargement des fichiers, extraire la longueur des tableaux de lignes.
  2. Afficher un bloc "Résumé : X produits, Y déclinaisons, Z commandes".
  3. Remplacer le lancement direct par un bouton "Confirmer l'import".

**3. & 4. Checkboxes Ignorer Commandes/Déclinaisons**
- *Processus* : Ajouter des options modifiant le comportement du script d'import.
- *Tâches* :
  1. Ajouter des cases à cocher liées à des états booléens (ex: `skipOrders`).
  2. Passer ces paramètres à `executeCustomImport`.
  3. Dans la fonction, englober les blocs 2 (Déclinaisons) et 4 (Commandes) d'une condition `if (!skipOrders)`.

**6. Mode Simulation (Dry-Run)**
- *Processus* : Exécuter la logique d'import mais intercepter tous les appels de création API.
- *Tâches* :
  1. Ajouter un paramètre `isDryRun`.
  2. Dans `executeCustomImport`, remplacer chaque appel `createEntity` par une fausse réponse de succès simulée.
  3. Pousser des logs normaux pour montrer ce qui se serait passé.

**12. Export des logs en .txt**
- *Processus* : Générer un fichier texte téléchargeable contenant les logs du tableau.
- *Tâches* :
  1. Créer un bouton "Télécharger les logs".
  2. Au clic, concaténer tous les éléments du tableau `logs` en une seule chaîne avec des sauts de ligne.
  3. Créer un `Blob` avec cette chaîne, puis un élément `<a>` temporaire avec un attribut `href` et `download` pour déclencher le téléchargement du navigateur.

**15. Annulation de l'import en cours**
- *Processus* : Stopper la boucle `for` principale.
- *Tâches* :
  1. Utiliser une référence (via `useRef`) ou un objet partagé pour suivre l'état d'annulation `isCancelled.current`.
  2. Ajouter un bouton "Annuler" qui passe cet état à `true`.
  3. Dans `executeCustomImport`, vérifier cet état au début de chaque itération de la boucle principale et faire un `break` ou `return` prématuré s'il est vrai.

### 🔧 Administration Commandes & Stock
**16. Recherche par référence dans le stock**
- *Processus* : Filtrer le tableau de stock affiché.
- *Tâches* :
  1. Ajouter un champ texte de recherche (état `searchRef`).
  2. Appliquer un `.filter()` sur le tableau des stocks en vérifiant si la chaîne `searchRef` est incluse dans le champ de référence.

**17. Tri des colonnes (Commandes)**
- *Processus* : Ordonner les lignes du tableau dynamiquement.
- *Tâches* :
  1. Créer des états `sortConfig` (clé et direction).
  2. Mettre à jour l'état au clic sur un en-tête de colonne de tableau `<th>`.
  3. Créer une fonction qui trie le tableau des commandes selon la clé choisie avant de faire le `map()`.

**20. Export CSV des commandes**
- *Processus* : Transformer un tableau JSON en fichier CSV et déclencher le téléchargement.
- *Tâches* :
  1. Mapper le tableau `orders` pour en extraire une liste de chaînes (par ex. `id;date;client;total;etat`).
  2. Joindre les lignes avec `\n`.
  3. Générer un `Blob` de type `text/csv` et utiliser un lien caché pour déclencher le téléchargement.

### 🔄 Page de Reset
**22. Reset sélectif par entité**
- *Processus* : Choisir quelles fonctions de nettoyage API appeler.
- *Tâches* :
  1. Ajouter des cases à cocher dans l'interface de Reset (Produits, Clients, Commandes, etc.).
  2. Modifier la boucle principale de Reset pour exécuter conditionnellement `deleteEntity` sur les ressources sélectionnées uniquement.

**23. Historique des resets**
- *Processus* : Garder une trace locale des actions destructives.
- *Tâches* :
  1. Après un succès de reset, créer un objet (date, ressources ciblées) et l'ajouter à un tableau dans le `localStorage`.
  2. Afficher ce tableau dans un petit historique sur la page Reset.
