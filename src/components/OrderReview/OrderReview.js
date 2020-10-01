import React from 'react';
import './OrderReview.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import happyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const OrderReview = () => {
    const [cart, setCart] = useState([]);
    const history = useHistory();

    const [orderPlace, setOrderPlace] = useState(false);
    const handelProcessOrder = () => {
        history.push('/shipment')
    }

    const handelReviewProduct = (productKey) => {
        console.log('click product', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() =>{
        //cart
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);

        const countProducts = productKeys.map(key => {
            const products = fakeData.find(prd => prd.key === key);
            products.quantity = saveCart[key];
            return products;
        })

        setCart(countProducts);

        console.log(countProducts);
    }, []);

    let thanksOrder;
    if (orderPlace) {
        thanksOrder = <img src={happyImg} alt=""/>
    }

    return (
        <div className="review-container">
            <div className="order-review-container">
                {cart.map(pd => <ReviewItems key={pd.key} removeItem={handelReviewProduct} product={pd}></ReviewItems>)}
                { thanksOrder }
            </div>
            <div className="review-card-container">
                <Cart cart={cart}>
                    <button onClick={handelProcessOrder} className="product-btn">Process Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default OrderReview;