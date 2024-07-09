import express from "express";
import dbPromise from "./db_config/db.js";
const app = express();


app.get("/users", async (req, res) => {
  const db = await dbPromise;
  try {
    const db = await dbPromise;
    const users = await db.all('SELECT * FROM Users');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(8000,()=>{
    console.log("Server is Running");
})