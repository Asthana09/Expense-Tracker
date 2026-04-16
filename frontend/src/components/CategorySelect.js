function CategorySelect ({filterCategory, setFilterCategory}){

  return (
    <select
      value={filterCategory}
      onChange={(e) => setFilterCategory(e.target.value)}
      style={{ width: "105%",
  padding: "10px",
  marginTop: "10px",
   borderRadius:"10px",
borderColor:"#d38dd6"}}>
      <option value="All">Select Category</option>
      <option value="Food">Food</option>
      <option value="Travel">Travel</option>
      <option value="Shopping">Shopping</option>
      <option value="Income">Income</option>

    </select>
  );
}

export default CategorySelect;