import { useEffect, useState } from 'react';
import { addExpense, getExpenses, deleteExpense } from '../API/productApi';
import './ExpenseTracker.css';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ expense: '', amount: '', date: '' });

  useEffect(() => {
    getExpenses().then(response => setExpenses(response.data));
  }, []);

  const handleAddExpense = () => {
    if (
      newExpense.expense.trim() === '' ||
      newExpense.amount.trim() === '' ||
      newExpense.date.trim() === ''
    ) {
      alert('Nie zostawiaj pustych pól.');
      return;
    }

    addExpense(newExpense.expense, newExpense.amount, newExpense.date)
      .then(response => {
        setExpenses(prev => [...prev, response.data]);
        setNewExpense({ expense: '', amount: '', date: '' });
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

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortedExpenses = [...expenses].sort((a, b) => {
  if (sortConfig.key === null) return 0;

  const aValue = a[sortConfig.key];
  const bValue = b[sortConfig.key];

  if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
  if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
  return 0;
});

const handleSort = (key) => {
  setSortConfig(prev => {
    if (prev.key === key) {
      return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
    }
    return { key, direction: 'asc' };
  });
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
      <input
        type="date"
        value={newExpense.date}
        onChange={e => setNewExpense({ ...newExpense, date: e.target.value })}
      />
      </div>
      <div className="add-btn-row">
      <button onClick={handleAddExpense}>Dodaj wydatek</button>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('expense')}>
              Wydatek {sortConfig.key === 'expense' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th onClick={() => handleSort('amount')}>
              Kwota {sortConfig.key === 'amount' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th onClick={() => handleSort('date')}>
              Data {sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedExpenses.map(exp => (
          <tr key={exp.id}>
            <td>{exp.expense}</td>
            <td>{exp.amount}</td>
            <td>{exp.date}</td>
            <td><button onClick={() => handleDeleteExpense(exp.id)}>Usuń</button></td>
          </tr>
        ))}
        </tbody>
      </table>

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
