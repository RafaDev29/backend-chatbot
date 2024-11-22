const axios = require("axios");

const geminiRequest = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: input }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al consultar la API de Gemini:", error.response?.data || error.message);
    throw new Error("Error en la consulta a Gemini.");
  }
};

module.exports = geminiRequest;
