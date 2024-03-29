# budgetManager.js

**Class BudgetManager** 

Cette classe est responsable de la gestion des transactions financières.

Le **constructor** initialise la propriété transactions comme un tableau vide lorsqu'une nouvelle instance de BudgetManager est créée.

### addTransaction

Permet d'ajouter une nouvelle transaction à la liste transactions.
Vérifie si la transaction a un montant et une date définis.

### removeTransaction

Permet de supprimer une transaction de la liste transactions en utilisant son index.
Vérifie d'abord si l'index est valide, sinon, erreur.

***Méthodes pour les calculs financiers***

### calculateBalance

Calcule le solde total en additionnant tous les montants des transactions.

### calculateTotalIncomeByCategory

Calcule le total des revenus pour une catégorie spécifique.

### calculateTotalExpensesByCategory

Calcule le total des dépenses pour une catégorie spécifique.

### getMonthlySummary 

Génère un résumé mensuel des revenus et des dépenses pour un mois et une année spécifiques.

### calculateTotalBalance 

Calcule le solde total de toutes les transactions.

***Méthodes pour filtrer les transactions***

### getTransactionsForMonth

Récupère toutes les transactions pour un mois et une année donnés.

### getTransactionsForCategory

Récupère toutes les transactions pour une catégorie spécifique.

### getTransactionsForDate

Récupère toutes les transactions dans une plage de dates spécifiée.

### getTransactionsByKeyWord

Récupère toutes les transactions contenant un mot-clé spécifique dans leur description.


# Fichier userManager.js

**Class UserManager**

Cette classe gère les utilisateurs de l'application et leurs données financières.

Le **constructor** initialise les propriétés user à null et budgetManager avec une instance de **BudgetManager** fournie en argument.

***Méthodes pour la gestion des utilisateurs***

### authenticateUser 

Authentifie l'utilisateur en comparant le mot de passe fourni avec celui enregistré pour l'utilisateur.

### updateUserProfile 

Met à jour les informations du profil de l'utilisateur avec un nouveau nom, email et mot de passe.

***Méthodes pour la gestion des données financières***

### exportFinancialData

Permet d'exporter les données financières de l'utilisateur.

### importFinancialData

Permet d'importer des données financières dans l'application.

***Méthodes pour la gestion des objectifs financiers***

### setNotificationThreshold

Définit le seuil de notification pour les dépenses excessives.

### notifyExcessiveSpendingThisMonth

Notifie l'utilisateur s'il dépasse le seuil de notification pour les dépenses ce mois-ci.

### setMonthlyFinancialGoal

Définit un objectif financier mensuel pour l'utilisateur.


# tests budgetManager.test.js & userManager.test.js


Ces fichiers contiennent des tests unitaires pour vérifier le bon fonctionnement des méthodes définies dans les classes **BudgetManager** et **UserManager**.
Chaque test vérifie un comportement spécifique de la méthode correspondante, en utilisant Jest, un framework de test JavaScript.
Cela résume l'architecture et le fonctionnement de notre application de gestion de budget, ainsi que les tests associés pour garantir son bon fonctionnement.