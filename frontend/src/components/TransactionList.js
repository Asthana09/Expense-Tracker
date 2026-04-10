import { useEffect, useState } from "react";   //use effect 
import axios from "axios";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {        // when component loads, run fetch data
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("http://localhost:5000/api/transactions")
      .then(res => setTransactions(res.data));
  };

  const deleteTransaction = async (id) => {
    await axios.delete(`http://localhost:5000/api/transactions/${id}`);
    fetchData();
  };

  return (
    <div style={{ width: "100%", color:"#6b166e" }}>
      <h3>Transactions</h3>

      {transactions.map(t => (
        <div key={t._id} style={item}>   
        <div>      
          <p>{t.description}&nbsp;&nbsp;</p>
          <small>{t.category}</small>
          </div>
          <div>
          <p>₹{t.amount}</p>
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

export default TransactionList;