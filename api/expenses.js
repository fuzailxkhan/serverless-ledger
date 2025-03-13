import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now }, // Add date with default value
});

const Expense = mongoose.models.Expense || mongoose.model('Expense', expenseSchema);

export default async (req, res) => {
    try {
        if (!mongoose.connection.readyState) {
            await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        }

        if (req.method === 'GET') {
            const expenses = await Expense.find();
            return res.status(200).json(expenses);
        }

        if (req.method === 'POST') {
            const { name, price, category, date } = req.body;
            const newExpense = new Expense({ 
                name, 
                price, 
                category, 
                date: date || new Date() // Use provided date or fallback to today
            });
            await newExpense.save();
            return res.status(201).json(newExpense);
        }

        res.status(405).json({ message: 'Method Not Allowed' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
};
