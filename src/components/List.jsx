import { useEffect, useState } from 'react';
import { addProduct, deleteProduct, getShoppingList } from '../API/productApi';
import './List.css';
import usePreset from './usePreset';

function List() {
  const [inputValue, setInputValue] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const [quantityValue, setQuantityValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [items, setItems] = useState([]);

  const {
    presets,
    presetSearch,
    setPresetSearch,
    showDropdown,
    setShowDropdown,
    handleSavePreset,
    handleAddPresetToList,
    handleRemovePreset
  } = usePreset(setInputValue, setPriceValue, setQuantityValue, setCategoryValue);


  useEffect(() => {
    getShoppingList().then(response => setItems(response.data));
  }, []);

  const handleAddItem = () => {
    if (inputValue.trim() !== '' && quantityValue.trim() !== '') {
      const priceToSend = priceValue.trim() === '' ? null : parseFloat(priceValue);
      const categoryToSend = categoryValue.trim() === '' ? null : categoryValue.trim();
      addProduct(inputValue, priceToSend, parseInt(quantityValue, 10), categoryToSend)
        .then(response => {
          setItems(prev => [...prev, response.data]);
          setInputValue('');
          setPriceValue('');
          setQuantityValue('');
          setCategoryValue('');
        })
        .catch(err => console.error(err));
    } else {
      alert('Nie zostawiaj pustych pól!');
    }
  };

  const handleAddPresetItem = (name, price, quantity, category) => {
    addProduct(name, price, quantity, category)
      .then(response => {
        setItems(prev => [...prev, response.data])
      })
      .catch(err => console.error(err));
      showDropdown(false);
  }

  const handleRemoveItem = (id) => {
    deleteProduct(id)
      .then(() => setItems(prev => prev.filter(item => item.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="main-container">
      <div className="list-container">
        <div id="myDIV" className="header">
          <h2>Lista zakupów</h2>
          <div className="inputs-row">
            <input
              type="text"
              placeholder="Nowy produkt"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Cena"
              value={priceValue}
              onChange={e => setPriceValue(e.target.value)}
            />
            <input
              type="number"
              min="1"
              step="1"
              placeholder="Ilość"
              value={quantityValue}
              onChange={e => setQuantityValue(e.target.value)}
            />
            <input
              type="text"
              placeholder="Kategoria (opcjonalnie)"
              value={categoryValue}
              onChange={e => setCategoryValue(e.target.value)}
            />
          </div>
          <div className="add-btn-row">
            <button onClick={handleAddItem} className="addBtn">Dodaj</button>
          </div>

          {/*Shopping List*/}
          <ul id="myUl">
            <li style={{ fontWeight: 'bold', paddingBottom: 8 }}>
              <span>Produkt</span>
              <span>Cena</span>
              <span>Ilość</span>
              <span>Kategoria</span>
              <span>Usuń</span>
              <span>Zapisz</span>
            </li>
            {items.map(item => (
              <li key={item.id}>
                <span>{item.name}</span>
                {item.price !== undefined && item.price !== null && (
                  <span style={{marginLeft: 8, color: '#888', fontSize: 14}}>{item.price} zł</span>
                )}
                {item.quantity !== undefined && (
                  <span style={{marginLeft: 8, color: '#bbb', fontSize: 13}}>{item.quantity} szt.</span>
                )}
                {item.category && (
                  <span style={{marginLeft: 8, color: '#a5a5a5', fontSize: 13, fontStyle: 'italic'}}>{item.category}</span>
                )}
                <span className="close" onClick={() => handleRemoveItem(item.id)}>&times;</span>
                <span className="close" onClick={() => handleSavePreset(item)}>Zapisz</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/*Preset*/}
      <div className="preset-container">
        <input
          className="input-preset"
          type="text"
          placeholder="Wybierz preset..."
          value={presetSearch}
          onChange={e => setPresetSearch(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)} // allow click
        />
        {showDropdown && (
          <ul className="dropdown">
            {presets
              .filter(p => p.name.toLowerCase().includes(presetSearch.toLowerCase()))
              .map(p => (
                <li key={p.id}>
                  <div className="dropdown li" 
                    onClick={() => handleAddPresetItem(p.name, p.price, p.quantity, p.category)} 
                  >
                    <span>{p.name}</span>
                    <span>{p.price} zł</span>
                    <span>{p.quantity} szt.</span>
                    <span>{p.category}</span>
                  </div>
                  <button onClick={() => handleRemovePreset(p.id)}>Usuń</button>
                </li>
              ))}
          </ul>
        )}
      </div>

    </div>
  );
}

export default List;
