import React, { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems(items => [...items, item]);
  }

  function handleDeleteItem(id) {
    console.log(id)
    setItems(items=>items.filter(item=>item.id !== id))
  }

  return (
    <div className="app">
        <Logo />
        <Form onAddItem={handleAddItem} />
        <PackingList onDeleteItem={handleDeleteItem} items={items} />
        <Status />
    </div>

  )
}

function Logo() {
  return (
    <h1>🏖️Far Away💼</h1>
  )
}

function Form({onAddItem}) {
  const [description,setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  


  function handleFormSubmit(e) {
    e.preventDefault();
    if(!description) return;

    const newItem = {description, quantity, packed: false, id: Date.now()};
    console.log(newItem);
    
    onAddItem(newItem);

    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleFormSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}>
        {Array.from({length: 20}, (_, i) => i + 1).map((num) => 
        <option value={num} key={num}>
          {num}
        </option>)}
      </select>
      <input type="text" placeholder="Item to list..." value={description} onChange={(e)=>setDescription(e.target.value)}></input>
      <button>Add</button>
    </form>
  )
}

function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map(item=><Item item={item} onDeleteItem={onDeleteItem} key={item.id}/>)}
      </ul>
    </div>
  )
}

function Item({ item, onDeleteItem }) {
  return <li>
    <span style={item.packed ? {textDecoration: "line-through"} : {}}>
      {item.quantity} {item.description} 
    </span>
    <button onClick={()=>onDeleteItem(item.id)}>❌</button>
  </li>
}

function Status() {
  return <footer className="stats">
    <em>💼You have X items on your list, and you already have packed X (X%)</em>

  </footer>
}

export default App;