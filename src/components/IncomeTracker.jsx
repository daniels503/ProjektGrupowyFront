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
      <div id="myDIV" className="header">
        <h2>Przychody</h2>
          <div className="inputs-row">
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
          </div>
          <div className="add-btn-row">
            <button onClick={handleAddIncome}>Dodaj przychód</button>
          </div>
        
        <ul id="myUl">
          <li style={{ fontWeight: 'bold', paddingBottom: 8 }}>
            <span style={{ marginRight: 50 }}>Nazwa</span>
            <span style={{ marginRight: 50 }}>Ilość</span>
          </li>
          {incomes.map(inc => (
            <li key={inc.id}>
              <span>{inc.name}</span>
              {inc.price !== undefined && inc.price !== null && (
                <span style={{marginLeft: 8, color: '#888', fontSize: 14}}>{inc.price} zł</span>
              )}
              <span className="close" onClick={() => handleDeleteIncome(inc.id)}>&times;</span>
            </li>
          ))}
        </ul>

        <div>Suma przychodów: {getTotalIncomes()} zł</div>
      </div>
    </div>
  );
}

export default IncomeTracker;
