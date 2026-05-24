# Fonctionnalités Front-Office Client — 50min à 1h30

> Basé sur l'analyse des pages existantes : `HomePage`, `ProductPage`, `CartPage`, `CheckoutPage`, `MyOrdersPage`

---

## 🏠 HomePage — Catalogue produits

| # | Fonctionnalité | Durée | Ce qui existe déjà | Ce qu'il faut ajouter |
|---|---|---|---|---|
| 1 | **Tri des produits** (prix ↑↓, nom A→Z, nouveauté) | 50min | Filtre par nom/cat/prix | Select "Trier par" + `.sort()` sur `filtered` |
| 2 | **Vue liste / vue grille** (toggle) | 45min | Grille fixe | Bouton toggle + 2 classes CSS |
| 3 | **Afficher le stock sur la carte produit** | 40min | Stock visible seulement dans ProductPage | Fetch `stock_availables` + badge "En stock / Rupture" |
| 4 | **Bouton Favoris ❤️** (localStorage) | 1h | Rien | Cœur sur chaque carte + page ou filtre "Mes favoris" |
| 5 | **"Produits en promotion" en haut** | 50min | Badge discount sur carte | Section dédiée au-dessus avec produits ayant `specific_prices` |
| 6 | **Nombre de résultats affiché** | 20min | Rien | `"{n} produit(s) trouvé(s)"` sous la barre de recherche |
| 7 | **Réinitialiser les filtres** (bouton) | 25min | Pas de reset | Bouton "Effacer" qui remet tous les états à vide |
| 8 | **Afficher la référence sous le nom** | 20min | Nom + prix seulement | `<p style={{fontSize:11}}>Réf: {p.reference}</p>` |

---

## 📦 ProductPage — Fiche produit

| # | Fonctionnalité | Durée | Ce qui existe déjà | Ce qu'il faut ajouter |
|---|---|---|---|---|
| 9 | **Galerie multi-images** (miniatures cliquables) | 1h | Une seule image (`imgs[0]`) | Afficher toutes les images en miniatures + image principale cliquable |
| 10 | **Sélecteur de quantité** avant "Ajouter au panier" | 45min | Quantité = 1 fixe | Input `+/-` entre 1 et `availableQuantity` + passer qty à `addItem` |
| 11 | **Options en boutons visuels** au lieu d'un `<select>` | 1h | `<select>` pour chaque option | Boutons cliquables stylisés avec état actif |
| 12 | **"Produits similaires"** (même catégorie) | 1h15 | Rien | Fetch produits même `id_category_default` + mini-grille en bas |
| 13 | **Breadcrumb** (Boutique > Catégorie > Produit) | 40min | Pas de fil d'Ariane | Fetch catégorie du produit + afficher `Boutique > [cat] > [nom]` |
| 14 | **Partager le produit** (copier le lien) | 30min | Rien | Bouton `share` → `navigator.clipboard.writeText(window.location.href)` |

---

## 🛒 CartPage — Panier

| # | Fonctionnalité | Durée | Ce qui existe déjà | Ce qu'il faut ajouter |
|---|---|---|---|---|
| 15 | **Code promo** (réduction fixe sur total) | 1h15 | Rien | Champ texte + liste de codes hardcodés en `localStorage` → applique `%` ou montant fixe |
| 16 | **Sauvegarder le panier** (localStorage persist) | 50min | Panier perdu au refresh | Sauvegarder `items` dans `localStorage` + recharger au montage |
| 17 | **Bouton "Vider le panier"** | 20min | Bouton delete par article | Bouton global `clearCart()` avec confirmation |
| 18 | **Affichage du sous-total par article** avec déclinaison visible | 30min | Sous-total affiché | Ajouter le nom de la déclinaison choisie (`item.combinationLabel`) |
| 19 | **Récapitulatif latéral fixe** sur grand écran | 1h | Total en bas | Sidebar sticky avec total + bouton checkout visible en permanence |

---

## ✅ CheckoutPage — Commande

| # | Fonctionnalité | Durée | Ce qui existe déjà | Ce qu'il faut ajouter |
|---|---|---|---|---|
| 20 | **Mémoriser l'adresse** (localStorage) | 45min | Formulaire vide à chaque fois | Pré-remplir depuis `localStorage` + case "Mémoriser mon adresse" |
| 21 | **Récapitulatif des articles** dans la page checkout | 50min | Seulement le total | Lister les articles du panier avec image, nom, qty, prix |
| 22 | **Validation email en temps réel** | 30min | Validation HTML5 basique | Regex email + message d'erreur inline rouge/vert |
| 23 | **Page de confirmation enrichie** (détail commande) | 45min | Juste `Commande #X confirmée` | Afficher les articles commandés + total + adresse de livraison |

---

## 📋 MyOrdersPage — Mes commandes

| # | Fonctionnalité | Durée | Ce qui existe déjà | Ce qu'il faut ajouter |
|---|---|---|---|---|
| 24 | **Détail des articles d'une commande** (dépliable) | 1h15 | Seulement ID, date, total, état | Fetch `order_details` par commande + afficher en accordéon |
| 25 | **Filtrer par état** (livré, annulé, en cours…) | 50min | Toutes les commandes sans filtre | Boutons filtres par `current_state` + `.filter()` sur `orders` |
| 26 | **Ré-commander** (ajouter articles au panier actuel) | 1h | Duplication (crée une nouvelle commande API) | Bouton "Ré-ajouter au panier" → `addItem()` pour chaque article |
| 27 | **Trier par date** (+ récent / + ancien) | 30min | Ordre API (non garanti) | `.sort()` sur `date_add` + bouton toggle |

---

## 🌐 Navigation générale (front)

| # | Fonctionnalité | Durée | Ce qui existe déjà | Ce qu'il faut ajouter |
|---|---|---|---|---|
| 28 | **Nom du client affiché** dans le header | 20min | Icônes seulement | `Bonjour, {customer.firstname}` dans `front-header` |
| 29 | **Footer fixe** avec liens (Boutique, Panier, Commandes) | 45min | Pas de footer | Barre de navigation en bas façon app mobile |
| 30 | **Animation de chargement** par skeleton loader | 40min | Skeleton sur HomePage uniquement | Ajouter les skeletons sur ProductPage et MyOrdersPage aussi |

---

> **Priorités suggérées** selon impact visuel et pédagogique :
> 1. 🥇 **Galerie multi-images** (#9) — très visible
> 2. 🥇 **Sélecteur de quantité** (#10) — manque actuellement
> 3. 🥈 **Tri des produits** (#1) — utile au quotidien
> 4. 🥈 **Sauvegarder le panier** (#16) — confort utilisateur
> 5. 🥈 **Détail commande dépliable** (#24) — pédagogiquement riche
