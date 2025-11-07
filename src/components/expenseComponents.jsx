import axios from "axios"
import { useEffect, useState } from "react"

export const AddExpenseBtn = ({onAddClick}) => {

    return <button className="add-expense-btn" onClick={onAddClick}>Add Expense</button>
}

export const AddExpensePopup = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        category_id: "",
        amount: "",
        description: "",
        date: "",
    })
    const [categories, setCategories] = useState([]);
    console.log(categories);

    useEffect (() => {
        const fetchcategories = async () => {
            try {
            const rows = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/categories/read-all`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            })
            // console.log(rows);
            setCategories(rows.data.categories);
            } catch (err) {
                console.error("Error retrieving categories: ", err);
            }
        }
        fetchcategories();
        
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(e.target.name, ": ", e.target.value);
        console.log(formData);
    }

    const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose(); // close popup after submission
  };

    return (
        <>
            <div className="add-expense-popup">
                <div className="add-expense-controls">
                    <h2>Add New Expense</h2>
                    <button onClick={onClose}>x</button>
                </div>
                <form onSubmit={handleSubmit} className="add-expense-form">
                    <div className="adde-form-categ-amt">
                        <div>
                            <label >Category</label>
                            {/* <input type="number" name="category_id" value={formData.category_id} onChange={handleChange} required /> */}
                            <select name="category_id" onChange={handleChange} value={formData.category_id} required>
                                <option value={0}>none</option>
                                {categories.map((category) => {
                                    return <option value={category.id}>{category.name}</option>
                                })}
                            </select>
                        </div>
                        <div>
                            <label >Amount</label>
                            <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
                        </div>

                    </div>
                    <div className="adde-form-desc">
                        <label >Description</label>
                        <input type="text" name="description" value={formData.description} onChange={handleChange} required />
                    </div>
                    <div className="adde-form-date">
                        <label >Date</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                    </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                        >
                            Add Expense
                        </button>
                </form>
            </div>
        </>
    )
}

export const AllExpenseTable = (props) => {
    const {data} = props;

    return (
        <>
            <h3>All Expenses</h3>
            <table >
                <thead >
                <tr>
                    <th >#</th>
                    <th >Category</th>
                    <th >Description</th>
                    <th >Amount (₹)</th>
                    <th >Date</th>
                </tr>
                </thead>
                <tbody>
                {data.expenses.map((expense, index) => (
                    <tr key={expense.id || index}>
                    <td >{index + 1}</td>
                    <td >{expense.category || "N/A"}</td>
                    <td >{expense.description || "-"}</td>
                    <td >{expense.amount}</td>
                    <td >{expense.date ? new Date(expense.date).toLocaleDateString() : "-"}</td>
                    </tr>
                ))}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>More</td>
                </tr>
                </tbody>
                <p>Total Expense: {data.totalAmount} Rs</p>
            </table>
        </>
    )
}

export const LastWeekExpenseTable = (props) => {
    const {data} = props

    return (
        <>
            <h3>Latest Expenses</h3>
            <table >
                <thead >
                <tr>
                    <th >#</th>
                    <th >Category</th>
                    <th >Description</th>
                    <th >Amount (₹)</th>
                    <th >Date</th>
                </tr>
                </thead>
                <tbody>
                {data.expenses.map((expense, index) => (
                    <tr key={expense.id || index} className="hover:bg-gray-50">
                    <td >{index + 1}</td>
                    <td >{expense.category || "N/A"}</td>
                    <td >{expense.description || "-"}</td>
                    <td >{expense.amount}</td>
                    <td >{expense.date ? new Date(expense.date).toLocaleDateString() : "-"}</td>
                    </tr>
                ))}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>More</td>
                </tr>
                </tbody>
                <p>Total Expense: {data.totalAmount} Rs</p>
            </table>
        </>
    )
}