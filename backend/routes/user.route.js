import express from 'express';
import { updateUser } from '../controllers/user.controller.js';
import { deleteUser } from '../controllers/user.controller.js';
import { signOut } from '../controllers/user.controller.js';
import { verifyToken } from "../utils/verifyUser.js"
import { getUsers } from '../controllers/user.controller.js';

const router = express.Router();
router.put("/update/:userId",verifyToken,updateUser);
router.delete("/delete/:userId",verifyToken,deleteUser);
router.post("/signOut",signOut);

router.get("/getusers", verifyToken, getUsers)
export default router;