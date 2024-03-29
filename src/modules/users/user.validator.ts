import { z } from "zod";

export const createUserZodSchema = z.object({
    body: z.object({

        // role: z.enum(['student', 'admin', 'faculty'], {
        //     required_error: "Role is required",
        //     invalid_type_error: "Role type should be string",
        // }).refine((value) => {
        //     return ['student', 'admin', 'faculty'].includes(value);
        // }, { message: "role must be one of 'student','admin','faculty'", path: ['role'] }),
        password: z.string().optional(),
        student: z.object({
            name: z.object({
                firstName: z.string({
                    required_error: "firstName is required",
                    invalid_type_error: "firstName type should be string",
                }),
                middleName: z.string().optional(),
                lastName: z.string({
                    required_error: "lastName is required",
                    invalid_type_error: "lastName type should be string",
                }),
            }),
            gender: z.enum(["Male", "Female"], {
                required_error: "gender is required",
                invalid_type_error: "gender type should be string",
            }).refine((value) => {
                return ["Male", "Female"].includes(value);
            }, { message: "Gender must be one of 'Male' , 'Female'", path: ['gender'] }),
            dateOfBirth: z.string({
                required_error: "gender is required",
                invalid_type_error: "gender type should be string",
            }),
            bloodGroup: z.enum([
                "A+",
                "A-",
                "B+",
                "B-",
                "AB+",
                "AB-",
                "O+",
                "O-",
            ]).optional(),
            email: z.string({
                required_error: "email is required",
                invalid_type_error: "email type should be string",
            }).email({ message: "Invalid email address" }),
            emergencyContactNo: z.string({
                required_error: "emergencyContactNo is required",
                invalid_type_error: "emergencyContactNo type should be string",
            }),
            presentAddress: z.string({
                required_error: "presentAddress is required",
                invalid_type_error: "presentAddress type should be string",
            }),
            guardian: z.object({
                fatherName: z.string({
                    required_error: "fatherName is required",
                    invalid_type_error: "fatherName type should be string",
                }),
                fatherOccupation: z.string({
                    required_error: "fatherOccupation is required",
                    invalid_type_error: "fatherOccupation type should be string",
                }),
                fatherContactNo: z.string({
                    required_error: "gender is required",
                    invalid_type_error: "gender type should be string",
                }),
                motherName: z.string({
                    required_error: "gender is required",
                    invalid_type_error: "gender type should be string",
                }),
                motherOccupation: z.string({
                    required_error: "motherOccupation is required",
                    invalid_type_error: "motherOccupation type should be string",
                }),
                motherContactNo: z.string({
                    required_error: "motherContactNo is required",
                    invalid_type_error: "motherContactNo type should be string",
                }),
            }),
            localGuardian: z.object({
                name: z.string({
                    required_error: "localGuardin name is required",
                    invalid_type_error: "localGuardin name type should be string",
                }),
                occupation: z.string({
                    required_error: "localGuardin occupation is required",
                    invalid_type_error: "localGuardin occupation type should be string",
                }),
                contactNo: z.string({
                    required_error: "localGuardin contact is required",
                    invalid_type_error: "localGuardin contact type should be string",
                }),
                address: z.string({
                    required_error: "localGuardin address is required",
                    invalid_type_error: "localGuardin address type should be string",
                }),
            }),
            profileImage: z.string().optional(),
        })
    })

});

// export const createFacultyZodSchema = z.object({
//     body: z.object({
//         password: z.string().optional(),
//         faculty: z.object({
//             name: z.object({
//                 firstName: z.string({
//                     required_error: 'First name is required',
//                 }),
//                 lastName: z.string({
//                     required_error: 'Last name is required',
//                 }),
//                 middleName: z.string().optional(),
//             }),
//             gender: z.string({
//                 required_error: 'Gender is required',
//             }),
//             dateOfBirth: z.string({
//                 required_error: 'Date of birth is required',
//             }),
//             email: z
//                 .string({
//                     required_error: 'Email is required',
//                 })
//                 .email(),
//             contactNo: z.string({
//                 required_error: 'Contact number is required',
//             }),
//             emergencyContactNo: z.string({
//                 required_error: 'Emergency contact number is required',
//             }),
//             bloodGroup: z
//                 .string({
//                     required_error: 'Blood group is required',
//                 })
//                 .optional(),
//             presentAddress: z.string({
//                 required_error: 'Present address is required',
//             }),
//             permanentAddress: z.string({
//                 required_error: 'Permanent address is required',
//             }),
//             academicDepartment: z.string({
//                 required_error: 'Academic department is required',
//             }),

//             academicFaculty: z.string({
//                 required_error: 'Academic faculty is required',
//             }),
//             designation: z.string({
//                 required_error: 'Designation is required',
//             }),
//             profileImage: z.string().optional(),
//         }),
//     }),
// });

// export const createAdminZodSchema = z.object({
//     body: z.object({
//         password: z.string().optional(),

//         admin: z.object({
//             name: z.object({
//                 firstName: z.string({
//                     required_error: 'First name is required',
//                 }),
//                 lastName: z.string({
//                     required_error: 'Last name is required',
//                 }),
//                 middleName: z.string().optional(),
//             }),

//             dateOfBirth: z.string({
//                 required_error: 'Date of birth is required',
//             }),

//             gender: z.string({
//                 required_error: 'Gender is required',
//             }),

//             bloodGroup: z.string({
//                 required_error: 'Blood group is required',
//             }),

//             email: z
//                 .string({
//                     required_error: 'Email is required',
//                 })
//                 .email(),

//             contactNo: z.string({
//                 required_error: 'Contact number is required',
//             }),

//             emergencyContactNo: z.string({
//                 required_error: 'Emergency contact number is required',
//             }),

//             presentAddress: z.string({
//                 required_error: 'Present address is required',
//             }),

//             permanentAddress: z.string({
//                 required_error: 'Permanent address is required',
//             }),

//             managementDepartment: z.string({
//                 required_error: 'Management department is required',
//             }),

//             designation: z.string({
//                 required_error: 'Designation is required',
//             }),

//             profileImage: z.string().optional(),
//         }),
//     }),
// });