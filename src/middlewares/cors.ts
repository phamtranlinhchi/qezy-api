import { NextFunction, Request, RequestHandler, Response } from "express";

const cors = { origin: "*" };

export const corsHeader: RequestHandler = (_req: Request, res: Response, next: NextFunction) => {
    res.header("Cross-Origin-Resource-Policy", "cross-origin");
    res.header("Access-Control-Allow-Origin", cors.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Auth-Token, Content-Type, Accept, Authorization, AuthUser");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
    res.header("optionsSuccessStatus", "200");
    next();
};
