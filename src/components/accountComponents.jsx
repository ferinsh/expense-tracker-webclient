import { time } from "framer-motion";
import { useInsertionEffect, useState } from "react"
import { redirect } from "react-router";
import { useAuth } from "../provider/AuthProvider";


const AccountDetails = (props) => {
    // const {user} = props
    const {user, setUser} = useAuth(); 
    const [editedUser, setEditedUser] = useState(user);

    const [edit, setEdit] = useState(false)

    function handleChange (e) {
        // console.log(e.target.name)
        // console.log(e.target.value)
        setEditedUser({
            ...editedUser,
            [e.target.name]: e.target.value
        })
    }

    async function handleAccept (e) {
        // console.log("start")
        e.target.disabled = true

        const controller = new AbortController();
        const timeout = setTimeout(() => {
            controller.abort();
            window.alert("Request Timed Out");
        }, 8000);

        try {
            // console.log("Checking token");
            const token = localStorage.getItem("token");
            if(!token) {
                Navigate("/login");
            }
            // console.log("Sending request")
            const res = await fetch(`${import.meta.env.VITE_SERVER_HOST}/account/updateProfile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(editedUser)
            })
            // console.log("Response: ", res);
            const data = await res.json();
            // console.log(data);

            // console.log("done")
            if(res.ok) {
                window.alert("Profile Updated");
                setEdit(false);
                setUser(data.user || editedUser);

            } else {
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
            {edit && <button id="account-accept" className="account-edit" onClick={handleAccept}>Accept</button>}
        </>
    )
}

export {AccountDetails}