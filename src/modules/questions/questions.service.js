const geminiRequest = require("../../config/gemini");
const questionsBank = require("./DTO/questions.DTO");

const getClosestQuestion = async (userInput) => {
  try {
    // Envía el texto a Gemini
    const geminiResponse = await geminiRequest(userInput);

    // Procesa la respuesta de Gemini
    const geminiOutput = geminiResponse.contents[0]?.parts[0]?.text || "";

    // Encuentra la pregunta más cercana
    const closestQuestion = questionsBank.find((question) =>
      geminiOutput.includes(question.keywords)
    );

    if (closestQuestion) {
      return {
        predefined: closestQuestion.answer, // Respuesta predefinida
        enhanced: geminiOutput,            // Respuesta mejorada de Gemini
      };
    } else {
      return { error: "No se encontró una pregunta similar." };
    }
  } catch (error) {
    console.error("Error en el servicio de preguntas:", error.message);
    throw new Error("Error al procesar la consulta del usuario.");
  }
};

module.exports = { getClosestQuestion };
