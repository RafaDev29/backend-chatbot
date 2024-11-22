const express = require("express");
const { handleQuestionQuery } = require("./questionBank.controller");

const router = express.Router();

// Ruta para manejar consultas al banco de preguntas
router.post("/query", handleQuestionQuery);

module.exports = router;
