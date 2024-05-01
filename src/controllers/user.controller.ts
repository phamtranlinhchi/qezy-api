
import { Request, Response } from "express";
import { HttpStatusCode } from "axios";
import catchAsync from "../helpers/catchAsync";
import userService from "../services/user.service";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ZMIRoles } from "../models/user.model";

// [POSt] /user/login
const login = catchAsync(async (req: Request, res: Response) => {
    const { email, name, idToken, avatar } = req.body;
    const decode = jwt.decode(idToken) as JwtPayload;

    const role = decode.roles ? decode.roles[0] : ZMIRoles.Guest;
    const result = await userService.login(email, name, role, avatar);
    return res.status(HttpStatusCode.Ok).json(result);
});

// [GET] /user/role
const getRole = catchAsync(async (req: Request, res: Response) => {
    const { idToken }= req.query;
    const decode = jwt.decode(idToken as string) as JwtPayload;
    
    const role = decode.roles ? decode.roles[0] : ZMIRoles.Guest;
    return res.status(HttpStatusCode.Ok).json(role);
});

// [GET] /user
const getUser = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.query;
    const result = await userService.getUser(email as string);

    return res.status(HttpStatusCode.Ok).json(result);
});

// [GET] /user/users
const getUsersByRole = catchAsync(async (req: Request, res: Response) => {
    const { role } = req.query;
    const result = await userService.getUsersByRole(role as string);

    return res.status(HttpStatusCode.Ok).json(result);
});

export default {
    login,
    getRole,
    getUser,
    getUsersByRole
};