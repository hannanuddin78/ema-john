import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const Shop = () => {
    const fake10 = fakeData.slice(0,10)
    const [products, setProducts] = useState(fake10);
    
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = saveCart[existingKey];
            return product;
        })
        setCart(previousCart)
    }, [])

    const handleAddProduct = (product) => {
        const addKey = product.key;
        const sameProduct = cart.find(prd => prd.key === addKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const other = cart.filter(pd => pd.key !== addKey)
            newCart = [...other, sameProduct]
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {products.map(pd => <Product showAddToCard={true} key={pd.key} handleAddProduct={handleAddProduct} product={pd}></Product>)}
            </div>
            <div className="card-container">
                <Cart cart={cart}>
                    <Link to="/review"><button className="product-btn">Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;