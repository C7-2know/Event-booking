const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, bookingController.createBooking);
router.get("/:id", authMiddleware, bookingController.getBookingById);
router.get(
  "/user/:userId",
  authMiddleware,
  bookingController.getBookingsByUser,
);
router.get(
  "/event/:eventId",
  authMiddleware,
  bookingController.getBookingsByEvent,
);
router.get(
  "/user/:userId/event/:eventId",
  authMiddleware,
  bookingController.getBookingByUserAndEvent,
);

router.put(
  "/:id/status",
  authMiddleware,
  bookingController.updateBookingStatus,
);
router.delete("/:bookingId", authMiddleware, bookingController.deleteBooking);

module.exports = router;
