import Product from "../models/product.models.js";
import PurchaseRequest from "../models/purchaseRequest.model.js";

async function createPurchaseRequest(req, res) {

    const { supplier, items } = req.body;

    if (!supplier || !items || items.length===0) {
        return res.status(400).json({ message: "Supplier and at least one item are required" })
    }

    try {
        
        const processedItems = await Promise.all(
            items.map(async (item) =>{
                const productData = await Product.findById(item.product);

                if (!productData) {
                    throw new Error(`Product not found: ${item.product}`);
                }

                return {
                    product : item.product,
                    quantity: item.quantity,
                    price: productData.price,
                    total: productData.price * item.quantity,
                }
            })
        )


        const purchaseRequest = await PurchaseRequest.create({
            wholeseller: req.user.id,
            supplier,
            items:processedItems,
        })

        return res.status(200).json({ message: "purchase request created!", purchaseRequest })
    } catch (error) {
        return res.status(500).json({ message: "purchase request creation failed!", error:error.message })
    }
}


async function getAllPurchaseRequests(req, res) {

    try {
        const { wholeseller } = req.query;

        let filter = {};

        if (req.user.role === "wholeSeller") {
            filter.wholeseller = req.user.id
        }
        else if (wholeseller) {
            filter.wholeseller = wholeseller
        }

        const purchaseRequests = await PurchaseRequest.find(filter);

        if (purchaseRequests.length === 0) {
            return res.status(400).json({ message: "No purchase request found!" })
        }

        return res.status(200).json({ message: "Fetched purchase requests!", purchaseRequests })
    } catch (error) {
        return res.status(500).json({ message: "Error on fetched purchase request!", error })
    }
}

async function getPurchaseRequestById(req, res) {

    try {
        const { id } = req.params;

        const purchaseRequest = await PurchaseRequest.findById(id);

        if (purchaseRequest.length === 0) {
            return res.status(400).json({ message: "No purchase request found!" })
        }

        return res.status(200).json({ message: "Fetched purchase request!", purchaseRequest })
    } catch (error) {
        return res.status(500).json({ message: "Error on fetched purchase request!", error })
    }
}

export { createPurchaseRequest, getAllPurchaseRequests, getPurchaseRequestById }