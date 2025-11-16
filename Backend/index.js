const express = require("express");
const connect = require("./config/database");
const bodyParser = require("body-parser");
const { PORT } = require("./config/server-config");
const apiRoutes = require("./src/routes/index");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api", apiRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await connect();
    console.log("Mongo db connected successfuly");
  } catch (error) {
    console.log("Mongo db connection failed: ", error);
  }
});
