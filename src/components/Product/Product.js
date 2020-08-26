import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    console.log(props);
    const {img, name, seller, price, stock} = props.product;
    const handleClick = () => props.handleAddProduct(props.product);
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt=""/>
            </div>
            <div className="product-details">
                <h3 className="product-name">{name}</h3>
                <p><small>by :{" " + seller}</small></p>
                <p>$ {price}</p>
                <p>only {stock} left in stock - order soon</p>
                <button className="product-btn" onClick={handleClick}><FontAwesomeIcon icon={faShoppingCart} /> add to card</button>
            </div>
        </div>
    );
};

export default Product;