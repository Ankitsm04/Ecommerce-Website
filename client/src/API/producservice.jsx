
import axios from 'axios';

const fetchProducts = async () => {
    try {
        const res = await axios.get('/api/products');
        return res.data.products;
    } catch (err) {
        throw new Error(err.message);
    }
};

export { fetchProducts };
