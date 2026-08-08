const bookingService = require("../services/bookingService");

exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createBooking = async (req, res, next) => {
  try {
    const user = req.user;
    const booking = await bookingService.createBooking(req.body, user.id);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await bookingService.getBookingById(req.params.bookingId);
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBookingsByUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    const bookings = await bookingService.getBookingsByUser(req.params.userId);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBookingByUserAndEvent = async (req, res, next) => {
  if (req.user.id !== req.params.userId && req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const booking = await bookingService.getBookingByUserAndEvent(
      req.params.userId,
      req.params.eventId,
    );
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBookingsByEvent = async (req, res, next) => {
  try {
    const bookings = await bookingService.getBookingsByEvent(
      req.params.eventId,
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBookingStatus = async (req, res, next) => {
  try {
    const booking = await bookingService.updateBookingStatus(
      req.params.bookingId,
      req.body.status,
    );
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.deleteBooking(req.params.bookingId);
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
