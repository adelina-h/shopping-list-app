import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItem(item) {
    setItems(items => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, bought: !item.bought } : item
      )
    );
  }
  return (
    <div className="app">
      <Title />
      <Form onAddItem={handleAddItem} />
      <ShoppingList
        items={items}
        onDeteleItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Footer />
    </div>
  );
}

function Title() {
  return <h1>🛍️ shopping list 🛍️</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = {
      description,
      quantity,
      bought: false,
      id: Math.floor(Math.random() * 34),
    };
    console.log(newItem);
    onAddItem(newItem);
    setQuantity(1);
    setDescription('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <h3>What do you need to buy? 🛒</h3>
      <select
        className="select"
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Type here..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button className="btn">Add item</button>
    </form>
  );
}

function ShoppingList({ items, onDeteleItem, onToggleItem }) {
  return (
    <div className="shopping-list">
      <ul>
        {items.map(item => (
          <Item
            item={item}
            key={item.id}
            onDeteleItem={onDeteleItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeteleItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.bought}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.bought ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      {/* to remember this */}
      <button className="btn-dlt" onClick={() => onDeteleItem(item.id)}>
        ❌
      </button>
    </li>
  );
}

function Footer() {
  return (
    <footer>
      <em> 🛒 Enjoy your shopping!</em>
    </footer>
  );
}
