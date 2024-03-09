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

  export default Status;