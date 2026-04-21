
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
router.post("/recurring", async (req, res) => {
  try {
    const { amount, type, description, category, date, recurring, frequency } = req.body;

    const amt = Number(amount);

    // get all transactions
    const transactions = await Transaction.find();

    const totalIncome = transactions
      .filter(t => t.type === "income")
      .reduce((acc, t) => acc + Number(t.amount), 0);

    const totalExpense = transactions
      .filter(t => t.type === "expense" || t.type === "investment")
      .reduce((acc, t) => acc + Number(t.amount), 0);

    let balance = totalIncome - totalExpense;

    // =========================
    // NON-RECURRING
    // =========================
    if (!recurring) {

      if ((type === "expense" || type === "investment") && amt > balance) {
        return res.json({ message: "Insufficient Balance" });
      }

      await Transaction.create(req.body);

      return res.json({ message: "Transaction Added" });
    }

    // =========================
    // RECURRING LOGIC
    // =========================

    const today = new Date();
    const selected = new Date(date);

    today.setHours(0,0,0,0);
    selected.setHours(0,0,0,0);

    const diffTime = today - selected;
    let daysDifference = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (daysDifference < 0) daysDifference = 0;

    let occurrenceCount = 0;

    if (frequency === "daily") {
      occurrenceCount = daysDifference;
    }

    if (frequency === "weekly") {
      occurrenceCount = Math.floor(daysDifference / 7);
    }

    if (frequency === "monthly") {
      const months =
        (today.getFullYear() - selected.getFullYear()) * 12 +
        (today.getMonth() - selected.getMonth());
      occurrenceCount = months;
    }

    let countAdded = 0;

    for (let i = 0; i < occurrenceCount; i++) {

      if (balance < amt) break;

      const newDate = new Date(selected);

      if (frequency === "daily") {
        newDate.setDate(selected.getDate() + i);
      }

      if (frequency === "weekly") {
        newDate.setDate(selected.getDate() + i * 7);
      }

      if (frequency === "monthly") {
        newDate.setMonth(selected.getMonth() + i);
      }

      await Transaction.create({
        amount,
        type,
        description,
        category,
        date: newDate,
        recurring,
        frequency
      });

      balance -= amt;
      countAdded++;
    }

    // =========================
    // RESPONSE
    // =========================

    if (countAdded === 0) {
      return res.json({ message: "Insufficient Balance" });
    }

    if (countAdded < occurrenceCount) {
      return res.json({
        message: `Only ${countAdded} transactions added due to low balance`
      });
    }

    return res.json({ message: "Recurring transactions added" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// read **********get

router.get("/", async (req, res) => {
  try {
    const data = await Transaction.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
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

