import { useExpenses } from "../hooks/useExpenses";
import { AddExpenseBtn, AddExpensePopup, AllExpenseTable, ExpenseErrorComponent, LastWeekExpenseTable, LoadingExpenseDiv } from "./expenseComponents";
import "./expense.css"
import { useState } from "react";
import axios from "axios";

const Expense = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const { data, isLoading, isError, error} = useExpenses();

    const handleAddExpense = async (expense) => {
        setSubmitting(true);
        const user = localStorage.getItem('user');
        console.log(user);
        console.log(expense);

        try {
            await axios.post(`${import.meta.env.VITE_SERVER_HOST}/expense/createExpense`, {...expense}, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            })
            setSubmitting(false);
            setShowPopup(false);
            return true;
            // console.log("Expense Created");
        } catch (err) {
            setSubmitting(false);
            setShowPopup(false);
            window.alert("Error creating expense. Please try again");
            console.error("Error creating expense: ", err);
            return false;
        }
    }
    

    if (isLoading) return <LoadingExpenseDiv />;
    if (isError) return <ExpenseErrorComponent errorMessage={error.message}/>;
    if (!data || data.expenses.length === 0) 
        return (
        <div className="expense-viewer">
            <div>No expenses added</div>
            <AddExpenseBtn onAddClick={() => setShowPopup(true)}/>
        </div>);
    
    return (
        <>
            <div className="expense-viewer">
            <AddExpenseBtn onAddClick={() => setShowPopup(!showPopup)}/>
            <AddExpensePopup 
                onClose={() => setShowPopup(false)} 
                onSubmit={handleAddExpense}
                show={showPopup}
                submitting={submitting}
            />
            {/* {showPopup && (
            <AddExpensePopup onClose={() => setShowPopup(false)} onSubmit={handleAddExpense}/>
            )} */}
            <AllExpenseTable data={data}/>
            <LastWeekExpenseTable data={data}/>
            </div>
        </>
    )
}

export default Expense