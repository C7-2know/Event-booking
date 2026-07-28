const express = require("express");
const router = express.Router();

const {authMiddleware, adminOnly} = require("../middleware/authMiddleware");

const eventController = require("../controllers/eventController");

router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.post("/", authMiddleware, adminOnly, eventController.createEvent);
router.put("/:id", authMiddleware, adminOnly, eventController.updateEvent);
router.delete("/:id", authMiddleware, adminOnly, eventController.deleteEvent);

module.exports = router;