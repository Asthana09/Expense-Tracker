
function TypeSelector({type, setType}){
return(
<div style={{display:"flex", gap: "10px", marginTop:"10px", marginLeft:"13px"}}>
    {["Expense", "Income", "Investment"].map((item)=>(
   <button 
   key={item}
   onClick={() =>setType(item)}
   style={{
    flex: 1,
    padding: "8px",
    background: type === item? "#8a508c" : "#e9d6ea",
    color :type === item ? "white" : "black",
    borderRadius:"10px", borderColor:"#e3dbdb"
   }}
   
   >
    {item}
   </button>
    ))}
</div>
);
    
}
export default TypeSelector;



