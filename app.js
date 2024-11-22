const express = require("express");
const cors = require("cors");
require("dotenv").config();
const questionsRoutes = require("./src/modules/questions/questions.routes");
const geminiRoutes = require('./src/modules/gemini/gemini.routes');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/questions", questionsRoutes);
app.use('/api/gemini', geminiRoutes);
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente.");
});

// Servidor

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
