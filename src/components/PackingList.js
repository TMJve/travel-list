import { useState } from "react";
import Item from "./Item";

function PackingList({ items, onDeleteItem, onToggleItem, onClear }) {
    const [sortOption, setSortOption] = useState("input");
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
        <button onClick={onClear}>Clear List</button>
  
      </div>
    )
  }

  export default PackingList;