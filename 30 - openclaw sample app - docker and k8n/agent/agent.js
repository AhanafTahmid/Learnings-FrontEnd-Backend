// agent.js
import express from "express";
const app = express();

app.use(express.json());

app.post("/chat", (req, res) => {
  res.json({ reply: "Echo: " + req.body.message });
});

app.listen(3001, () => {
  console.log("Agent running");
});