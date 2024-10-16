// routes/eventRoutes.js

import express from "express";
import {
  getAllEvents,
  createEvent,
  getEvent,
  registerForEvent,
} from "../controllers/eventController.js";

const router = express.Router();

// Get all events
router.get("/", getAllEvents);

// Create a new event
router.post("/", createEvent);

// Get a specific event
router.get("/:id", getEvent, (req, res) => {
  res.json(res.event);
});

// Register for an event
router.post("/:id/register", getEvent, registerForEvent);

export default router;
