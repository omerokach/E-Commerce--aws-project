import "../App.css";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Login from "./Login";
import Signup from "./Signup";
import Shop from "./Shop";
import PrivateRoute from "./PrivateRoute";
import { DataBaseProvider } from "../context/DBContext";
import Basket from "./Basket";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <DataBaseProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Shop} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/shop" component={Shop} />
                <Route exact path="/basket" component={Basket} />
              </Switch>
            </DataBaseProvider>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
