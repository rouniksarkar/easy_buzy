import Notification from "../models/notification.models";

import Notification from "../models/notification.models.js";

async function createNotification({
    recipient,
    type,
    title,
    message,
    relatedId,
    relatedType
}) {
    return await Notification.create({
        recipient,
        type,
        title,
        message,
        relatedId,
        relatedType
    });
}

export { createNotification };