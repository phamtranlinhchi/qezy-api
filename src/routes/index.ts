import express, { Router } from 'express';
// import { authRouter } from "./auth.route";
import { jobRouter } from './job.route';
import { userRouter } from './user.route';

const routers: Router = express.Router();

const defaultRoutes = [
  // {
  //   path: "/users",
  //   router: authRouter
  // },
  {
    path: '/jobs',
    router: jobRouter,
  },
  {
    path: '/user',
    router: userRouter,
  },
];

defaultRoutes.forEach((route) => {
  routers.use(route.path, route.router);
});

export default routers;
