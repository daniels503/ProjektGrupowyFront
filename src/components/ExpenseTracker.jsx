import { useEffect, useState } from 'react';
import { addExpense, getExpenses, deleteExpense } from '../API/productApi';
import './ExpenseTracker.css';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ expense: '', amount: '', date: '' });

  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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

  const handleSort = (key) => {
    setSortConfig(prev =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    );
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredExpenses = sortedExpenses.filter(exp => {
    const dateValid =
      (!minDate || exp.date >= minDate) &&
      (!maxDate || exp.date <= maxDate);
    const amountValid =
      (!minAmount || parseFloat(exp.amount) >= parseFloat(minAmount)) &&
      (!maxAmount || parseFloat(exp.amount) <= parseFloat(maxAmount));
    return dateValid && amountValid;
  });

  const getTotalExpenses = () => {
    return filteredExpenses.reduce((total, exp) => total + parseFloat(exp.amount), 0).toFixed(2);
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
          <button onClick={handleAddExpense}>Dodaj wydatek</button>
        </div>

        
        <p style={{ fontSize: '20px', color: '#666' }}>
          Wybierz przedział dat i kwot, aby pofiltrować wydatki.
        </p>

        <div className="filter-row">
          <input
            type="date"
            value={minDate}
            onChange={e => setMinDate(e.target.value)}
            placeholder="Od daty"
          />
          <input
            type="date"
            value={maxDate}
            onChange={e => setMaxDate(e.target.value)}
            placeholder="Do daty"
          />
          <input
            type="number"
            value={minAmount}
            onChange={e => setMinAmount(e.target.value)}
            placeholder="Kwota od"
          />
          <input
            type="number"
            value={maxAmount}
            onChange={e => setMaxAmount(e.target.value)}
            placeholder="Kwota do"
          />
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
            {filteredExpenses.map(exp => (
              <tr key={exp.id}>
                <td>{exp.expense}</td>
                <td>{exp.amount}</td>
                <td>{exp.date}</td>
                <td><button onClick={() => handleDeleteExpense(exp.id)}>Usuń</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>Suma wydatków: {getTotalExpenses()} zł</div>

      </div>
    </div>
  );
}

export default ExpenseTracker;
