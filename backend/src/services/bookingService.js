const Booking = require("../models/booking");

class BookingService {
  async createBooking(bookingData, userId) {
    const eventId = bookingData.event;
    const existingBooking = await Booking.findOne({
      user: userId,
      event: eventId,
    });
    if (existingBooking) {
      throw new Error("User has already booked this event.");
    }
    bookingData.user = userId;
    const booking = await Booking.create(bookingData);
    return booking;
  }

  async getAllBookings() {
    const bookings = await Booking.find().populate("user").populate("event");
    return bookings;
  }

  async getBookingById(bookingId) {
    const booking = await Booking.findById(bookingId)
      .populate("user")
      .populate("event");
    return booking;
  }

  async getBookingsByUser(userId) {
    const bookings = await Booking.find({ user: userId }).populate("event");
    return bookings;
  }

  async getBookingByUserAndEvent(userId, eventId) {
    const booking = await Booking.findOne({ user: userId, event: eventId });
    return booking;
  }

  async getBookingsByEvent(eventId) {
    const bookings = await Booking.find({ event: eventId }).populate("user");
    return bookings;
  }

  async updateBookingStatus(bookingId, status) {
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true },
    );
    return booking;
  }

  async deleteBooking(bookingId) {
    const booking = await Booking.findByIdAndDelete(bookingId);
    return booking;
  }
}
module.exports = new BookingService();
