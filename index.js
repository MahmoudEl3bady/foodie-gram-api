import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello AHmed!");
});

app.listen(8000,()=>{
    console.log("Server is Running");
})