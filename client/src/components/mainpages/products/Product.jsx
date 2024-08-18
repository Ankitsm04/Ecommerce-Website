import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../../API/producservice';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const products = await fetchProducts();
                setProducts(products);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    if (loading) return <p>Loading.....</p>;
    if (error) return <p>Error loading products: {error.message}</p>;

    return (
        <div className='products-container'>
            <h1>Products</h1>
            <div className='product-list'>
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className='product-card' key={product._id}>
                            <img src={product.images.url} alt={product.title} />
                            <div className='product-details'>
                                <h2>{product.title}</h2>
                                <p>Price: ${product.price}</p>
                                <p>{product.description}</p>
                                <div className="row-btns">
                                    <button className='product-btn'><a href="/">BUY</a></button>
                                    <button className='product-btn'><a href={`/detail/${product._id}`}>View</a></button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default Products;
