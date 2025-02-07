import { useState } from 'react';

const shoppingItems = [
  {
    id: 1,
    description: 'milk',
    quantity: 1,
    bought: false,
  },
  {
    id: 2,
    description: 'bread',
    quantity: 2,
    bought: true,
  },
];

export default function App() {
  return (
    <div className="app">
      <Title />
      <Form />
      <ShoppingList />
      <Footer />
    </div>
  );
}

function Title() {
  return <h1>🛍️ shopping list 🛍️</h1>;
}

function Form() {
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

function ShoppingList() {
  return (
    <div className="shopping-list">
      <ul>
        {shoppingItems.map(item => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.bought ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button className="btn-dlt">❌</button>
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
