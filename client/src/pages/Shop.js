import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useDB } from "../context/DBContext";
import axios from "axios";
import Product from "../components/Product";
import Basket from "./Basket";

function Shop(props) {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const { setBasket, getUserFromStore } = useDB();
  const [user, setUser] = useState("");
  const [products, setProducts] = useState();
  const history = useHistory();
  useEffect(async () => {
    const userFromStore = await getUserFromStore(currentUser.email);
    userFromStore.forEach((user) => setUser(user.data()));
  }, [currentUser.email]);

  useEffect(async () => {
    try {
        const products = await axios.get('http://localhost:8080/api/products');
        console.log(products);
        setProducts(products.data);
    } catch (error) {
      console.log(error);
    }
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

  return (
    <div>
      <div className="w-100 text-center mt-2">
        <header
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button className="logout-button navigate" onClick={handleLogOut}>Log Out</Button>
          <Button className="navigate" onClick={() => history.push('/basket')}>Basket</Button>
          <Button className="logout-button navigate" onClick={() => setBasket([])}>
          Clean basket
        </Button>
          <h2>shop</h2>
        </header>
        <h1>hello {user.name}</h1>
        <div className="products">
          {products
            ? products.Items.map((item) => <Product item={item} />)
            : null}
        </div>
      </div>
    </div>
  );
}

export default Shop;
