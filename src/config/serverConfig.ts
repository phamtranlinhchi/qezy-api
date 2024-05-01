import { getCorsOriginWhitelist } from "../libs/env";
import vars from "../config/vars";

export const serverConfig = {
    port: vars.server.port,
    debugLevel: vars.server.debugLevel,
    jsonMaxSize: vars.server.jsonMaxSize,
    cwd: process.cwd(),
    corsOrigin: vars.server.corsOrigin,
    corsOriginWhitelist: getCorsOriginWhitelist(vars.server.corsOrigin)
};
