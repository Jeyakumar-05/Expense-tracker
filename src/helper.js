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
