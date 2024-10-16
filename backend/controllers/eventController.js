// controllers/eventController.js

import Event from "../models/Event.js";

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new event
export const createEvent = async (req, res) => {
  const event = new Event(req.body);
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a specific event
export const getEvent = async (req, res, next) => {
  let event;
  try {
    event = await Event.findById(req.params.id);
    if (event == null) {
      return res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.event = event;
  next();
};

// Register for an event
export const registerForEvent = async (req, res) => {
  if (res.event.participants.length >= res.event.maxParticipants) {
    return res.status(400).json({ message: "Event is full" });
  }
  res.event.participants.push(req.body);
  try {
    const updatedEvent = await res.event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
