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
    setItems((items)=>items.filter(item=>item.id !== id))
  }

  function handleToggleItem(id) {
    setItems(items=>items.map(item => item.id === id ? {...item, packed: !item.packed} : item));
  }

  return (
    <div className="app">
        <Logo />
        <Form onAddItem={handleAddItem} />
        <PackingList onToggleItem={handleToggleItem} onDeleteItem={handleDeleteItem} items={items} />
        <Status items={items} />
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

function PackingList({ items, onDeleteItem, onToggleItem }) {
  const [sortOption, setSortOption] = useState("packed");
  let sortedItems;

  if(sortOption === 'input') sortedItems = items;

  if(sortOption === 'description') sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

  if(sortOption === 'packed') sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map(item=><Item item={item} onToggleItem={onToggleItem} onDeleteItem={onDeleteItem} key={item.id}/>)}
      </ul>
      <select className="actions" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
        <option value='input'>Sort by input order</option>
        <option value='description'>Sort by Description</option>
        <option value='packed'>Sort by Packed</option>
      </select>

    </div>
  )
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return <li>
    <input type="checkbox" value={item.packed} onChange={() => {onToggleItem(item.id)}}/>
    <span style={item.packed ? {textDecoration: "line-through"} : {}}>
      {item.quantity} {item.description} 
    </span>
    <button onClick={()=>onDeleteItem(item.id)}>❌</button>
  </li>
}

function Status({ items }) {

  if(!items.length) return (
    <p className="stats">
      <em>
        Start Listing Things Up!    
      </em>
    </p>
  )
  

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems * 100));

  return <footer className="stats">
    <em>{percentage === 100 ? "You are ready to go on vacation! 🏖️" : `💼You have ${numItems} items on your list, 
      and you already have packed ${numPacked} (${percentage}%)`}
    </em>
    
  </footer>
}

export default App;