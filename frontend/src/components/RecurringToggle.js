function RecurringToggle({ recurring, setRecurring }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", color:"#6b166e" }}>
      <span>Add as recurring</span>

      <input
        type="checkbox"
        checked={recurring}
        onChange={() => setRecurring(!recurring)}
      />
    </div>
  );
}

export default RecurringToggle;