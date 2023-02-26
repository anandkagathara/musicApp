const express = require("express");
const mongoose = require("mongoose");
const audioRoutes = require("./routes/audioRoute");
const authRoutes = require('./routes/authRoute')


const app = express();
const port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/musicapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("strictQuery", false);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

app.use(express.json());

app.use("/api", audioRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));
