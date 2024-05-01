import express, { Application, NextFunction } from "express";
import bodyParser from "body-parser";
import { HttpStatusCode } from "axios";

import routers from "./routes";
import { corsHeader as cors } from "./middlewares/cors";
import { ApiError, errorConverter, errorHandler } from "./middlewares/error";
import { successLogger, errorLogger } from "./helpers/morgan";
import { connectToMongoDB } from "./config/dbConfig";
import checkAndSeedData from "./config/seedSate";
export const app: Application = express();

// For passing current user
declare module "express-serve-static-core" {
	interface Request {
		currentUser?: string;
	}
}
app.use(successLogger);
app.use(errorLogger);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors);
app.use("/api", routers);

app.use((req, res, next: NextFunction) => {
	next(new ApiError(HttpStatusCode.NotFound, "Non-existent API"));
});
app.use(express.static("public"));
// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
connectToMongoDB();
checkAndSeedData();
