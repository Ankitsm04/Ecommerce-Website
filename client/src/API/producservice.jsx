
import axios from 'axios';

const fetchProducts = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
        return res.data.products;
    } catch (err) {
        throw new Error(err.message);
    }
};

export { fetchProducts };
