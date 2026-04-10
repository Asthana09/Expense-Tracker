function CategorySelect ({category, setCategory}){

  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      style={input}
    >
      <option value="">Select Category</option>
      <option>Food</option>
      <option>Travel</option>
      <option>Shopping</option>
    </select>
  );
}

const input = {
  width: "105%",
  padding: "10px",
  marginTop: "10px",
   borderRadius:"10px",
borderColor:"#d38dd6",};

export default CategorySelect;