
import express from "express";
import Transaction from "../models/Transaction.js";


const router = express.Router();


//update  ************* put
router.put("/:id", async (req, res) => {
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedTransaction);

    } catch (err) {
        res.status(500).json(err);
    }
});


        //create  **********post
        router.post("/", async (req, res) => {
            try {
                //reccuring date
                const data = {
                    ...req.body,
        date: req.body.date ? new Date(req.body.date) : new Date(),
        lastGenerated: req.body.recurring ? new Date(req.body.date) : null,
        frequency: req.body.recurring ? req.body.frequency : null
            };
                //transaction
                const transaction = new Transaction(data);
                await transaction.save();
                res.status(201).json(transaction);
            } catch (err) {
                res.status(500).json(err);
            }
        });

       // read **********get

        router.get("/", async (req, res) => {
            try {
        //    Recurring 
        const recurringTransactions = await Transaction.find({ recurring: true });


        const today = new Date();    //today's date
        today.setHours(0, 0, 0, 0); // removing time  

        for (let t of recurringTransactions) { // go one by one through all transaction where recurring=true
           
           let lastDate = new Date(t.lastGenerated || t.date);
            let nextDate = new Date(lastDate);  //copying last date

            //! nextDate.setMonth(nextDate.getMonth()+1);

            if (t.frequency === "daily") {
                nextDate.setDate(nextDate.getDate() + 1);
            }else if(t.frequency === "weekly"){
              nextDate.setDate(nextDate.getDate()+7);
            } else if (t.frequency === "monthly") {
                nextDate.setMonth(nextDate.getMonth() + 1);
            }else{
              continue;
            }

            // if(nextDate <= new Date()){
            //     const {_id, ...rest}= t._doc;
            //     await Transaction.create({
            //       ...rest,
            //        date: nextDate
            //     });
            //      t.lastGenerated = nextDate;
            //     await t.save();
              


            while (nextDate <= today) {
              const obj = t.toObject();
                delete obj._id;
                await Transaction.create({
                    ...obj,
                    date: new Date(nextDate),
                    recurring: false // 
                });

                t.lastGenerated = new Date(nextDate);
                await t.save();

                // move to next cycle
                if (t.frequency === "daily") {
                    nextDate.setDate(nextDate.getDate() + 1);
                } else if(t.frequency === "weekly"){
                  nextDate.setDate(nextDate.getDate()+7);
                }
                else {
                    nextDate.setMonth(nextDate.getMonth() + 1);
                }
            }

        }

       const data = await Transaction.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json(err)
    }
});

//delete

router.delete("/:id", async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});
export default router;

