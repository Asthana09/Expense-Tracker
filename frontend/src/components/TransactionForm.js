import { useState } from "react"; // it allows your component to remember data(state)
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
const [type, setType] = useState("expense");
const [description, setDescripton] = useState("");
const [filterCategory, setFilterCategory] = useState("");
const [recurring, setRecurring]= useState(false);


const handleSubmit = async ()=>{

    //validation
     if(!amount || !description || !filterCategory){
        alert("Please add amount , category and description");
        return;
     }
                 
    const data = {
        amount,
        type,
        description,
        category: filterCategory,
        date,
        recurring,
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
    <TypeSelector type={type} setType={setType}/>
    <DescriptionInput description={description} setDescription={setDescripton}/>
    <CategorySelect category={filterCategory} setFilterCategory={setFilterCategory} />
    <RecurringToggle recurring={recurring} setRecurring={setRecurring}/>
    <SubmitButton handleSubmit={handleSubmit}></SubmitButton>
                
    </div>
 );
}
export default TransactionForm;
