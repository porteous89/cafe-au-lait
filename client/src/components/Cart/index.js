import React, { useEffect, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import CartItem from "../CartItem/CartItem";
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import "./style.css";

// stripePromise returns a promise with the stripe object as soon as the Stripe package loads
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = () => {
  console.log("Cart component rendered");
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  // We check to see if there is a data object that exists, if so this means that a checkout session was returned from the backend
  // Then we should redirect to the checkout with a reference to our session id
  // useEffect(() => {
  //   if (data) {
  //     stripePromise.then((res) => {
  //       res.redirectToCheckout({ sessionId: data.checkout.session });
  //     });
  //   }
  // }, [data]);
  const cart = useMemo(() => state.cart, [state.cart]);
  // If the cart's length or if the dispatch function is updated, check to see if the cart is empty.
  // If so, invoke the getCart method and populate the cart with the existing from the session
  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      console.log("cart", cart);
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      console.log("got hre", state.cart.length);
      getCart();
    }

    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += (item.price * item.purchaseQuantity) / 2;
    });
    return sum.toFixed(2);
  }

  // When the submit checkout method is invoked, loop through each item in the cart
  // Add each item id to the productIds array and then invoke the getCheckout query passing an object containing the id for all our products
  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }
  const hasDuplicates =
    state.cart.filter((item, index) => {
      return state.cart.some((otherItem, otherIndex) => {
        return otherIndex > index && otherItem._id === item._id;
      });
    }).length > 0;

  console.log(hasDuplicates);

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart
            .filter(
              (item, index, self) =>
                index ===
                self.findIndex((otherItem) => otherItem._id === item._id)
            )
            .map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {/* Check to see if the user is logged in. If so render a button to check out */}
            {Auth.loggedIn() ? (
              // <button onClick={submitCheckout}>Checkout</button>
              <a
                className="ms-2 btn btn-primary"
                href="https://buy.stripe.com/test_14k4hF73R6UeaiI4gm"
              >
                Checkout
              </a>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;
