const express = require("express");
const { handleGeminiQuery } = require("./gemini.controller");

const router = express.Router();

// Ruta para manejar consultas a Gemini
router.post("/query", handleGeminiQuery);

module.exports = router;
