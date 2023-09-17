import express from "express";
import academicDepartmentRouter from "../modules/academic-department/academicDepartment.route";
import academicFacultyRouter from "../modules/academic-faculty/academicFaculty.route";
import semesterRouter from "../modules/academic-semister/academicSemister.route";
import authRouter from "../modules/auth/auth.route";
import studentRouter from "../modules/student/student.route";
import userRouter from "../modules/users/user.route";

const router = express.Router();

const applicationRoutes = [
    { path: '/users', controller: userRouter },
    { path: "/academic-semester", controller: semesterRouter },
    { path: "/academic-faculty", controller: academicFacultyRouter },
    { path: "/academic-department", controller: academicDepartmentRouter },
    { path: "/students", controller: studentRouter },
    { path: "//auth", controller: authRouter }
];


applicationRoutes.forEach(route => {
    router.use(route.path, route.controller);
});

export default router;