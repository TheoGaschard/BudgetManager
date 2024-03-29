// userManager.js

class UserManager {
  constructor(budgetManager) {
    this.user = null;
    this.budgetManager = budgetManager;
  }

  authenticateUser(password) {
    if (this.user && this.user.password === password) {
      return true;
    }
    return false;
  }

  updateUserProfile(name, email, password) {
    this.user = { name, email, password };
  }

  exportFinancialData() {
    // Logique d'exportation des données financières
    return 'Données financières exportées avec succès.';
  }

  importFinancialData(data) {
    // Logique d'importation des données financières
    return 'Données financières importées avec succès.';
  }

  setNotificationThreshold(threshold) {
    this.notificationThreshold = threshold;
  }

  notifyExcessiveSpendingThisMonth() {
    const transactions = this.budgetManager.getTransactionsForMonth(new Date().getMonth(), new Date().getFullYear());
    const totalExpenses = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    if (-totalExpenses > this.notificationThreshold) {
      return 'Notification envoyée pour dépenses excessives.';
    } else {
      return 'Aucune dépense excessive détectée.';
    }
  }


  setMonthlyFinancialGoal(month, year, goal) {
    this.user.goals = this.user.goals || {};
    this.user.goals[`${year}-${month}`] = goal;
  }
}
  
  module.exports = UserManager;  