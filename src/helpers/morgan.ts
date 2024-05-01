import morgan from "morgan";
import logger from "./logger";

const getIpFormat = () => "[:date[iso]] - "; 
const responseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;

export const successLogger = morgan(responseFormat, {
  skip: (req, res) => {
    return res.statusCode >= 400;
  },
  stream: { write: (message) => logger.info(message.trim()) },
});

export const errorLogger = morgan(responseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

