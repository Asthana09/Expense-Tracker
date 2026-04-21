function RecurringToggle({ recurring, setRecurring}) {          //child component receiving props form parent 
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", color:"#6b166e",  }}>
      <span>Add as recurring</span>

      <label >
    
      <input
       
        type="checkbox"
        checked={recurring}
        onChange={(e) => setRecurring(e.target.checked)}
      />
       Recurring
      </label>
    </div>
  );
}

export default RecurringToggle;