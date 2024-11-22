const { GoogleGenerativeAI } = require("@google/generative-ai");

// Inicializa el cliente con la clave de API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Consulta a Gemini y obtiene una respuesta generada.
 * @param {string} input - Pregunta del usuario.
 * @returns {Promise<string>} - Respuesta generada por Gemini.
 */
const queryGemini = async (input) => {
  try {
    // Selecciona el modelo adecuado
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
