import { events } from "../data/events.js";


export const getEvents = (req, res) => {
  res.json(events);
};


export const getEventById = (req, res) => {
  const { id } = req.params;
  const event = events.find((e) => e.id === id);

  if (!event) {
    return res.status(404).json({ error: { message: "Event not found" } });
  }

  res.json(event);
};


export const createEvent = (req, res) => {
  const newEvent = req.body;
  
  if (!newEvent.title || !newEvent.date) {
    return res.status(400).json({ error: { message: "Eksik veri" } });
  }

  events.push(newEvent);
  res.status(201).json(newEvent);
};