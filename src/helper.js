export const waitt = () =>
  new Promise((res) => setTimeout(res, Math.random() * 2000));

const generateRandomColor = () => {
  const existingBudgetsLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetsLength * 34} 65% 50%`;
};

//Local storage

//get item
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key)); // save as JSON format
};

// delete item
export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};

//create budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createAt: Date.now(),
    amount: +amount, //course into string to number
    color: generateRandomColor(),
  };
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

//create expense
export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

//totat spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;

    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

// Formatting

//Format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
};

//Format Percentage
export const formatPercentage = (amt) => {
  return amt.toLocaleString("en-IN", {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

//Format date
export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();
