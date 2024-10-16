import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, PlusCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="home">
      <h2 className="text-center mb-4">Welcome to Event Sync</h2>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <Calendar size={48} className="mb-3 text-primary" />
              <h5 className="card-title">Manage Events</h5>
              <p className="card-text">Create and manage your events with ease.</p>
              <Link to="/create-event" className="btn btn-primary">
                <PlusCircle className="me-2" size={18} />
                Create Event
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <Users size={48} className="mb-3 text-primary" />
              <h5 className="card-title">Track Attendees</h5>
              <p className="card-text">Monitor and manage event participants.</p>
              <Link to="/events" className="btn btn-primary">View Events</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <Calendar size={48} className="mb-3 text-primary" />
              <h5 className="card-title">Event Calendar</h5>
              <p className="card-text">View all your events in a calendar format.</p>
              <Link to="/events" className="btn btn-primary">Open Calendar</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;