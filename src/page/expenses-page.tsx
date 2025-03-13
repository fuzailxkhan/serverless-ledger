import { useEffect, useState } from "react";
import "./expenses-page.css"; 
import axios from "axios";

type expense = {
    name:string,
    price:string,
    category:string,
    date:string
}

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState<expense[]>([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Necessity');
    const [date, setDate] = useState('');

    // Fetch expenses on component mount
    const fetchExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/expenses');
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    // Add a new expense
    const addExpense = async () => {
        try {
            const newExpense = { name, price, category, date: date || new Date() };
            await axios.post('http://localhost:3000/api/expenses', newExpense);
            fetchExpenses(); // Refresh the list
            setName('');
            setPrice('');
            setCategory('Necessity');
            setDate('');
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

  return (
    <div className="expense-container">
      <h2>Expense Tracker</h2>
      
      <div className="expense-form">
        <div className="expense-form-subdiv">
            <div className="expense-form-subdiv-input">
                <input 
                placeholder="Expense Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                />
                <input 
                placeholder="Price" 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <div className="expense-form-subdiv-input">
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option>Necessity</option>
                    <option>Luxury</option>
                    <option>One Time</option>
                </select>
                <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                />
            </div>
        </div>
        
        <button onClick={addExpense}>Add</button>
      </div>

      <h3>Your Expenses</h3>
      {expenses.length > 0 ? (
        <table className="expense-table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{exp.name}</td>
                <td>{exp.price}</td>
                <td>{exp.category}</td>
                <td>{new Date(exp.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-expenses">No expenses recorded yet.</p>
      )}
    </div>
  );
};

export default ExpenseTracker;
