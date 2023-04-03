import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import "../pages/signup.css"

function Signup(props) {
    const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                firstName: formState.firstName,
                lastName: formState.lastName,
                email: formState.email,
                password: formState.password
            }
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (
        <div className="container">
            <Link to="/login">LOGIN HERE</Link>
            <h2>Signup</h2>
            <form className='auth-form' onSubmit={handleFormSubmit}>
                <div className="my-2">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        placeholder="First Name"
                        name="firstName"
                        type="text"
                        id="firstName"
                        onChange={handleChange}
                    />
                </div>
                <div className="my-2">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        placeholder="Last Name"
                        name="lastName"
                        type="text"
                        id="lastName"
                        onChange={handleChange}
                    />
                </div>
                <div className="my-2">
                    <label htmlFor="email">Email:</label>
                    <input
                        placeholder="email@email.com"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="my-2">
                    <label htmlFor="pwd">Password:</label>
                    <input
                        placeholder="min 8 characters"
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row flex-end">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>

    );
}

export default Signup;

