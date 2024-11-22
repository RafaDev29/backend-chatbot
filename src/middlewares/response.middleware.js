/**
 * Middleware para formatear respuestas del servidor.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Llamada al siguiente middleware.
 */
const formatResponseMiddleware = (req, res, next) => {
    const originalJson = res.json;
  
    res.json = function (body) {
      if (body.status === true && body.data) {
        // Verifica si `data` es un objeto o un texto
        if (typeof body.data === "string") {
          // Si `data` es texto, procesa como líneas
          body.data = processResponseData(body.data);
        } else if (typeof body.data === "object" && !Array.isArray(body.data)) {
          // Si `data` es un objeto, agrega metadatos
          body.data = processObjectData(body.data);
        }
      }
      return originalJson.call(this, body);
    };
  
    next();
  };
  
  /**
   * Procesa el contenido de `data` si es un texto, limpiándolo y convirtiéndolo en una lista.
   * @param {string} data - Texto bruto de la respuesta.
   * @returns {Object[]} - Lista de objetos procesados.
   */
  const processResponseData = (data) => {
    const lines = data.split("\n").filter((line) => line.trim() !== "");
  
    return lines.map((line, index) => ({
      id: index + 1,
      content: cleanText(line.trim()),
      extraInfo: `Processed at ${new Date().toISOString()}`,
    }));
  };
  
  /**
   * Procesa el contenido de `data` si es un objeto, agregando metadatos.
   * @param {Object} data - Objeto a procesar.
   * @returns {Object} - Objeto procesado con metadatos.
   */
  const processObjectData = (data) => {
    return {
      ...data, // Mantén los campos originales
      processedAt: new Date().toISOString(), // Agrega la marca de tiempo
    };
  };
  
  /**
   * Limpia el texto eliminando formato especial (por ejemplo, **bold** -> bold).
   * @param {string} text - Texto a limpiar.
   * @returns {string} - Texto limpio.
   */
  const cleanText = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, "$1");
  };
  
  module.exports = { formatResponseMiddleware };
  