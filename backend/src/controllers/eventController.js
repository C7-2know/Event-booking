const eventService = require("../services/eventService");

exports.createEvent = async (req, res, next) => {
  try {
    const user = req.user;
    const event = await eventService.createEvent(req.body, user.id);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const updatedEvent = await eventService.updateEvent(
      req.params.id,
      req.body,
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const deletedEvent = await eventService.deleteEvent(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
