const { getGeminiModel } = require("../../config/gemini");
const questionsBank = require("./DTO/questions.DTO");

/**
 * Encuentra la pregunta más similar utilizando Gemini.
 * @param {string} userInput - Pregunta ingresada por el usuario.
 * @returns {Promise<object>} - Respuesta con la pregunta y respuesta más cercana, o mensaje de error.
 */
const findClosestQuestion = async (userInput) => {
  try {
    // Obtiene el modelo de Gemini
    const model = getGeminiModel();

    // Banco de preguntas concatenadas como texto
    const questionsText = questionsBank
      .map((q) => `${q.id}. ${q.question}`)
      .join("\n");

    // Prompt para la IA
    const prompt = `
      Here is a list of predefined questions with their IDs:
      ${questionsText}
      Based on the user's query: "${userInput}", 
      respond only with the ID of the question that matches most closely.
      If no question matches, respond with "false".
    `;

    console.log("Prompt enviado a Gemini:", prompt);

    // Solicitud a la API de Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Extrae el texto utilizando el método correcto
    const geminiResponse = await response.text();
    console.log("Respuesta de Gemini:", geminiResponse);

    // Manejo del resultado
    const closestQuestionId = geminiResponse.trim().toLowerCase() === "false"
      ? null
      : parseInt(geminiResponse.trim(), 10);

    if (!closestQuestionId || isNaN(closestQuestionId)) {
      return { error: "No se encontró una coincidencia para la pregunta ingresada." };
    }

    // Busca la pregunta más cercana en el banco por ID
    const closestQuestion = questionsBank.find((q) => q.id === closestQuestionId);

    if (closestQuestion) {
      console.log("Pregunta encontrada en el banco:", closestQuestion);
      return {
        id: closestQuestion.id,
        question: closestQuestion.question,
        answer: closestQuestion.answer,
      };
    }

    return { error: "La IA encontró un ID, pero no coincide con nuestro banco." };
  } catch (error) {
    console.error("Error al consultar la API de Gemini o procesar datos:", error.response?.data || error.message);
    throw new Error("Error al procesar la consulta del usuario.");
  }
};

module.exports = { findClosestQuestion };
