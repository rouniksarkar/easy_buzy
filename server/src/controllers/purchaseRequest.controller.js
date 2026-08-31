import Order from "../models/order.models.js";
import Product from "../models/product.models.js";
import PurchaseRequest from "../models/purchaseRequest.model.js";

async function createPurchaseRequest(req, res) {

    const { supplier, items } = req.body;

    if (!supplier || !items || items.length === 0) {
        return res.status(400).json({ message: "Supplier and at least one item are required" })
    }

    try {

        const processedItems = await Promise.all(
            items.map(async (item) => {
                const productData = await Product.findById(item.product);

                if (!productData) {
                    throw new Error(`Product not found: ${item.product}`);
                }

                return {
                    product: item.product,
                    quantity: item.quantity,
                    price: productData.price,
                    total: productData.price * item.quantity,
                }
            })
        )


        const purchaseRequest = await PurchaseRequest.create({
            wholesaler: req.user.id,
            supplier,
            items: processedItems,
        })

        return res.status(200).json({ message: "purchase request created!", purchaseRequest })
    } catch (error) {
        return res.status(500).json({ message: "purchase request creation failed!", error: error.message })
    }
}


async function getAllPurchaseRequests(req, res) {

    try {
        const { wholesaler } = req.query;

        let filter = {};

        if (req.user.role === "wholesaler") {
            filter.wholesaler = req.user.id
        }
        else if (wholesaler) {
            filter.wholesaler = wholesaler
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

async function acceptPurchaseRequest(req, res) {

    try {
        const { id } = req.params;

        const purchaseRequest = await PurchaseRequest.findById(id);

        if (!purchaseRequest) {
            return res.status(404).json({ message: "Purchase request not found!" })
        }

        if (req.user.role === "supplier" && purchaseRequest.supplier.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorize to accept request!" })
        }

        if (purchaseRequest.status !== "pending") {
            return res.status(400).json({ message: `Request allready ${purchaseRequest.status}!` })
        }

        purchaseRequest.status = "accepted";

        await purchaseRequest.save();

        return res.status(201).json({ message: "Purchase request accepted!", purchaseRequest })
    } catch (error) {
        return res.status(500).json({ message: "Failed to accept purchase request", error: error.message })
    }

}

async function rejectPurchaseRequest(req, res) {

    try {
        const { id } = req.params;

        const purchaseRequest = await PurchaseRequest.findById(id);

        if (!purchaseRequest) {
            return res.status(404).json({ message: "Purchase request not found!" })
        }

        if (req.user.role === "supplier" && purchaseRequest.supplier.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorize to accept request!" })
        }

        if (purchaseRequest.status !== "pending") {
            return res.status(400).json({ message: `Request allready ${purchaseRequest.status}!` })
        }

        purchaseRequest.status = "rejected";

        await purchaseRequest.save();

        return res.status(201).json({ message: "Purchase request rejected!", purchaseRequest })
    } catch (error) {
        return res.status(500).json({ message: "Failed to reject purchase request", error: error.message })
    }

}

async function cancelPurchaseRequest(req, res) {

    try {
        const { id } = req.params;

        const purchaseRequest = await PurchaseRequest.findById(id);

        if (!purchaseRequest) {
            return res.status(404).json({ message: "Purchase request not found!" })
        }

        if (req.user.role === "wholesaler" && purchaseRequest.wholesaler.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorize to accept request!" })
        }

        if (purchaseRequest.status !== "pending") {
            return res.status(400).json({ message: `Request allready ${purchaseRequest.status}!` })
        }

        purchaseRequest.status = "cancelled";

        await purchaseRequest.save();

        return res.status(200).json({ message: "Purchase request canceled!", purchaseRequest })
    } catch (error) {
        return res.status(500).json({ message: "Failed to cancel purchase request", error: error.message })
    }
}

async function deletePurchaseRequest(req, res) {

    try {
        const { id } = req.params;

        const purchaseRequest = await PurchaseRequest.findByIdAndDelete(id);

        if (!purchaseRequest) {
            return res.status(400).json({ message: "Purchase request not found!" });
        }

        return res.status(200).json({ message: "Purchase request deleted!", purchaseRequest });
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete Purchase request!", error:error.message });
    }
}

async function payPurchaseRequest(req, res) {

    try {
        const {id} = req.params;

        const purchaseRequest = await PurchaseRequest.findById(id);

        if(!purchaseRequest){
            return res.status(400).json({message:"No purchase request found."});
        }

        if(purchaseRequest.status !== "accepted"){
            return res.status(200).json({message:"Request not accepted!"});
        }

        purchaseRequest.paymentStatus = "paid";

        const existingOrder = await Order.findOne({
            purchaseRequest: purchaseRequest._id
        })

        if (existingOrder) {
            return res.status(409).json({
                message: "Order already exists for this purchase request.",
                order: existingOrder
            });
        }

        const order = await Order.create({
            purchaseRequest:purchaseRequest.id,
            wholesaler:purchaseRequest.wholesaler,
            supplier:purchaseRequest.supplier,
            items:purchaseRequest.items,
            totalAmount:purchaseRequest.totalAmount
        })

        return res.status(201).json({sucess:true,message:"Order created from purchesed request!",order})

    } catch (error) {
        return res.status(500).json({message:"Failed to create order from purchesed request",error:error.message})
    }
}

export {
    createPurchaseRequest,
    getAllPurchaseRequests,
    getPurchaseRequestById,
    acceptPurchaseRequest,
    rejectPurchaseRequest,
    cancelPurchaseRequest,
    deletePurchaseRequest,
    payPurchaseRequest
}