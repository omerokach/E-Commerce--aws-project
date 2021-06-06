import React, { useState, useEffect } from "react";
import { Button, Form, Col, Table } from "react-bootstrap";
import { useHistory } from "react-router";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useDB } from "../context/DBContext";

function Basket(props) {
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const { currentUser, logout } = useAuth();
  const { basket, setBasket, getUserFromStore } = useDB();
  const history = useHistory();
  const [totalPay, setTotalPay] = useState();
  const [validated, setValidated] = useState(false);

  const getUser = async () => {
    const userFromStore = await getUserFromStore(currentUser.email);
    userFromStore.forEach((user) => setUser(user.data()));
  };
  useEffect(async () => {
    getUser();
    let sum = 0;
    basket.forEach((item) => {
      sum += item.price * item.amount;
    });
    setTotalPay(sum);
  }, []);
  const handleLogOut = async () => {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      setError("Failed to log out");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (basket.length === 0) {
      setError("Basket can not be empty");
    } else {
        setBasket([]);
        setTotalPay(0);
        const objToPost = {
            full_name: user.name,
            adress: user.adress,
            phone_number: user.phone_number,
            email: user.email_adress,
            total_price: totalPay+'$'
        }
      const res = await axios.post("http://localhost:8080/api/purchase", objToPost);
      console.log(res);
    }
    setValidated(true);
  };

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button className="navigate" onClick={() => history.push("/shop")}>
          Shop
        </Button>
        <Button className="logout-button navigate" onClick={handleLogOut}>
          Log Out
        </Button>
        <Button
          className="logout-button navigate"
          onClick={() => setBasket([])}
        >
          Clean basket
        </Button>
      </header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              defaultValue={user.name}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Adress</Form.Label>
            <Form.Control
              type="text"
              placeholder="Adress"
              defaultValue={user.adress}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom04">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="email"
              defaultValue={user.email_adress}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom05">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone number"
              defaultValue={user.phone_number}
              required
            />
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Check
            required
            label="Just a   gree to terms and conditions"
            feedback="You must agree before submitting."
          />
        </Form.Group>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          {basket ? (
            <tbody>
              {basket.map((item, i) => {
                return (
                  <tr>
                    <td>{i}</td>
                    <td>{item.name}</td>
                    <td>{item.amount}</td>
                    <td>{item.price}$</td>
                    <td>{item.price * item.amount}$</td>
                  </tr>
                );
              })}
            </tbody>
          ) : null}
          <h3>Total payment: {totalPay}$</h3>
        </Table>
        {error ? <div className="error">{error}</div> : null}
        <Button type="submit">Submit form</Button>
      </Form>
    </div>
  );
}

export default Basket;
