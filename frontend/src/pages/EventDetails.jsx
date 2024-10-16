import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEventContext } from "../context/EventContext";
import { toast } from "react-toastify";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams();
  const { events, registerForEvent } = useEventContext();
  const [event, setEvent] = useState(null);
  const [participant, setParticipant] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/events/${id}`
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Failed to load event details");
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (event.participants.length >= event.maxParticipants) {
        toast.error("This event is already full");
        return;
      }
      await registerForEvent(event._id, participant);
      toast.success("Successfully registered for the event!");
      setParticipant({ name: "", email: "" });
    } catch (error) {
      console.error("Error registering for event:", error);
      toast.error("Failed to register for the event. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParticipant((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="event-details">
      <h2 className="mb-4">{event.title}</h2>
      <div className="card mb-4">
        <div className="card-body">
          <p className="card-text">
            <Calendar className="me-2" size={18} />
            Date: {event.date}
          </p>
          <p className="card-text">
            <Clock className="me-2" size={18} />
            Time: {event.time}
          </p>
          <p className="card-text">
            <MapPin className="me-2" size={18} />
            Location: {event.location}
          </p>
          <p className="card-text">
            <Users className="me-2" size={18} />
            Participants: {event.participants.length} / {event.maxParticipants}
          </p>
          <p className="card-text">Description: {event.description}</p>
        </div>
      </div>

      <h3 className="mb-3">Register for this event</h3>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={participant.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={participant.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>

      <h3 className="mt-4 mb-3">Registered Participants</h3>
      <ul className="list-group">
        {event.participants.map((p, index) => (
          <li key={index} className="list-group-item">
            {p.name} - {p.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventDetails;
