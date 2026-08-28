import Order from "../models/order.models";

async function getOrdersController(req, res) {

    try {
        const { purchaseRequest } = req.query;

        const order = await Order.find(purchaseRequest);

        if (!order) {
            return res.status(404).json({ message: "No order found!" })
        }

        return res.status(200).json({ message: "Order fetched successfully!", order })
    } catch (error) {
        return res.status(200).json({ message: "Failed to fetching order!", error: error.message })
    }
}

async function getOneOrderController(req, res) {
    try {
        const { id } = req.params;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: "No order found!" })
        }

        return res.status(200).json({ message: "Order fetched successfully!", order })

    } catch (error) {
        return res.status(200).json({ message: "Failed to fetching order!", error: error.message })
    }
}

async function cancelOrderController(req, res) {

    try {
        const { id } = req.params;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: "No order found!" })
        }

        if (req.user.role !== "wholeSeller") {
            return res.status(500).json({ message: "You are not permited to cancel the order!" })
        }

        if (req.user.id !== order.wholeSeller) {
            return res.status(500).json({ message: "You are not permited to cancel the order!" })
        }

        if (order.status !== "PROCESSING") {
            return res.status(400).json({ message: `Order currently on ${order.status}` })
        }

        order.status = "CANCELLED";

        await order.save();

        return res.status(200).json({ success: true, message: "Order has been cancelled", order })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to Order cancell", error:error.message })
    }

}

export { getOrdersController, getOneOrderController, cancelOrderController }