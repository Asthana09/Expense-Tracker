import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";


function TransactionPage(){
return(
    //       need styling 
    <div 
    style={container}>
        <h1 style={{textAlign:"center", color:"#6b166e"}}>Expense Tracker</h1>
        <TransactionForm/>
        <TransactionList/>
    </div>
);
}

const container={
    //  maxWidth:"50px",
    maxWidth:"500px",
    display:"flex",
     margin:"40px auto",
     display : "flex",
     flexDirection:"column",
     gap:"30px",
    
};

export default TransactionPage;
