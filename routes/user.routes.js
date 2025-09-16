const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/guards/auth.middleware.js");
const { OwnerGuard, AdminGuard, ClientGuard } = require("../middleware/guards/guards.js");
const validateUser = require("../middleware/joi/validate.user.js");


const { 
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/user.controller.js");

// 🔹 Test uchun route
// router.get("/user-test", authMiddleware, ClientGuard, (req, res) => {
//     res.json({ message: "user guard ishladi ✅" });
// });

router.post("/", validateUser, createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;

