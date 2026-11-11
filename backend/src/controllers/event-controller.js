import { events } from "../data/events.js";


export const getAllEvents = (req, res) => {
  res.json(events);
};