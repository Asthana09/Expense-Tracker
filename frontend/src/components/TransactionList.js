import { useEffect, useState } from "react";   //use effect 
import axios from "axios";       // use to call backend API form frontend     

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, seteditingTransaction] = useState(null);

  useEffect(() => {        // when component loads, run fetch data
    fetchData();
  }, []); // run only when component loads(not again and again)

  const fetchData = () => {
    axios.get("http://localhost:5000/api/transactions")
      .then(res => setTransactions(res.data));
  };


  const deleteTransaction = async (id) => {
    await axios.delete(`http://localhost:5000/api/transactions/${id}`);
    fetchData();
  };

  // **************Edit
   const startEdit =(transaction)=>{
    seteditingTransaction(transaction);       //store transaction in state // fill edit form with existing data
   };
   //******handle Changes */
   const handleChnages =(e)=>{              //function runs when user type in input
    const {name, value} =e.target;          //get name-> name of feild, value is input 
    seteditingTransaction(prev=>({    //updating state  using previous value 
      ...prev,                  //copy all existing fields
      [name]:value              //update only the feild user changed
    })
    );
   };
  //  ***********update
  const updateTransaction = async ()=>{            //this will run when user clicks update button
    if(!editingTransaction) return;              //if no transaction selected stop running
    try{
      const updateData ={                              
        description: editingTransaction.description, //sending data to backend
        amount: Number(editingTransaction.amount),
      }
      await axios.put(`http://localhost:5000/api/transactions/${editingTransaction._id}`,updateData
      );
          alert("Transaction updated successfully");  // 

 fetchData();

    // reset form
    seteditingTransaction({
      description: "",
      amount: ""
    });

  } catch (err) {
    console.log(err);
  }
};
  
  

  // //***************Balance
   const totalIncome = transactions
   .filter(t=> t.type?.toLowerCase() === "income")
   .reduce((acc, t)=> acc + Number(t.amount), 0);


   const totalExpense = transactions
   .filter(t => t.type?.toLowerCase() === "expense")
   .reduce((acc, t)=> acc + Number(t.amount), 0);

   const balance = totalIncome - totalExpense;


  return (
    <div style={{ width: "100%", color:"#6b166e" }}>



      {/* {/* Balance  */}
      <div style={balanceBox}>
        <h2>Balance : ₹{balance}</h2>
        <p style={{color:"green"}}>Income : ₹{totalIncome}  </p>
        <p style={{color:"red"}}>Expense : ₹{totalExpense}  </p>
      </div>


{/* ****************Edit  */}
     
       
  <div style={balanceBox}>

    <h2>Edit Transaction</h2>
    <input style={{borderRadius:"6px" , width:"80px", textAlign:"center",color:"#6b166e",marginRight:"5px", padding:"3px"}}
      name="description"          
      value={editingTransaction?.description || ""}  //show value form state or null
      onChange={handleChnages}
      placeholder="Description"
    />
    <input  style={{borderRadius:"6px" , width:"60px", textAlign:"center",color:"#6b166e",padding:"3px" }}
      type="number"
      name="amount"
      value={editingTransaction?.amount || ""}
      onChange={handleChnages}
      placeholder="Amount"
    />
    <br />
    <button style={{backgroundColor:"#e9d6ea", color:"#6b166e", borderRadius:"6px",margin:"10px", padding:"5px"}}
    onClick={updateTransaction}>
      Update
    </button>
  </div>
      
      <h2>Transactions</h2>

      {transactions.map(t => (
        <div key={t._id} style={item}>   
        <div>      
          <p>{t.description}&nbsp;&nbsp;</p>
          <small>{t.category}</small>
          </div>
          <div>
          <p>₹{t.amount}</p>
          <button style={{backgroundColor:"#e9d6ea", color:"#6b166e", borderRadius:"6px",marginRight:"4px", padding:"3px 10px"}} 
              onClick={() => startEdit(t)}>Edit</button>
             <button style={{backgroundColor:"#e9d6ea", color:"#6b166e", borderRadius:"6px", padding:"3px"}} 
          onClick={() => deleteTransaction(t._id)}>Delete</button>
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