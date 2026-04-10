
import express from "express";
import Transaction from "../models/Transaction.js";


const router = express.Router();


//create  **********post
router.post("/", async(req, res)=>{
try{
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
}catch(err){
    res.status(500).json(err);
}
});

//read **********get

router.get("/", async(req, res)=>{
try{
   const data = await Transaction.find().sort({createdat : -1});
   res.json (data);
}catch(err){
res.status(500).json(err)
}
});

//delete

router.delete("/:id", async(req, res)=>{
try{
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({message:"Deleted"});
}catch(err){
res.status(500).json(err);
}
});
 export default router;

