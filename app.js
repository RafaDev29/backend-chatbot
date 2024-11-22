const express = require("express");
const cors = require("cors");
require("dotenv").config();
const questionsRoutes = require("./src/modules/questions/questions.routes");
const geminiRoutes = require('./src/modules/gemini/gemini.routes');
const questionBankRoutes = require("./src/modules/questionBank/questionBank.routes");
const { formatResponseMiddleware } = require("./src/middlewares/response.middleware");
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(formatResponseMiddleware); 
// Rutas
app.use("/api/questions", questionsRoutes);
app.use('/api/gemini', geminiRoutes);
app.use("/api/questionBank", questionBankRoutes);
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente.");
});

// Servidor

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
