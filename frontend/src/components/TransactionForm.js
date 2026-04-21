import { useState, useEffect } from "react"; // it allows your component to remember data(state)
import axios from "axios";

import AmountDisplay from "./AmountDisplay";  //importing child components
import DatePicker from "./DatePicker";
import TypeSelector from "./TypeSelector";
import CategorySelect from "./CategorySelect.js";
import DescriptionInput from "./DescriptionInput";
import RecurringToggle from "./RecurringToggle";
import SubmitButton from "./SubmitButton";


function TransactionForm(){
const [amount, setAmount] = useState("");
const [date, setDate] = useState("");
const [type, setType] = useState("income");
const [description, setDescripton] = useState("");
const [filterCategory, setFilterCategory] = useState("");
const [recurring, setRecurring]= useState(false);
const [transactions, setTransactions] = useState([]);
const [frequency, setFrequency] = useState("monthly");




useEffect(()=>{
    axios.get("http://localhost:5000/api/transactions")
    .then(res=> setTransactions(res.data));
},[]);



// balance calculation
       const totalIncome = transactions
      .filter(t=> t.type ==="income")
      .reduce((acc,t)=> acc+Number(t.amount),0);

      const totalExpense = transactions
      .filter(t=> t.type === "expense" || t.type === "investment")
      .reduce((acc, t) => acc + Number(t.amount),0);

      const balance = totalIncome - totalExpense;



const handleSubmit = async ()=>{

    //validation
     if(!amount || !description ||(type !=="income" && !filterCategory) ){
        alert("Please add amount , category and description");
        return;
     }
    //  balance check
     if((type === "expense" || type === "investment") && Number(amount)>balance){
        alert("Insufficient Balance");
        return;
     }
                 
    const data = {
        amount,
        type,
        description,
        category: type ==="income"? "Income" : filterCategory,
        date,
        recurring,
        frequency: recurring ? frequency : null 
    };
    try{
        await axios.post ("http://localhost:5000/api/transactions", data);
        alert("Transaction Added");
        window.location.reload();

    }catch(err){
        console.log(err);
    }
    
};

 return(
    <div 
    
    >
    {/* <h3 style={{textAlign: "center"}}> New Transaction </h3> */}
    <AmountDisplay amount={amount} setAmount={setAmount}></AmountDisplay>
    <DatePicker date={date} setDate={setDate}/>
    <TypeSelector type={type} setType={setType} balance={balance}/>
    <DescriptionInput description={description} setDescription={setDescripton}/>
    <CategorySelect filterCategory={filterCategory} setFilterCategory={setFilterCategory} type={type} />
    {type !=="income" && (
    <RecurringToggle recurring={recurring} setRecurring={setRecurring}/>)}
       {recurring && (             // && = only show THis ui if recurring is true
        <div style={{marginTop: "10px", color:"#6b166e"}}>
            <label>Select Frequency :</label>

            <select 
            value={frequency}
            onChange={(e)=> setFrequency(e.target.value)}
            style={{ borderRadius:"5px", 
                justifyContent: "space-between", 
                marginTop: "10px", 
                marginLeft:"5px",
                color:"#6b166e",
                backgroundColor:"#fbebfb",
                padding:"2px",

            }}>  
                <option value="daily">Daily</option>            
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>
        </div>
       )}
    <SubmitButton handleSubmit={handleSubmit}></SubmitButton>
                
    </div>
 );
}
export default TransactionForm;
