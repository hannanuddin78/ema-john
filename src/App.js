import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import OrderReview from './components/OrderReview/OrderReview';
import ManageInventory from './components/ManageInventory/ManageInventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';

function App() {
  return (
    <div>
      <Header></Header>
      <Router>
          <Switch>
              <Route path="/shop">
                  <Shop></Shop>
              </Route>
              <Route path="/review">
                  <OrderReview></OrderReview>
              </Route>
              <Route path="/inventory">
                  <ManageInventory></ManageInventory>
              </Route>
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
    </div>
  );
}

export default App;
