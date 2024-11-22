const { getGeminiModel } = require("../../config/gemini");

/**
 * Consulta a Gemini y obtiene una respuesta generada.
 * @param {string} input - Pregunta del usuario.
 * @returns {Promise<string>} - Respuesta generada por Gemini.
 */
const queryGemini = async (input) => {
  try {
    // Obtiene el modelo desde la configuración
    const model = getGeminiModel();

    // Realiza la solicitud al modelo
    const result = await model.generateContent(input);
    const response = await result.response;

    return response.text();
  } catch (error) {
    console.error("Error al consultar la API de Gemini:", error.message);
    throw new Error("No se pudo procesar tu consulta.");
  }
};

module.exports = { queryGemini };
