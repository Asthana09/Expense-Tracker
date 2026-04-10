import mongoose from "mongoose"; //

const transactionSchema = new mongoose.Schema({
    amount: Number,
    type:String,
    date:Date,
    description: String,
    category: String,
    recurring: Boolean 
},{timestamps:true});  // automatically adds the time or updatedat createdat
 const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;


//model - is a tool let us contact with the database(Mongo DB)