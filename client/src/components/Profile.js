import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import Auth from "../utils/auth";
import { UPDATE_USER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { useMutation } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect } from "react";

//create a user profile page

function Profile() {
  const [state, dispatch] = useStoreContext();
  const { loading, data } = useQuery(QUERY_USER);
  const userData = data?.user || {};
  const [updateUser] = useMutation(UPDATE_USER);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    orders: "",
  });
  let { firstName, lastName, email, password, orders } = formState;
  const [showAlert, setShowAlert] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  //     useEffect(() => {
  //     if (Object.keys(userData).length > 0) {
  //       setFormState({
  //         firstName: userData.firstName || "",
  //         lastName: userData.lastName || "",
  //         email: userData.email || "",
  //         password: userData.password || "",
  //       });
  //     }
  //   }, [userData]);

  // create function that accepts the form's input as an argument and then updates the user's information
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const mutationResponse = await updateUser({
      variables: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        orders: orders,
      },
    });

    //firstName = mutationResponse.data.updateUser.firstName;
    //lastName = mutationResponse.data.updateUser.lastName;
    //email = mutationResponse.data.updateUser.email;
    // const token = mutationResponse.data.updateUser.token;
    // Auth.login(token);
  };

  // create function to change form's state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // create function to set form's state to user's current information
  const handleEditClick = () => {
    setFormState({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
    });
    setShowEdit(!showEdit);
  };

  // if data isn't here yet, say so
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-4">
      <div className="d-flex align-items-center justify-content-between">
        <Link to="/">← Back to Main Page</Link>
        <button
          className={`btn btn-small ${
            showEdit ? "btn-secondary" : "btn-primary"
          }`}
          onClick={handleEditClick}
        >
          {showEdit ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* <h2>Profile</h2>
            <p>First Name: {userData.firstName}</p>
            <p>Last Name: {userData.lastName}</p>
            <p>Email: {userData.email}</p> */}
      {/* <p>{userData.orders[0].purchaseDate}</p>
            
            <p>{userData.orders[0].products[0].name}</p>
            <ul>
            {userData.orders.map (order => {
                <li key={order._id}>

                <p>Past Orders {order.purchaseDate}</p>
                <p>Past Orders {order._id}</p>
                </li>
            })}
            </ul> */}

      <div className="profile-page">
        <div className="img-wrap">
          <img src="https://i.pravatar.cc/300" alt="" />
        </div>
        <div className="profile-details">
          <p>First Name: {userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <p>Email: {userData.email}</p>
          {userData.orders && userData.orders.length > 0 && (
            <>
              <p>{userData.orders[0].purchaseDate}</p>
              <p>{userData.orders[0].products[0]?.name}</p>
            </>
          )}
        </div>
      </div>

      {showAlert && (
        <div className="alert alert-success" role="alert">
          Profile updated successfully!
        </div>
      )}

      {showEdit && (
        <form onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2">
            <label htmlFor="firstName">First Name:</label>
            <input
              placeholder="First Name"
              name="firstName"
              type="text"
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
              type="text"
              id="lastName"
              onChange={handleChange}
              value={lastName}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="lastName">Email:</label>
            <input
              placeholder="Email"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
              value={email}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="lastName">Password:</label>
            <input
              placeholder="Password"
              name="password"
              type="text"
              id="password"
              onChange={handleChange}
              value={password}
            />
          </div>

          <div className="flex-row flex-end">
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Profile;
