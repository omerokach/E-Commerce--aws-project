import React, { useState, useEffect } from "react";
import { Card, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { useDB } from "../context/DBContext";

function Product({ item }) {
  const [amount, setAmount] = useState(1);
  const { setBasket, basket } = useDB();
  const quantityHandler = (amount) => {
    setAmount(amount);
  };
  const addHandler = (e) => {
    e.preventDefault();
    const product = {
        name: item.name,
        amount: amount,
        price: item.price
    }
    setBasket(prev => [...prev, product])
  };


  return (
    <>
      <Card border="primary" style={{ width: "18rem" }}>
        <Card.Header className="price">
          {item.price}$
          <Button onClick={addHandler} className="add-to-cart">
            Add to cart
          </Button>
        </Card.Header>
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <div>
            <span>quantity: </span>
            <DropdownButton
              variant="outline-secondary"
              title={amount}
              id="input-group-dropdown-1"
              style={{ display: "inline" }}
            >
              <Dropdown.Item onClick={() => quantityHandler(1)} href="#">
                1
              </Dropdown.Item>
              <Dropdown.Item onClick={() => quantityHandler(2)} href="#">
                2
              </Dropdown.Item>
              <Dropdown.Item onClick={() => quantityHandler(3)} href="#">
                3
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default Product;
