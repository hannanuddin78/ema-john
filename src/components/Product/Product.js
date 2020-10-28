import React, { useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";
import { Link } from "react-router-dom";
import { quantityReducer, quantityState } from "../../reducers/QuantityReducer";

const Product = (props) => {
  const [state, dispatch] = useReducer(quantityReducer, quantityState);
  // console.log(state);

  const { img, name, seller, price, stock, key } = props.product;
  const handleClick = () => props.handleAddProduct(props.product);

  return (
    <div className="product">
      <div className="product-img">
        <img src={img} alt="" />
      </div>
      <div className="product-details">
        <h3 className="product-name">
          <Link to={"/product/" + key}>{name}</Link>
        </h3>
        <p>
          <small>by :{" " + seller}</small>
        </p>
        <p>$ {price}</p>
        <div>
          <span style={{ fontWeight: "500", marginRight: "10px" }}>
            Quantity :
          </span>
          <button onClick={() => dispatch({ type: "quantityDecrease" })}>
            -
          </button>
          <span style={{ marginLeft: "5px", marginRight: "5px" }}>
            {state.quantity}
          </span>
          <button onClick={() => dispatch({ type: "quantityIncrease" })}>
            +
          </button>
        </div>
        <p>only {stock} left in stock - order soon</p>
        {props.showAddToCard === true && (
          <button className="product-btn" onClick={handleClick}>
            <FontAwesomeIcon icon={faShoppingCart} /> add to card
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
