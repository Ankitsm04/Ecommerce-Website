import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../../../../API/producservice';
import './DetailProduct.css'; // Import the CSS file

const DetailProduct = () => {
    const [products, setProducts] = useState([]);
    const [detailProduct, setDetailProduct] = useState(null);
    const [error, setError] = useState(null);
    const params = useParams();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts);
            } catch (err) {
                setError(err);
            }
        };

        getProducts();
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            const foundProduct = products.find(product => product._id === params.id);
            setDetailProduct(foundProduct);
        }
    }, [params.id, products]);

    if (error) return <p>Error loading product details: {error.message}</p>;
    if (!detailProduct) return <p>Loading product details...</p>;

    return (
        <div className="detail-product-container">
            <div className="detail-product-content">
                <img src={detailProduct.images.url} alt={detailProduct.title} className="detail-product-image" />
                <div className="detail-product-info">
                    <h1 className="detail-product-title">{detailProduct.title}</h1>
                    <p className="detail-product-price">${detailProduct.price}</p>
                    <p className="detail-product-description">{detailProduct.description}</p>
                    <button className='product-btn'><a href="/">BUY</a></button>
                </div>
            </div>
        </div>
    );
};

export default DetailProduct;
