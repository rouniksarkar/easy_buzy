import express from "express"
import ImageKit from "@imagekit/nodejs"
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

router.get('/upload-auth', authMiddleware, (req, res) => {
  const { token, expire, signature } = client.helper.getAuthenticationParameters();
  res.json({
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY
  });
});

export default router;