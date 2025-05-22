import { useEffect, useState } from 'react';
import { addProduct, deleteProduct, getShoppingList } from '../API/productApi';
import './List.css';

function List() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    getShoppingList().then(response => setItems(response.data));
  }, []);

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      addProduct(inputValue, 0)
        .then(response => {
          setItems(prev => [...prev, response.data]);
          setInputValue('');
        })
        .catch(err => console.error(err));
    } else {
      alert('Nie zostawiaj pustych pól!');
    }
  };

  const handleRemoveItem = (id) => {
    deleteProduct(id)
      .then(() => setItems(prev => prev.filter(item => item.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <div id="myDIV" className="header">
        <h2>Lista zakupów</h2>
        <input
          type="text"
          placeholder="Nowy produkt"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button onClick={handleAddItem} className="addBtn">Dodaj</button>
      </div>

      <ul id="myUl">
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <span className="close" onClick={() => handleRemoveItem(item.id)}>&times;</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
