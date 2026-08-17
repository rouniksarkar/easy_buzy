import Product from "../models/product.models";

async function createProductController(req, res) {

    try {
        const body = req.body

        const requiredFields = [
            "name",
            "description",
            "price",
            "quantity",
            "category",
            "image",
            "MOQ",
            "unit",
            "status",
        ]

        const missingFields = requiredFields.filter(
            field => body[field] === undefined || body[field] === null || body[field] === ""
        );

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        const product = await Product.create({
            supplier: req.user.id,
            name: body.name,
            description: body.description,
            price: body.price,
            quantity: body.quantity,
            category: body.category,
            image: body.image,
            MOQ: body.MOQ,
            status: body.status,
            unit: body.unit,
        })

        return res.status(201).json({
            message: "Product created successfully!",
            product
        })

    } catch (error) {
        console.error("Error on creating product", error);
        return res.status(500).json({ error: "Something went wrong" });
    }

}


async function getProductsController(req, res) {

    try {
        const products = await Product.find();

        if (products.length === 0) {
            return res.status(404).json({ message: "Products not found!" });
        }

        return res.status(200).json({ message: "Products fetch successfully!", products })
    } catch (error) {
        console.error("Error on products fetching", error);
        return res.status(500).json({ error: "Something went wrong" });
    }

}

async function getOneProductController(req, res) {

    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        return res.status(200).json({ message: "Product fetched!", product })
    } catch (error) {
        console.error("Error on product fetching", error);
        return res.status(500).json({ error: "Something went wrong" });
    }

}

async function updateProductController(req, res) {

    try {
        const { id } = req.params;

        const body = req.body;

        let product;

        const updateProduct = {
            name: body.name,
            description: body.description,
            price: body.price,
            quantity: body.quantity,
            category: body.category,
            image: body.image,
            MOQ: body.MOQ,
            unit: body.unit,
            status: body.status
        }

        if (req.user.role === "admin") {
            product = await Product.findByIdAndUpdate(
                id,
                updateProduct,
                {
                    new: true,
                    runValidators: true
                }
            )
        } else {
            product = await Product.findOneAndUpdate({
                _id: id,
                supplier: req.user.id
            },
            updateProduct,
            {
                new: true,
                runValidators: true
            }
            );
        }

        if (!product) {
            return res.status(404).json({
                message: "Product not found or you are not authorized"
            });
        }

        return res.status(201).json({ message: "Products updated successfully!", product })
    } catch (error) {
        console.error("Error on product updating", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

async function deleteProductController(req, res) {

    try {
        const { id } = req.params;

        let product;

        if (req.user.role === "admin") {
            product = await Product.findByIdAndDelete(id);
        } else {
            product = await Product.findOneAndDelete({
                _id: id,
                supplier: req.user.id
            });
        }

        if (!product) {
            return res.status(404).json({
                message: "Product not found or you are not authorized"
            });
        }

        return res.status(200).json({ message: "Products deleted successfully!", product })
    } catch (error) {
        console.error("Error on product deleting", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

export { createProductController, getProductsController, getOneProductController, updateProductController, deleteProductController }

