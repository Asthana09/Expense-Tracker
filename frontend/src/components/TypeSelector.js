
function TypeSelector({type, setType, balance}){


    return(
        <div style={{display:"flex", gap: "10px", marginTop:"10px", marginLeft:"13px"}}>

          {/* Expense */}
          {balance > 0 &&(
             <button
           onClick={()=>setType("expense")}
           style={{flex: 1,
             padding: "8px",
             background: type === "expense"? "#8a508c" : "#e9d6ea",
             color :type === "expense" ? "white" : "black",
             borderRadius:"10px", 
             borderColor:"#e3dbdb"
                }}
           >
            Expense
           </button>
           )} 

           <button
           onClick={()=>setType("income")}
           style={{flex: 1,
             padding: "8px",
             background: type === "income"? "#8a508c" : "#e9d6ea",
             color :type === "income" ? "white" : "black",
             borderRadius:"10px", borderColor:"#e3dbdb"
                }}
           >
            Income
           </button>

            {balance > 0 &&( 
           <button
           onClick={()=>setType("investment")}
           style={{flex: 1,
             padding: "8px",
             background: type === "investment"? "#8a508c" : "#e9d6ea",
             color :type === "investment" ? "white" : "black",
             borderRadius:"10px", borderColor:"#e3dbdb"
                }}
           >
            Investment
           </button>
             )} 

        </div>
    );

}
export default TypeSelector;


    




