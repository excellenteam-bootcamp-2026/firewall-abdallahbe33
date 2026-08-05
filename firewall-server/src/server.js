const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

const requestLogger = require("./middleware/requestLogger");
app.use(requestLogger);


app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Firewall server is running"
  });
});


app.use((req, res) => {
  res.status(404).json({
    status: "error",
    code: "NOT_FOUND",
    message: "Endpoint not found."
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});