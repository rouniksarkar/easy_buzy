import Notification from "../models/notification.models.js";

async function getAllNotifications(req, res) {

    try {
        const notifications = await Notification.find({recipient: req.user._id}).sort({ createdAt: -1 });

        if (notifications.length===0) {
            return res.status(404).json({ message: "No notification is here!" })
        }
        return res.status(200).json({ message: "All notifications", notifications })
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch notifications", error: error.message })
    }

}

async function getOneNotification(req, res) {

    try {
        const { id } = req.params;

        const notification = await Notification.findOne({_id:id, recipient: req.user._id});


        if (!notification) {
            return res.status(404).json({ message: "No notification is here!" })
        }
        return res.status(200).json({ message: "Fetch notification", notification })

    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch notification", error: error.message })
    }

}

async function readOneNotification(req, res) {

    try {
        const { id } = req.params;

        const notification = await Notification.findOneAndUpdate({_id:id,recipient: req.user._id},{
            isRead: true
        }, {
            returnDocument: 'after',
            runValidators: true
        })

        if (!notification) {
            return res.status(404).json({ message: "No notification is here!" })
        }
        return res.status(200).json({ message: "Read notification", notification })
    } catch (error) {
        return res.status(500).json({ message: "Failed to read notification", error: error.message })
    }
}

async function deleteNotification(req, res) {
    try {
        const { id } = req.params;

        const notification = await Notification.findOneAndDelete({_id:id,recipient: req.user._id});

        if (!notification) {
            return res.status(404).json({ message: "No notification is here!" })
        }
        return res.status(200).json({ message: "Notification deleted!", notification })
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete notification", error: error.message })
    }
}

export {getAllNotifications, getOneNotification, readOneNotification, deleteNotification}