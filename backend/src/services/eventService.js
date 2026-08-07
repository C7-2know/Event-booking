const Event = require("../models/event");

class EventService {
  async createEvent(eventData, userId) {
    const event = new Event({ ...eventData, createdBy: userId });
    await event.save();
    return event;
  }

  async getAllEvents() {
    const events = await Event.find().populate(
      "createdBy",
      "name email profilePicture",
    );
    return events;
  }

  async getEventById(eventId) {
    const event = await Event.findById(eventId).populate(
      "createdBy",
      "name email profilePicture",
    );
    if (!event) {
      throw new Error("Event not found");
    }
    return event;
  }

  async updateEvent(eventId, updatedData) {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedData, {
      new: true,
    });
    if (!updatedEvent) {
      throw new Error("Event not found");
    }
    return updatedEvent;
  }

  async deleteEvent(eventId) {
    const event = await Event.findByIdAndDelete(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    return event;
  }
}

module.exports = new EventService();
