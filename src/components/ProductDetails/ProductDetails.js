import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const findProduct = fakeData.find(pd => pd.key === productKey);
    console.log(findProduct);

    return (
        <div>
            <h1>Product Details</h1>
            {<Product showAddToCard ={false} product={findProduct} ></Product>}
        </div>
    );
};

export default ProductDetails;