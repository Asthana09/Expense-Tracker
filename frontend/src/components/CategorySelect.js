function CategorySelect ({filterCategory, setFilterCategory, type , isfilter}){

  const expenseCategories =["Food" , "Travel", "Shopping"];
  const investmentCategories = ["SIP", "Stocks","Crypto"];
  var categories =[];

  if(isfilter){
        categories =[...expenseCategories, ...investmentCategories];
  }else{
    if(type==="income") return null;

  //condition to show which category
  categories = type === "investment"
  ?investmentCategories : expenseCategories;
  }

  return (
    <select
      value={filterCategory}
      onChange={(e) => setFilterCategory(e.target.value)}
      style={{ 
        width: "105%",
        padding: "10px",
        marginTop: "10px",
        borderRadius:"10px",
        borderColor:"#d38dd6"
        }}>
      <option value="All">Select Category</option>
      {categories.map((cat)=>(
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
      </select>    
  );
}

export default CategorySelect;