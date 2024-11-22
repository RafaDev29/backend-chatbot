const { findClosestQuestion } = require("./questionBank.service");

/**
 * Controlador para manejar consultas al banco de preguntas.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
const handleQuestionQuery = async (req, res) => {
  const { userInput } = req.body;

  if (!userInput) {
    return res.status(400).json({
      status: false,
      message: "Por favor, proporciona una pregunta válida.",
    });
  }

  try {
    const response = await findClosestQuestion(userInput);

    // Si el servicio devuelve un error, envía ese mensaje
    if (response.error) {
      return res.json({
        status: true,
        message: "No entendemos tu pregunta.",
        data: response.error,
      });
    }

    // Si todo está bien, envía la respuesta procesada
    return res.json({
      status: true,
      message: "Consulta procesada con éxito.",
      data: response,
    });
  } catch (error) {
    console.error("Error en el controlador de Gemini:", error.message);

    // En caso de error, devuelve una respuesta clara
    return res.status(500).json({
      status: false,
      message: "Hubo un problema al procesar tu consulta.",
      error: error.message, // Opcional: detalla el error para depuración
    });
  }
};

module.exports = { handleQuestionQuery };
