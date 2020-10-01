import React, { createContext } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { BrowserRouter as Router, Switch,Route, Link} from "react-router-dom";
import OrderReview from './components/OrderReview/OrderReview';
import ManageInventory from './components/ManageInventory/ManageInventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value= {[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
          <Switch>
              <Route path="/shop">
                  <Shop></Shop>
              </Route>
              <Route path="/review">
                  <OrderReview></OrderReview>
              </Route>
              <PrivateRoute path="/inventory">
                  <ManageInventory></ManageInventory>
              </PrivateRoute>
              <Route path="/login">
                  <Login></Login>
              </Route>
              <PrivateRoute path="/shipment">
                  <Shipment></Shipment>
              </PrivateRoute>
              <Route exact path="/">
                  <Shop></Shop>
              </Route>
              <Route path="/product/:productKey">
                  <ProductDetails></ProductDetails>
              </Route>
              <Route path="/*">
                  <NotFound></NotFound>
              </Route>
          </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
