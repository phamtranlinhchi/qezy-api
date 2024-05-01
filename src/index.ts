import http from 'http';
// import { WebSocketServer } from "ws";
import schedule from 'node-schedule';

import { app } from './app';
import { serverConfig } from './config/serverConfig';
import logger from './helpers/logger';
import vars from './config/vars';
// import { sendEmail } from "./services/mail.service";

const server = http.createServer(app);
// const wss = new WebSocketServer({ server });

// scheduleFuncs.updateLatestDataFromDatalake();

server.listen(serverConfig, async () => {
  logger.info(
    `[${new Date().toISOString()}] - Current environment: ${vars.env}`
  );
  logger.info(
    `[${new Date().toISOString()}] - Server configuration: ${JSON.stringify(
      serverConfig
    )}`
  );
});
// const exitHandler = () => {
// 	if (server) {
// 		server.close(() => {
// 			logger.info(`[${new Date().toISOString()}] - Server closed`);
// 			process.exit(1);
// 		});
// 	} else {
// 		process.exit(1);
// 	}
// };

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  // exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info(`[${new Date().toISOString()}] - SIGTERM received`);
  if (server) {
    server.close();
  }
});

process.on('SIGINT', function () {
  schedule.gracefulShutdown().then(() => process.exit(0));
});
