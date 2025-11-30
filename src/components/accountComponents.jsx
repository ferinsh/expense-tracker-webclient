import { time } from "framer-motion";
import { useInsertionEffect, useState } from "react"
import { data, redirect } from "react-router";
import { useAuth } from "../provider/AuthProvider";
import { validateAccountEdit } from "../utils/validateAccountEdit";


const AccountDetails = () => {
    const [edit, setEdit] = useState(false)
    const [formErrors, setFormErrors] = useState({
        username: [],
        email: []
    });
    console.log("form errors: ", formErrors)

    const {user, setUser} = useAuth(); 
    const [editedUser, setEditedUser] = useState(user);


    function handleChange (e) {
        setEditedUser({
            ...editedUser,
            [e.target.name]: e.target.value
        })
    }

    async function handleAccept (e) {
        const {errors: dataErrors} = validateAccountEdit(editedUser)
        console.log("Errors: ", dataErrors)
        setFormErrors(dataErrors)
    
        e.target.disabled = true

        const controller = new AbortController();
        const timeout = setTimeout(() => {
            controller.abort();
            window.alert("Request Timed Out");
        }, 8000);

        const hasErrors = Object.values(dataErrors).some(arr => arr.length > 0);
        if(hasErrors) {
            console.log("cancelling")
            setEdit(false);
            clearTimeout(timeout);
            return false;
        }

        try {
            const token = localStorage.getItem("token");
            if(!token) {
                Navigate("/login");
            }
            console.log("Sending request")
            const res = await fetch(`${import.meta.env.VITE_SERVER_HOST}/account/updateProfile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(editedUser)
            })
            console.log(res);
            const data = await res.json();

            if(res.ok) {
                clearTimeout(timeout);
                window.alert("Profile Updated");
                setEdit(false);
                setUser(data.user || editedUser);

            } else {
                clearTimeout(timeout);
                window.alert ("Error: " + data.message);
            }
            setEdit(!edit);
        } catch (err) {
            clearTimeout(timeout);
            if (err.name === "AbortError") {
                alert("Request timed out. Please try again.");
            } else {
                alert("An error occurred: " + err.message);
            }
            console.error(err);
        }
        e.target.disabled = false;
        
        
    }

    return (
        <>
            <button id="account-edit" className="account-edit" onClick={() => setEdit(!edit)}>{!edit?"Edit":"Cancel"}</button>
            <div id="account-username" className="account-field">
                <label htmlFor="username">Username</label>
                <input 
                    type="text"
                    name = "username"
                    value={editedUser.username}
                    disabled = {!edit}
                    onChange={handleChange}
                />
            </div>
            {formErrors.username.map((errMsg, index) => {
                return <p key={index} className="form-error-p">{errMsg}</p>
            })}
            <div id="account-email" className="account-field">
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    value={editedUser.email}
                    disabled = {!edit}
                    onChange={handleChange}
                />
            </div>
            {formErrors.email.map((errMsg, index) => {
                return <p key={index} className="form-error-p">{errMsg}</p>
            })}
            {edit && <button id="account-accept" className="account-edit" onClick={handleAccept}>Accept</button>}
        </>
    )
}

export {AccountDetails}