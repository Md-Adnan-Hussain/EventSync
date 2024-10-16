import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import EventList from './pages/EventList';
import EventDetails from './pages/EventDetails';
import { Calendar } from 'lucide-react';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="container mt-4">
        <header className="text-center mb-4">
          <h1 className="display-4">
            <Calendar className="me-2" size={48} />
            Event Sync
          </h1>
          <p className="lead">Your Ultimate Event Management Solution</p>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Routes>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;