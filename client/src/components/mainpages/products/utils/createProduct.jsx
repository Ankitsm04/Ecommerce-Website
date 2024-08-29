import React, { useState } from 'react';
import axios from 'axios';
import './createProduct.css'; // Import CSS

const UploadAndAddProduct = () => {
    const [file, setFile] = useState(null);
    const [product, setProduct] = useState({
        product_id: '',
        title: '',
        price: '',
        description: '',
        content: '',
        category: ''
    });
    const [imageUrl, setImageUrl] = useState('');

    // Get the access token from local storage
    const getAccessToken = () => localStorage.getItem('accesstoken');

    // Handle file input change
    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Upload image to Cloudinary
    const uploadImage = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_KEY}/api/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `${getAccessToken()}`
                }
            });
            setImageUrl(res.data.url);
            return res.data.public_id;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    // Handle product input change
    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    // Submit the form to upload image and create product
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert('Please select an image file');
            return;
        }

        const publicId = await uploadImage();
        if (publicId) {
            try {
                await axios.post(`${process.env.REACT_APP_API_KEY}/api/products`, {
                    ...product,
                    images: {
                        public_id: publicId,
                        url: imageUrl
                    }
                }, {
                    headers: {
                        'Authorization': `Bearer ${getAccessToken()}`
                    }
                });
                alert('Product added successfully!');
                // Reset form
                setProduct({
                    product_id: '',
                    title: '',
                    price: '',
                    description: '',
                    content: '',
                    category: ''
                });
                setFile(null);
                setImageUrl('');
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="upload-product-container">
            <h1>Upload Image and Add Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="file" onChange={onFileChange} />
                </div>
                <div>
                    <input
                        type="text"
                        name="product_id"
                        placeholder="Product_id"
                        value={product.product_id}
                        onChange={handleProductChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={product.title}
                        onChange={handleProductChange}
                    />
                </div>
                <div>
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={product.price}
                        onChange={handleProductChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={product.description}
                        onChange={handleProductChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="content"
                        placeholder="Content"
                        value={product.content}
                        onChange={handleProductChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={product.category}
                        onChange={handleProductChange}
                    />
                </div>
                <button type="submit">Upload & Add Product</button>
            </form>
            {imageUrl && <img src={imageUrl} alt="Uploaded" />}
        </div>
    );
};

export default UploadAndAddProduct;
