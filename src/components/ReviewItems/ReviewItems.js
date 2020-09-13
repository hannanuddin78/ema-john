import React from 'react';
import './ReviewItems.css';

const ReviewItems = (props) => {
    const {name, quantity, key, price} = props.product;
    return (
        <div className="review-item">
            <h3>{name}</h3>
            <p>Quantity : {quantity}</p>
            <p><small>${price}</small></p>
            <br/>
            <button onClick={() => props.removeItem(key)} className="product-btn">Remove</button>
        </div>
    );
};

export default ReviewItems;