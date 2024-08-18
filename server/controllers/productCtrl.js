const Products = require('../models/productModel');

// Filtering, sorting, and pagination
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);

        this.query.find(JSON.parse(queryStr));
        return this;
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 9;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Products.find(), req.query)
                .filtering()
                .sorting()
                .pagination();
            const products = await features.query;

            res.json({ result: products.length, products });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    createProducts: async (req, res) => {
        try {
            const { product_id, title, price, description, content, images, category } = req.body;
            if (!images) return res.status(400).json({ msg: "No Image Upload" });

            const product = await Products.findOne({ product_id });
            if (product) return res.status(400).json({ msg: "Product already Exists" });

            const newProduct = new Products({
                product_id,
                title: title.toLowerCase(),
                price,
                description,
                content,
                images,
                category
            });
            await newProduct.save();
            res.json(newProduct);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const product = await Products.findById(req.params.id);
            if (!product) return res.status(400).json({ msg: "Product not found" });

            await Products.findByIdAndDelete(req.params.id);
            res.json({ msg: "Deleted a Product" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { title, price, description, content, images, category } = req.body;
            if (!images) return res.status(400).json({ msg: "No Image Upload" });

            const updatedProduct = await Products.findOneAndUpdate(
                { _id: req.params.id },
                {
                    title: title.toLowerCase(),
                    price,
                    description,
                    content,
                    images,
                    category
                },
                { new: true }
            );

            if (!updatedProduct) return res.status(400).json({ msg: "Product not found" });

            res.json({ msg: "Updated a Product", updatedProduct });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = productCtrl;
