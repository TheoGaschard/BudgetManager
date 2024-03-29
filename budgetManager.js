// budgetManager.js

class BudgetManager {
  constructor() {
    this.transactions = [];

  }

  addTransaction(transaction) {
    if (transaction.amount === undefined || transaction.date === undefined) {
      throw new Error('La transaction doit avoir une date et un montant.');
    }
    this.transactions.push(transaction);
  }

  removeTransaction(index) {
    if (index >= 0 && index < this.transactions.length) {
      this.transactions.splice(index, 1);
    } else {
      throw new Error('Index hors limites.');
    }
  }

  calculateBalance() {
    return this.transactions.reduce((total, transaction) => total + transaction.amount, 0);
  }

  calculateTotalIncomeByCategory(category) {
    return this.transactions
      .filter(transaction => transaction.amount > 0 && transaction.category === category)
      .reduce((total, transaction) => total + transaction.amount, 0);
  }

  calculateTotalExpensesByCategory(category) {
    return this.transactions
      .filter(transaction => transaction.amount < 0 && transaction.category === category)
      .reduce((total, transaction) => total + transaction.amount, 0);
  }

  getTransactionsForMonth(month, year) {
    return this.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() === month && transactionDate.getFullYear() === year;
    });
  }

  getTransactionsForCategory(category) {
    return this.transactions.filter(transaction => transaction.category === category);
  }

  getTransactionsForDate(StartDate, EndDate) {
    return this.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= StartDate && transactionDate <= EndDate;
    });
  }

  getTransactionsByKeyWord(keyword) {
    return this.transactions.filter(transaction => transaction.description.includes(keyword));
  }

  getMonthlySummary(month, year) {
    const transactions = this.getTransactionsForMonth(month, year);
    let income = 0;
    let expenses = 0;
    transactions.forEach(transaction => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      } else {
        expenses += transaction.amount;
      }
    });
    return { income, expenses };
  }

  // fonction pour avoir les catégories par montant absolu sur les 3 derniers mois
  getTopCategories() {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    const transactions = this.getTransactionsForDate(threeMonthsAgo, new Date());
    const categories = {};
    transactions.forEach(transaction => {
      categories[transaction.category] = (categories[transaction.category] || 0) + Math.abs(transaction.amount);
    });
    return categories;

  }


  calculateTotalBalance() {
    return this.transactions.reduce((total, transaction) => total + transaction.amount, 0);
  }
}

module.exports = BudgetManager;