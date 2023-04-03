import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  FormGroup,
  Label,
  Input,
  Button,
  UncontrolledPopover,
  PopoverHeader,
  Collapse
} from 'reactstrap';
import { cartItem } from '../utils/actions';

import { useStoreContext } from '../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../utils/actions';
import { idbPromise } from '../utils/helpers';


const CustomizeCard = ({ item, isOpen }) => {
  const [show, setShow] = useState(false);
  const [options, setOptions] = useState({
    size: '',
    milk: '',
    flavor: ''
  });

  const handleToggle = () => {
    setShow(!show);
  };

  const [state, dispatch] = useStoreContext();
  const { _id } = item;
  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)

    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        item: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
    console.log(itemInCart);
    console.log(cart);
    //wait for the cart to update and then reload the page
    setTimeout(function () { window.location.reload(); }, 1000);
  }

  const onChange = (e) => {
    setOptions({
      ...options,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <Card flexwrap="wrap" alignitems="center" justifycontent="center" style={{ maxWidth: '500px', margin: '10px' }}>
        <CardBody>
          {isOpen && (
            <div>
              <FormGroup>
                <Label for="sizeSelect">Select Size</Label>
                <Input type="select" name="size" id="sizeSelect" onChange={onChange}>
                  <option>Select</option>
                  <option>Small</option>
                  <option>Large (+$1.00)</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="milkSelect">Add Milk</Label>
                <Input type="select" name="milk" id="milkSelect" onChange={onChange}>
                  <option>Select</option>
                  <option>No Milk</option>
                  <option>2% Milk</option>
                  <option>Oat Milk</option>
                  <option>Almond Milk</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="flavorSelect">Add Flavor</Label>
                <Input type="select" name="flavor" id="flavorSelect" onChange={onChange}>
                  <option>Select</option>
                  <option>None</option>
                  <option>Sugar-Free Vanilla</option>
                  <option>Hazelnut</option>
                  <option>Caramel</option>
                  <option>Vanilla</option>
                </Input>
              </FormGroup>
              <Button
                id="PopoverFocus"
                type="button"
                py={3}
                px={2}
                mt={2}
                size="md"
                onClick={addToCart}
                style={{
                  borderRadius: '8px',
                  lineHeight: 1,
                }}
              >
                Add to Cart
              </Button>
            </div>
          )}
          <UncontrolledPopover trigger="focus" placement="bottom" target="PopoverFocus">
            <PopoverHeader>Item added to cart.</PopoverHeader>
          </UncontrolledPopover>
        </CardBody>
      </Card>
    </div>

  );
};



export default CustomizeCard;
