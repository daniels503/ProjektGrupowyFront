import { useEffect, useState } from 'react';
import { addExpense, getExpenses, deleteExpense } from '../API/productApi';
import './ExpenseTracker.css';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ expense: '', amount: '' });

  useEffect(() => {
    getExpenses().then(response => setExpenses(response.data));
  }, []);

  const handleAddExpense = () => {
    if (newExpense.expense.trim() === '' || newExpense.amount.trim() === '') {
      alert('Nie zostawiaj pustych pól.');
      return;
    }

    addExpense(newExpense.expense, newExpense.amount)
      .then(response => {
        setExpenses(prev => [...prev, response.data]);
        setNewExpense({ expense: '', amount: '' });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteExpense = (id) => {
    deleteExpense(id)
      .then(() => setExpenses(prev => prev.filter(exp => exp.id !== id)))
      .catch(err => console.error(err));
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, exp) => total + parseFloat(exp.amount), 0).toFixed(2);
  };

  return (
    <div>
      <h2>Wydatki</h2>
      <input
        type="text"
        placeholder="Wydatek"
        value={newExpense.expense}
        onChange={e => setNewExpense({ ...newExpense, expense: e.target.value })}
      />
      <input
        type="number"
        placeholder="Kwota"
        value={newExpense.amount}
        onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })}
      />
      <button onClick={handleAddExpense}>Dodaj wydatek</button>

      <table>
        <thead>
          <tr>
            <th>Wydatek</th>
            <th>Kwota</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp.id}>
              <td>{exp.expense}</td>
              <td>{exp.amount}</td>
              <td><button onClick={() => handleDeleteExpense(exp.id)}>Usuń</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>Suma wydatków: {getTotalExpenses()} zł</div>
    </div>
  );
}

export default ExpenseTracker;
