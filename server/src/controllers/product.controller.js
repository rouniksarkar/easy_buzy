import Product from "../models/product.models";

async function createProductController(req, res) {

    try {
        const body = req.body

    const requiredfields = ["name", "description", "price", "quantity", "category", "image"]

    const missingFields = requiredfields.filter(fields => !body[fields])

    if (missingFields.length > 0) {
        return res.status(400).json({
            error: `Missing required fields: ${missingFields.join(', ')}`
        });
    }

    const product = await Product.create({
        name: body.name,
        description: body.description,
        price: body.price,
        quantity: body.quantity,
        category: body.category,
        image: body.image
    })

    return res.status(200).json({
        message:"Product created sucessfully!",
        product
    })
    
    } catch (error) {
        console.error("Error on creating product", error);
        return res.status(500).json({ error: "Something went wrong" });
    }

}

export {createProductController}