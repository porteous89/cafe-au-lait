import React from 'react';
import { Link } from 'react-router-dom';
import { useStoreContext } from '../utils/GlobalState';
import Auth from '../utils/auth';
import { UPDATE_USER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { useMutation } from '@apollo/client';
import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from 'react';

//create a user profile page


function Profile() {
    const [state, dispatch] = useStoreContext();
    const { loading, data } = useQuery(QUERY_USER);
    const userData = data?.user || {};
    const [updateUser] = useMutation(UPDATE_USER);
    const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '', orders: '' });
    const { firstName, lastName, email, password, orders } = formState;
    const [showAlert, setShowAlert] = useState(false);

    // create function that accepts the form's input as an argument and then updates the user's information
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const mutationResponse = await updateUser({
            variables: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                orders: orders
            }
        });
        const token = mutationResponse.data.updateUser.token;
        Auth.login(token);
    }

    // create function to change form's state
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    // create function to set form's state to user's current information
    const handleEditClick = () => {
        setFormState({
            firstName: userData.firstName,
            lastName: userData.lastName
            
        });
    };

    // if data isn't here yet, say so
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container my-1">
            <Link to="/">
                ← Back to Main Page
            </Link>

            <h2>Profile*{userData.orders.length}*</h2>
            <p>First Name: {userData.firstName}</p>
            <p>Last Name: {userData.lastName}</p>
            <p>Email: {userData.email}</p>
            <p>{userData.orders[0].purchaseDate}</p>
            <p>{userData.orders[0].products.length}</p>
            <p>{userData.orders[0].products[0].name}</p>
            <ul>
            {userData.orders.map (order => {
                <li key={order._id}>

                {/* <p>Past Orders {order.purchaseDate}</p> */}
                <p>Past Orders {order._id}</p>
                </li>
            })}
            </ul>
            <button onClick={handleEditClick}>Edit</button>

            {showAlert && (
                <div className="alert alert-success" role="alert">
                    Profile updated successfully!
                </div>
            )}

            <form onSubmit={handleFormSubmit}>
                <div className="flex-row space-between my-2">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        placeholder="First Name"
                        name="firstName"
                        type="firstName"
                        id="firstName"
                        onChange={handleChange}
                        value={firstName}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        placeholder="Last Name"
                        name="lastName"
                        type="lastName"
                        id="lastName"
                        onChange={handleChange}
                        value={lastName}
                    />
                </div>
               
                <div className="flex-row flex-end">
                    <button type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Profile;



