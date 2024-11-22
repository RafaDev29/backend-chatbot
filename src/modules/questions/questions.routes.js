const express = require("express");
const { handleUserQuery } = require("./questions.controller");

const router = express.Router();

router.post("/query", handleUserQuery);

module.exports = router;
