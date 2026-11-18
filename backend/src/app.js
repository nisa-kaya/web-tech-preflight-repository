import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();
app.use(cors());
app.use(express.json()); 
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2416501086", 
  });
});
app.use("/events", eventRoutes);

app.use((req, res) => { 
  res.status(404).json({ error: { message: "Route not found" } });
});

// Eşleşmeyen rotalar için 404 middleware'i
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

// Merkezi hata yakalayıcı (error-handling) middleware'i (4 parametre alır)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: { message: "Server error" } });
});

export default app;