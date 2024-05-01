// import { Request, Response } from "express";
// import { HttpStatusCode } from "axios";

// // import { signInUser } from "../services/auth.service";
// import catchAsync from "../helpers/catchAsync";

// [POST] /auth/signin
// const login = catchAsync(async (req: Request, res: Response) => {
//   const result = await signInUser(req.body);
//   if (result.success)
//     return res.status(HttpStatusCode.Ok).json({ message: "Login successfull" });
// });

// [POST] /auth/signup
// const register = catchAsync(async (req: Request, res: Response) => {
//   const result = await signInUser(req.body);
//   if (result.success)
//     return res.status(HttpStatusCode.Ok).json({ message: "New user" });
// });

// export default {
//   login,
//   register
// };
