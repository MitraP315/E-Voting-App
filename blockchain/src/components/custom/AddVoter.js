import React, { useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddVoter = () => {
    const name = useRef()
    const email = useRef()
    const handleSubmit = (e) => {
        e.preventDefault();
        const voterdata = {
            name: name.current.value,
            email: email.current.value
        }
        try {
            axios.post("http://localhost:8000/api/addVoter", voterdata);
            console.log("success")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container">
            <ul className="collection">
                <li className="collection-item avatar">
                    <h3>Add Voter</h3>
                </li>
            </ul>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={name} required />
                <label htmlFor="name">Username</label><br></br>
                <input type="password" ref={email} required />
                <label htmlFor="name">Password</label><br></br><br></br>
                <button className="btn blue darken-2" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>

    );
}
export default AddVoter