import React, { useState } from "react";
import Logo from './Logo';
import Form from './Form';
import PackingList from "./PackingList";
import Status from "./Status";

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

  function handleClear() {
    const confirmed = window.confirm('Do you want to remove all the items on the list?');
    if(confirmed) {
      setItems([]);
    } 
  }

  return (
    <div className="app">
        <Logo />
        <Form onAddItem={handleAddItem} />
        <PackingList onToggleItem={handleToggleItem} onDeleteItem={handleDeleteItem} onClear={handleClear} items={items} />
        <Status items={items} />
    </div>

  )
}

export default App;