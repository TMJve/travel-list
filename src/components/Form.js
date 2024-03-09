import { useState } from "react";

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
export default Form;  