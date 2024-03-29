// userManager.test.js
const UserManager = require('./userManager');

test('authentifie un utilisateur', () => {
  const userManager = new UserManager();
  userManager.updateUserProfile('Jean Dupont', 'de', '1234');
  expect(userManager.authenticateUser('1234')).toBe(true);
});

test('échoue à authentifier un utilisateur', () => {
  const userManager = new UserManager();
  userManager.updateUserProfile('Jean Dupont', 'de', '1234');
  expect(userManager.authenticateUser('4321')).toBe(false);
});

test('met à jour le profil utilisateur', () => {
  const userManager = new UserManager();
  userManager.updateUserProfile('Jean Dupont', 'de', '1234');
  expect(userManager.user).toEqual({ name: 'Jean Dupont', email: 'de', password: '1234' });
});

test('exporte les données financières', () => {
  const userManager = new UserManager();
  expect(userManager.exportFinancialData()).toBe('Données financières exportées avec succès.');
});

test('importe les données financières', () => {
  const userManager = new UserManager();
  expect(userManager.importFinancialData('test')).toBe('Données financières importées avec succès.');
});

test('définit le seuil de notification', () => {
  const userManager = new UserManager();
  userManager.setNotificationThreshold(1000);
  expect(userManager.notificationThreshold).toBe(1000);
});

test('notifie les dépenses excessives ce mois-ci', () => {
  const userManager = new UserManager();
  const budgetManager = {
    getTransactionsForMonth: jest.fn(() => [{ amount: -500 }, { amount: -600 }]),
  };
  userManager.budgetManager = budgetManager;
  userManager.setNotificationThreshold(1000);
  expect(userManager.notifyExcessiveSpendingThisMonth()).toBe('Notification envoyée pour dépenses excessives.');
});

test('ne notifie pas les dépenses excessives ce mois-ci', () => {
  const userManager = new UserManager();
  const budgetManager = {
    getTransactionsForMonth: jest.fn(() => [{ amount: -500 }, { amount: -400 }]),
  };
  userManager.budgetManager = budgetManager;
  userManager.setNotificationThreshold(1000);
  expect(userManager.notifyExcessiveSpendingThisMonth()).toBe('Aucune dépense excessive détectée.');
});


test('définit un objectif financier mensuel', () => {
  const userManager = new UserManager();
  userManager.updateUserProfile('Jean Dupont', 'de', '1234');
  userManager.setMonthlyFinancialGoal(3, 2024, 1000);
  expect(userManager.user.goals['2024-3']).toBe(1000);
});

