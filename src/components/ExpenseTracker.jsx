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
      <div id="myDIV" className="header">
        <h2>Wydatki</h2>
        <div className="inputs-row">
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
        </div>
        <div className="add-btn-row">
          <button onClick={handleAddExpense}>Dodaj wydatek</button>
        </div>
        <ul id="myUl">
          <li style={{ fontWeight: 'bold', paddingBottom: 8 }}>
            <span style={{ marginRight: 50 }}>Nazwa</span>
            <span style={{ marginRight: 50 }}>Ilość</span>
          </li>
            {expenses.map(exp => (
              <li key={exp.id}>
                <span>{exp.expense}</span>
                <span>{exp.amount}</span>
                <span><button onClick={() => handleDeleteExpense(exp.id)}>Usuń</button></span>
              </li>
            ))}
        </ul>
    
        <div>Suma wydatków: {getTotalExpenses()} zł</div>
      </div>
    </div>
  );
}

export default ExpenseTracker;
