import React from "react";
import "./Cart.css";

const Cart = (props) => {
  const cart = props.cart;
  const total = cart.reduce(
    (total, prd) => total + (prd.price * prd.quantity || 1),
    0
  );

  const shipping = cart.reduce((shipping, prd) => shipping + prd.shipping, 0);

  const totalTax = total / 10;

  const estimatedTax = totalTax / 5;

  const orderTotal = total + shipping + totalTax + estimatedTax;
  const formatNumber = (num) => {
    const precision = num.toFixed(2);
    return Number(precision);
  };

  return (
    <div className="cart-container">
      <h3>Order Summary</h3>
      <h4>Items ordered: {cart.length}</h4>
      <p>Items : ${formatNumber(total)}</p>
      <p>Shipping & Handling : ${formatNumber(shipping)}</p>
      <p>Total before tax : ${formatNumber(totalTax)}</p>
      <p>Estimated Tax : ${formatNumber(estimatedTax)}</p>
      <h5>Order Total : ${formatNumber(orderTotal)}</h5>
      <br />
      {props.children}
    </div>
  );
};

export default Cart;
