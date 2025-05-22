import { useEffect, useState } from 'react';
import { addIncome, getIncomes, deleteIncome } from '../API/productApi';
import './ExpenseTracker.css';

function IncomeTracker() {
  const [incomes, setIncomes] = useState([]);
  const [newIncome, setNewIncome] = useState({ name: '', price: '' });

  useEffect(() => {
    getIncomes().then(response => setIncomes(response.data));
  }, []);

  const handleAddIncome = () => {
    if (newIncome.name.trim() === '' || newIncome.price.trim() === '') {
      alert('Nie zostawiaj pustych pól.');
      return;
    }

    addIncome(newIncome.price, newIncome.name)
      .then(response => {
        setIncomes(prev => [...prev, response.data]);
        setNewIncome({ name: '', price: '' });
      })
      .catch(err => console.error(err));
  };

  const handleDeleteIncome = (id) => {
    deleteIncome(id)
      .then(() => setIncomes(prev => prev.filter(inc => inc.id !== id)))
      .catch(err => console.error(err));
  };

  const getTotalIncomes = () => {
    return incomes.reduce((total, income) => total + parseFloat(income.price), 0).toFixed(2);
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
      <button onClick={handleAddIncome}>Dodaj przychód</button>

      <table>
        <thead>
          <tr>
            <th>Źródło</th>
            <th>Kwota</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {incomes.map(inc => (
            <tr key={inc.id}>
              <td>{inc.name}</td>
              <td>{inc.price}</td>
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
