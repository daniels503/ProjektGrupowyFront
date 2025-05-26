import { useEffect, useState } from 'react';
import { addIncome, getIncomes, deleteIncome } from '../API/productApi';
import './ExpenseTracker.css';

function IncomeTracker() {
  const [incomes, setIncomes] = useState([]);
  const [newIncome, setNewIncome] = useState({ name: '', price: '', date: '' });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    getIncomes().then(response => setIncomes(response.data));
  }, []);

  const handleAddIncome = () => {
    if (newIncome.name.trim() === '' || newIncome.price.trim() === '' || newIncome.date.trim() === '') {
      alert('Nie zostawiaj pustych pól.');
      return;
    }

    addIncome(newIncome.price, newIncome.name, newIncome.date)
      .then(response => {
        setIncomes(prev => [...prev, response.data]);
        setNewIncome({ name: '', price: '', date: '' });
      })
      .catch(err => console.error(err));
  };

  const handleDeleteIncome = (id) => {
    deleteIncome(id)
      .then(() => setIncomes(prev => prev.filter(inc => inc.id !== id)))
      .catch(err => console.error(err));
  };

  const handleSort = (key) => {
    setSortConfig(prev =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    );
  };

  const sortedIncomes = [...incomes].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const getTotalIncomes = () => {
    return sortedIncomes.reduce((total, income) => total + parseFloat(income.price), 0).toFixed(2);
  };

  return (
    <div>
      <h2>Przychody</h2>
      <input
        type="text"
        placeholder="Źródło"
        value={newIncome.name}
        onChange={e => setNewIncome({ ...newIncome, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Kwota"
        value={newIncome.price}
        onChange={e => setNewIncome({ ...newIncome, price: e.target.value })}
      />
      <input
        type="date"
        value={newIncome.date}
        onChange={e => setNewIncome({ ...newIncome, date: e.target.value })}
      />
      <button onClick={handleAddIncome}>Dodaj przychód</button>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>
              Źródło {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th onClick={() => handleSort('price')}>
              Kwota {sortConfig.key === 'price' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th onClick={() => handleSort('date')}>
              Data {sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedIncomes.map(inc => (
            <tr key={inc.id}>
              <td>{inc.name}</td>
              <td>{inc.price}</td>
              <td>{inc.date}</td>
              <td><button onClick={() => handleDeleteIncome(inc.id)}>Usuń</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>Suma przychodów: {getTotalIncomes()} zł</div>
    </div>
  );
}

export default IncomeTracker;
