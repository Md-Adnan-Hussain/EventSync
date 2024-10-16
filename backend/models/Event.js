import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    maxParticipants: { type: Number, required: true },
    participants: [participantSchema],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
