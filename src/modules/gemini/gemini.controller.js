const { queryGemini } = require("./gemini.service");

/**
 * Controlador para manejar consultas a Gemini.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
const handleGeminiQuery = async (req, res) => {
  const { userInput } = req.body;

  if (!userInput) {
    return res.status(400).json({
      status: false,
      message: "Por favor, proporciona una pregunta válida.",
    });
  }

  try {
    const response = await queryGemini(userInput);
    res.json({
      status: true,
      message: "Consulta procesada con éxito.",
      data: response,
    });
  } catch (error) {
    console.error("Error en el controlador de Gemini:", error.message);
    res.status(500).json({
      status: false,
      message: "Hubo un problema al procesar tu consulta.",
    });
  }
};

module.exports = { handleGeminiQuery };
