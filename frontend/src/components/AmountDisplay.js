

function AmountDisplay({amount, setAmount}){  //receiving props
  return(
  <>
    <h1 style={{ textAlign: "center" , marginTop:"-20px", color:"#6b166e"}}>
      {/* //show amount else 0.00 */}
        ₹{amount ||"0.00"}</h1>        
    <input
    type="number"
    value={amount}
    onChange={(e)=>setAmount(e.target.value)}
    placeholder="Enter Amount"
    style={input}
    />
    </>
   );
}
const input ={
  width: "100%",
  padding: "10px",
  marginTop:"10px",
  borderRadius:"10px",
  borderColor:"#d38dd6",
 
  
}

export default AmountDisplay;