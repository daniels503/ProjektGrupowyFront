import Axios from 'axios';
export const SHOPPING_LIST_URL = 'http://localhost:8080/api/shopping-list';
export const INCOME_URL = 'http://localhost:8080/api/income';
export const EXPENSES_URL = 'http://localhost:8080/api/expenses';
export const PRESETS_URL = 'http://localhost:8080/api/presets';


export const addProduct = (name, price, quantity, category) => {
    const url = `${SHOPPING_LIST_URL}/add`;
    const newProduct= {
        name: name, 
        price: price,
        quantity: quantity,
        category: category,
    }
    return Axios.post(url, newProduct)
}

export const deleteProduct = (id) => {
    const url = `${SHOPPING_LIST_URL}/delete/${id}`;
    return Axios.delete(url);
};

// Find a product by ID
export const findProduct = (id) => {
    const url = `${SHOPPING_LIST_URL}/${id}`;
    return Axios.get(url);
};

// Get the full shopping list
export const getShoppingList = () => {
    const url = `${SHOPPING_LIST_URL}/`;
    return Axios.get(url);
};

// === INCOME ENDPOINTS ===

// Add new income
export const addIncome = (price, name, date) => {
  const url = `${INCOME_URL}/add`;
  return Axios.post(url, {
    name: name,
    price: price,
    date: date
  });
};

// Get all incomes
export const getIncomes = () => {
    const url = `${INCOME_URL}/`;
    return Axios.get(url);
};

// Delete income by ID
export const deleteIncome = (id) => {
    const url = `${INCOME_URL}/delete/${id}`;
    return Axios.delete(url);
};

// Add a new expense
export const addExpense = (expense, amount, date) => {
  const url = `${EXPENSES_URL}/add`;
  const newExpense = { expense, amount, date };
  return Axios.post(url, newExpense);
};


// Get all expenses
export const getExpenses = () => {
    const url = `${EXPENSES_URL}/`;
    return Axios.get(url);
};

// Delete expense by ID
export const deleteExpense = (id) => {
    const url = `${EXPENSES_URL}/delete/${id}`;
    return Axios.delete(url);
};

// Find specific expense by ID
export const findExpense = (id) => {
    const url = `${EXPENSES_URL}/${id}`;
    return Axios.get(url);
};

// PRESETS

// Add new preset
export const addPreset = (price, name, quantity, category) => {
    const url = `${PRESETS_URL}/add`;
    const newPreset= {
        name: name, 
        price: price,
        quantity: quantity,
        category: category,
    }
    return Axios.post(url, newPreset);
};

// Get all presets
export const getPresets = () => {
    const url = `${PRESETS_URL}/`;
    return Axios.get(url);
};

// Delete preset by ID
export const deletePreset = (id) => {
    const url = `${PRESETS_URL}/delete/${id}`;
    return Axios.delete(url);
};