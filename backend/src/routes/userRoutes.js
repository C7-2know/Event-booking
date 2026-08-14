const express = require("express");
const router = express.Router();

const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

const userController = require("../controllers/userController");

router.get("/", authMiddleware, userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", authMiddleware, userController.updateUser);
router.put(
  "/:id/profile-picture",
  authMiddleware,
  userController.uploadProfilePicture,
);
router.delete("/:id", authMiddleware, adminOnly, userController.deleteUser);

module.exports = router;
