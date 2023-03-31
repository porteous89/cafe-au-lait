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

  const addToCart = () => {
    // Add item to cart with selected options
    console.log('Added to cart:', { ...item, options });
    setShow(false);
  };

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
                  <option>Regular</option>
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
              <Button id="PopoverFocus" type="button" borderRadius="8px" py={3} px={2} mt={2} lineHeight={1} size="md" onClick={addToCart}>
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
