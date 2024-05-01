import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";
import axios from "axios";

import { ApiError } from "./error";
import catchAsync from "../helpers/catchAsync";
import logger from "../helpers/logger";

export const auth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization?.split(" ")[1];

      if (!accessToken)
        return next(
          new ApiError(HttpStatusCode.Unauthorized, "No access token found")
        );
      const decodedToken = jwt.decode(accessToken as string) as JwtPayload;
      const draphonyTenantId = "c155ecd2-141c-4fea-8f38-5c1358b3430a";

      const profile = await axios.get("https://graph.microsoft.com/v1.0/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (
        decodedToken.tid === draphonyTenantId &&
        profile.data.officeLocation.toLowerCase().includes("draphony")
      ) {
        logger.info(
          `[${new Date().toISOString()}] - Session-user: ${decodedToken.name} using account ${decodedToken.unique_name}`
        );
        req.currentUser = decodedToken.unique_name;
        return next();
      }

      // if () {
      //   logger.info(
      //     `[${new Date().toISOString()}] - Session-user: ${decodedToken.name} using account ${decodedToken.unique_name}`
      //   );
      //   req.currentUser = decodedToken.unique_name;
      //   return next();
      // }
      return next(
        new ApiError(HttpStatusCode.Unauthorized, "User must in Draphony tenant")
      );
    } catch (err) {
      throw new ApiError(HttpStatusCode.Unauthorized, "Invalid access token");
    }
  }
);
