const { GoogleGenerativeAI } = require("@google/generative-ai");

// Inicializa el cliente con la clave de API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Obtiene el modelo generativo para interactuar con la API de Gemini.
 * @returns {Object} - Modelo inicializado de Gemini.
 */
const getGeminiModel = () => {
  try {
    return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  } catch (error) {
    console.error("Error al inicializar el modelo de Gemini:", error.message);
    throw new Error("No se pudo inicializar el modelo de Gemini.");
  }
};

module.exports = { getGeminiModel };
