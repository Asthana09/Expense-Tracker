import { useEffect, useState } from "react";   //use effect 
import axios from "axios";       // use to call backend API form frontend     
import CategorySelect from "./CategorySelect.js";



function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  // const [editingTransaction, seteditingTransaction] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount]= useState("");
  useEffect(() => {        // when component loads, run fetch data
    fetchData();
  }, []); // run only when component loads(not again and again)

  const fetchData = () => {
    axios.get("http://localhost:5000/api/transactions")
      .then(res => setTransactions(res.data));
  };


    // **************Delete function
  const deleteTransaction = async (id) => {
    await axios.delete(`http://localhost:5000/api/transactions/${id}`);
    fetchData();
  };

  // **************Edit function
   const startEdit =(transaction)=>{
       setEditingId(transaction._id);
       setEditAmount(transaction.amount);
  };
   const updateTransaction = async (id)=>{
    try{
      await axios.put(`http://localhost:5000/api/transactions/${id}`,
        {
         amount : Number(editAmount)
      });

        alert("Amount updated successfully");

        setEditingId(null);
        setEditAmount("");
        fetchData();                    //get updated list from database
        } catch(err){
         console.log(err);
        }
   };
  
  

  // //*************** Balance *************
   const totalIncome = transactions 
   .filter(t=> t.type?.toLowerCase() === "income")
   .reduce((acc, t)=> acc + Number(t.amount), 0);


   const totalExpense  = transactions
   .filter(t => 
            t.type?.toLowerCase() === "expense" || 
            t.type?.toLowerCase() === "investment")
    .reduce((acc, t)=> acc + Number(t.amount), 0);

   const balance = totalIncome - totalExpense;

      
   const filteredTransactions =
   filterCategory === "All" || !filterCategory
   ?transactions:
   transactions.filter((t)=>t.category === filterCategory);


  // ******************* Return

  return (
    <div style={{ width: "100%", color:"#6b166e" }}>

      {/* {/********** Balance  */}
      <div style={balanceBox}>
        <h2>Balance : ₹{balance}</h2>
        <p style={{color:"green"}}>Income : ₹{totalIncome}  </p>
        <p style={{color:"red"}}>Expense : ₹{totalExpense}  </p>
      </div>

{/* **************filter dropdown */}
<p style={{marginBottom:"5px"}}>Search Category</p>
<CategorySelect
  filterCategory={filterCategory}
  setFilterCategory={setFilterCategory}
  isfilter={true}
/>


{/* *****************UI  */}
      <h2>Transactions </h2>
      {filteredTransactions.map((t )=> (
        <div key={t._id} style={item}>   
        <div>      
          <p >{t.description}&nbsp;&nbsp;</p>
          <p style={{fontWeight:"bold"}}>{t.category}</p>
          </div>
          <div>
            {editingId === t._id? (
              <>
              <input
              type="number"
              value={editAmount}
              onChange={(e)=> setEditAmount(e.target.value)}
              style={{width:"60px",border:"none"}}
              />
              <button style={{backgroundColor:"#e9d6ea", color:"#6b166e", borderRadius:"6px", padding:"3px"}}
                onClick={()=>(updateTransaction(t._id))} >
                  Update</button>
              </>
            ) : (
              <>
              <p>₹{t.amount}</p>
               <button style={{backgroundColor:"#e9d6ea", color:"#6b166e", borderRadius:"6px", margin:"5px", padding:"3px 10px"}}
               onClick={()=>{startEdit(t)}} >
                Edit
               </button>
            
             <button style={{backgroundColor:"#e9d6ea", color:"#6b166e", borderRadius:"6px", padding:"3px"}} 
          onClick={() => deleteTransaction(t._id)}>Delete</button>
          </>)}
        </div>
        </div>
      ))}
    </div>
  );
}

const item = {
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  padding: "12px",
  borderBottom: "1px solid #ccc",
  border: "1px solid #eee",
  borderRadius: "8px",
  marginBottom: "10px",
};
const balanceBox ={              // using for both balance box and the edit transaction box
  marginBottom: "20px",
  padding: "15px",
  borderRadius: "10px",
  background: "#f5f5f5",
  textAlign: "center",
  marginLeft:"25px"
}

export default TransactionList;