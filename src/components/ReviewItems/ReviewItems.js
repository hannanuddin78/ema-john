import React, { useReducer } from "react";
import { quantityReducer, quantityState } from "../../reducers/QuantityReducer";
import "./ReviewItems.css";

const ReviewItems = (props) => {
  const { name, quantity, key, price } = props.product;
  console.log(quantity);

  const [state, dispatch] = useReducer(quantityReducer, quantityState);

  return (
    <div className="review-item">
      <h3>{name}</h3>
      <div>
        <span style={{ fontWeight: "bold", marginRight: "10px" }}>
          Quantity :
        </span>
        <button onClick={() => dispatch({ type: "DECREASE" })}>-</button>
        <span style={{ marginLeft: "5px", marginRight: "5px" }}>
          {state.quantity}
        </span>
        <button onClick={() => dispatch({ type: "INCREASE" })}>+</button>
      </div>
      <p>
        <small>${price}</small>
      </p>
      <br />
      <button onClick={() => props.removeItem(key)} className="product-btn">
        Remove
      </button>
    </div>
  );
};

export default ReviewItems;
