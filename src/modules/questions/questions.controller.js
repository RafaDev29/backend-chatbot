const { getClosestQuestion } = require("./questions.service");

const handleUserQuery = async (req, res) => {
  const { userInput } = req.body;

  if (!userInput) {
    return res.status(400).json({
      status: false,
      message: "Por favor, proporciona una consulta válida.",
    });
  }

  try {
    const response = await getClosestQuestion(userInput);

    if (response.error) {
      return res.json({
        status: false,
        message: "No entendí tu consulta. Por favor, reformula tu pregunta.",
      });
    }

    res.json({
      status: true,
      message: "Consulta procesada con éxito.",
      data: {
        predefined: response.predefined,
        enhanced: response.enhanced,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Hubo un problema al procesar tu consulta.",
    });
  }
};

module.exports = { handleUserQuery };
