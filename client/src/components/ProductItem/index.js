import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import CustomizeCard from "../CustomizeCard";
import Button from "react-bootstrap/Button";

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();
  const [showCustomiseForm, setShowCustomiseForm] = useState(false);

  const toggleCustomiseForm = () => setShowCustomiseForm(!showCustomiseForm);

  const { image, name, _id, description, price, quantity } = item;

  const { cart } = state;

  useEffect(() => {
    console.log("State", cart);
  });

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <section className="features-boxed">
      <div className="container">
        <div className="intro">
          <h2 className="text-center">{name} </h2>
          {/* <p className="text-center">{desc} </p> */}
        </div>
        <div className="row justify-content-center features"></div>
        <div className="card px-1 py-1">
          <Link to={`/products/${_id}`}></Link>
          <img src={`/images/${image}`} alt={name} />
          <p>{description}</p>
          <div>

            <div>
              {quantity} {pluralize("item", quantity)} in stock
            </div>

            <span>${price}</span>
          </div>

          <Button
            onClick={toggleCustomiseForm}
            borderRadius="8px"
            py={3}
            px={2}
            mt={4}
            lineHeight={1}
            size="md"
          >
            Customize
          </Button>
          {showCustomiseForm && (
            <CustomizeCard isOpen={showCustomiseForm} item={item} />
          )}
          {!showCustomiseForm && (
            <button onClick={addToCart}>Add to cart</button>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductItem;
