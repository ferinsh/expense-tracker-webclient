import { useExpenses } from "../hooks/useExpenses";
import { AddExpenseBtn, AddExpensePopup, AllExpenseTable, LastWeekExpenseTable } from "./expenseComponents";
import "./expense.css"
import { useState } from "react";
import axios from "axios";

const Expense = () => {
    const [showPopup, setShowPopup] = useState(false);
    const { data, isLoading, isError, error} = useExpenses();

    const handleAddExpense = async (expense) => {
        const user = localStorage.getItem('user');
        console.log(user);
        console.log(expense);

        try {
            await axios.post(`${import.meta.env.VITE_SERVER_HOST}/expense/createExpense`, {...expense}, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            })
            console.log("Expense Created");
        } catch (err) {
            console.error("Error creating expense: ", err);
        }
        // console.log("Adding new expense: ", expense);
    }
    
    if (isLoading) return <div>Loading expenses...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    if (!data || data.expenses.length === 0) 
        return (
        <div className="expense-viewer">
            <div>No expenses added</div>
            <AddExpenseBtn onAddClick={() => setShowPopup(true)}/>
        </div>);
    
    return (
        <>
            <div className="expense-viewer">
            <AddExpenseBtn onAddClick={() => setShowPopup(true)}/>
            {showPopup && (
            <AddExpensePopup onClose={() => setShowPopup(false)} onSubmit={handleAddExpense}/>
            )}
            <AllExpenseTable data={data}/>
            <LastWeekExpenseTable data={data}/>
            </div>
        </>
    )
}

export default Expense