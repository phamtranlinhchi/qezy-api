import express, { Router } from 'express';
// import { authRouter } from "./auth.route";
import { userRouter } from './user.route';
import { examRouter } from './exam.route';
import { questionRouter } from './question.route';
import { examResultRouter } from './examResult.route';

const routers: Router = express.Router();

const defaultRoutes = [
  // {
  //   path: "/users",
  //   router: authRouter
  // },
  {
    path: '/users',
    router: userRouter,
  },
  {
    path: '/exams',
    router: examRouter,
  },
  {
    path: '/questions',
    router: questionRouter,
  },
  {
    path: '/results',
    router: examResultRouter,
  },
];

defaultRoutes.forEach((route) => {
  routers.use(route.path, route.router);
});

export default routers;
