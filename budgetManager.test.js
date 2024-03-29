// budgetManager.test.js
const BudgetManager = require('./budgetManager');

test('ajoute un revenu', () => {
  const budgetManager = new BudgetManager();
  budgetManager.addTransaction({ date: '2024-03-29', amount: 100 }); // Ajoute un revenu de 100
  expect(budgetManager.transactions.length).toBe(1);
  expect(budgetManager.calculateBalance()).toBe(100);
});

test('ajoute un revenu sans date', () => {
  const budgetManager = new BudgetManager();
  expect(() => budgetManager.addTransaction({ amount: 100 })).toThrow('La transaction doit avoir une date et un montant.');
});

test('supprime un revenu', () => {
  const budgetManager = new BudgetManager();
  budgetManager.addTransaction({ date: '2024-03-29', amount: 100 }); // Ajoute un revenu de 100
  budgetManager.removeTransaction(0); // Supprime le premier élément (le revenu)
  expect(budgetManager.transactions.length).toBe(0);
  expect(budgetManager.calculateBalance()).toBe(0);
});

test('ajoute une dépense', () => {
  const budgetManager = new BudgetManager();
  budgetManager.addTransaction({ date: '2024-03-29', amount: -50 }); // Ajoute une dépense de 50
  expect(budgetManager.transactions.length).toBe(1);
  expect(budgetManager.calculateBalance()).toBe(-50);
});

test('supprime une dépense', () => {
  const budgetManager = new BudgetManager();
  budgetManager.addTransaction({ date: '2024-03-29', amount: -50 }); // Ajoute une dépense de 50
  budgetManager.removeTransaction(0); // Supprime le premier élément (la dépense)
  expect(budgetManager.transactions.length).toBe(0);
  expect(budgetManager.calculateBalance()).toBe(0);
});

test('supprime une dépense avec un index invalide', () => {
  const budgetManager = new BudgetManager();
  expect(() => budgetManager.removeTransaction(0)).toThrow('Index hors limites.');
});

test('catégorise les revenus et les dépenses', () => {
  const budgetManager = new BudgetManager();
  budgetManager.addTransaction({ date: '2024-03-29', amount: 100, category: 'Salaire' }); // Ajoute un revenu de 100 avec la catégorie 'Salaire'
  budgetManager.addTransaction({ date: '2024-03-30', amount: -50, category: 'Alimentation' }); // Ajoute une dépense de 50 avec la catégorie 'Alimentation'
  expect(budgetManager.transactions.length).toBe(2);
  expect(budgetManager.transactions[0].category).toBe('Salaire');
  expect(budgetManager.transactions[1].category).toBe('Alimentation');
});
  
test('calcule le total des revenus par catégorie', () => {
  const budgetManager = new BudgetManager();
  budgetManager.addTransaction({ date: '2024-03-29', amount: 100, category: 'Salaire' }); // Ajoute un revenu de 100 avec la catégorie 'Salaire'
  budgetManager.addTransaction({ date: '2024-03-30', amount: 200, category: 'Salaire' }); // Ajoute un revenu de 200 avec la catégorie 'Salaire'
  budgetManager.addTransaction({ date: '2024-03-31', amount: 50, category: 'Bonus' }); // Ajoute un revenu de 50 avec la catégorie 'Bonus'
  expect(budgetManager.calculateTotalIncomeByCategory('Salaire')).toBe(300);
  expect(budgetManager.calculateTotalIncomeByCategory('Bonus')).toBe(50);
});

test('calcule le total des dépenses par catégorie', () => {
  const budgetManager = new BudgetManager();
  budgetManager.addTransaction({ date: '2024-03-29', amount: -50, category: 'Alimentation' }); // Ajoute une dépense de 50 avec la catégorie 'Alimentation'
  budgetManager.addTransaction({ date: '2024-03-30', amount: -30, category: 'Alimentation' }); // Ajoute une dépense de 30 avec la catégorie 'Alimentation'
  budgetManager.addTransaction({ date: '2024-03-31', amount: -20, category: 'Transport' }); // Ajoute une dépense de 20 avec la catégorie 'Transport'
  expect(budgetManager.calculateTotalExpensesByCategory('Alimentation')).toBe(-80);
  expect(budgetManager.calculateTotalExpensesByCategory('Transport')).toBe(-20);
});

test('affiche le solde total', () => {
  const budgetManager = new BudgetManager();
  budgetManager.addTransaction({ date: '2024-03-29', amount: 100 }); // Ajoute un revenu de 100
  budgetManager.addTransaction({ date: '2024-03-30', amount: -50 }); // Ajoute une dépense de 50
  expect(budgetManager.calculateTotalBalance()).toBe(50);
});

test('génère un résumé mensuel des finances', () => {
  const budgetManager = new BudgetManager();
  budgetManager.addTransaction({ date: '2024-03-29', amount: 100, category: 'Salaire' }); // Ajoute un revenu de 100 avec la catégorie 'Salaire'
  budgetManager.addTransaction({ date: '2024-03-30', amount: -50, category: 'Alimentation' }); // Ajoute une dépense de 50 avec la catégorie 'Alimentation'
  budgetManager.addTransaction({ date: '2024-03-31', amount: -30, category: 'Alimentation' }); // Ajoute une dépense de 30 avec la catégorie 'Alimentation'
  
  const summaryMarch2024 = budgetManager.getMonthlySummary(2, 2024);
  expect(summaryMarch2024.income).toBe(100);
  expect(summaryMarch2024.expenses).toBe(-80);
});

test('filtre les transactions par catégorie', () => {
  const budgetManager = new BudgetManager();
  budgetManager.addTransaction({ date: '2024-03-29', amount: 100, category: 'Salaire' }); // Ajoute un revenu de 100 avec la catégorie 'Salaire'
  budgetManager.addTransaction({ date: '2024-03-30', amount: -50, category: 'Alimentation' }); // Ajoute une dépense de 50 avec la catégorie 'Alimentation'
  budgetManager.addTransaction({ date: '2024-03-31', amount: -30, category: 'Alimentation' }); // Ajoute une dépense de 30 avec la catégorie 'Alimentation'
  
  const transactionsAlimentation = budgetManager.getTransactionsForCategory('Alimentation');
  expect(transactionsAlimentation.length).toBe(2);
  expect(transactionsAlimentation[0].category).toBe('Alimentation');
  expect(transactionsAlimentation[1].category).toBe('Alimentation');
});

test('filtre les transactions par date', () => {
  const budgetManager = new BudgetManager();
  budgetManager.addTransaction({ date: '2024-03-29', amount: 100 }); // Ajoute un revenu de 100
  budgetManager.addTransaction({ date: '2024-03-30', amount: -50 }); // Ajoute une dépense de 50
  budgetManager.addTransaction({ date: '2024-03-31', amount: -30 }); // Ajoute une dépense de 30
  
  const transactionsMarch2024 = budgetManager.getTransactionsForDate(new Date('2024-03-01'), new Date('2024-03-31'));
  expect(transactionsMarch2024.length).toBe(3);
});

test('filtre les transactions par mot-clé', () => {
  const budgetManager = new BudgetManager();
  budgetManager.addTransaction({ date: '2024-03-29', amount: 100, description: 'Salaire' }); // Ajoute un revenu de 100 avec la description 'Salaire'
  budgetManager.addTransaction({ date: '2024-03-30', amount: -50, description: 'Courses' }); // Ajoute une dépense de 50 avec la description 'Courses'
  budgetManager.addTransaction({ date: '2024-03-31', amount: -30, description: 'Courses' }); // Ajoute une dépense de 30 avec la description 'Courses'
  
  const transactionsCourses = budgetManager.getTransactionsByKeyWord('Courses');
  expect(transactionsCourses.length).toBe(2);
  expect(transactionsCourses[0].description).toBe('Courses');
  expect(transactionsCourses[1].description).toBe('Courses');
});

test('classe les catégories par montant sur les 3 derniers mois', () => {
  const budgetManager = new BudgetManager();
  budgetManager.addTransaction({ date: '2024-01-25', amount: 100, category: 'Salaire' }); // Ajoute un revenu de 100 avec la catégorie 'Salaire'
  budgetManager.addTransaction({ date: '2024-01-25', amount: -50, category: 'Alimentation' }); // Ajoute une dépense de 50 avec la catégorie 'Alimentation'
  budgetManager.addTransaction({ date: '2024-02-25', amount: 200, category: 'Salaire' }); // Ajoute un revenu de 200 avec la catégorie 'Salaire'
  budgetManager.addTransaction({ date: '2024-02-25', amount: -100, category: 'Alimentation' }); // Ajoute une dépense de 100 avec la catégorie 'Alimentation'
  budgetManager.addTransaction({ date: '2024-03-25', amount: 300, category: 'Salaire' }); // Ajoute un revenu de 300 avec la catégorie 'Salaire'
  budgetManager.addTransaction({ date: '2024-03-25', amount: -150, category: 'Alimentation' }); // Ajoute une dépense de 150 avec la catégorie 'Alimentation'
  
  const categoriesByAmount = budgetManager.getTopCategories();
  expect(categoriesByAmount['Alimentation']).toBe(300);
  expect(categoriesByAmount['Salaire']).toBe(600);
});