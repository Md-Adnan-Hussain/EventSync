import React from "react";
import { Link } from "react-router-dom";
import { useEventContext } from "../context/EventContext";
import { Calendar, MapPin, Users } from "lucide-react";

const EventList = () => {
  const { events } = useEventContext();

  return (
    <div className="event-list">
      <h2 className="mb-4">Upcoming Events</h2>
      {events.length === 0 ? (
        <p>
          No events available. Be the first to{" "}
          <Link to="/create-event">create an event</Link>!
        </p>
      ) : (
        <div className="row">
          {events.map((event) => (
            <div key={event._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">
                    <Calendar className="me-2" size={18} />
                    {event.date} at {event.time}
                  </p>
                  <p className="card-text">
                    <MapPin className="me-2" size={18} />
                    {event.location}
                  </p>
                  <p className="card-text">
                    <Users className="me-2" size={18} />
                    {event.participants.length} / {event.maxParticipants}{" "}
                    participants
                  </p>
                </div>
                <div className="card-footer">
                  <Link to={`/events/${event._id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
