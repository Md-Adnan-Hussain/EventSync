import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const addEvent = async (event) => {
    try {
      const response = await axios.post('http://localhost:5000/api/events', event);
      setEvents([...events, response.data]);
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  };

  const registerForEvent = async (eventId, participant) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/events/${eventId}/register`, participant);
      setEvents(events.map(event => event._id === eventId ? response.data : event));
    } catch (error) {
      console.error('Error registering for event:', error);
      throw error;
    }
  };

  return (
    <EventContext.Provider value={{ events, addEvent, registerForEvent }}>
      {children}
    </EventContext.Provider>
  );
};