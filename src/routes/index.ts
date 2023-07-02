import express from "express";
import semesterRouter from "../modules/academic-semister/academicSemister.route";
import userRouter from "../modules/users/user.route";

const router = express.Router();

const applicationRoutes = [
    { path: '/users', controller: userRouter },
    { path: "/academic-semester", controller: semesterRouter }
];


applicationRoutes.forEach(route => {
    router.use(route.path, route.controller);
});

export default router;