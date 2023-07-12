import { Schema } from "mongoose";


export const studentSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {

        type: {
            firstName: { type: String, required: true },
            middleName: { type: String },
            lastName: { type: String, required: true }
        }
    },
    gender: {
        type: String, required: true, enum: ['Male', 'Female']
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    emergencyContactNo: {
        type: String,
        required: true
    },
    presentAddress: {
        type: String,
        required: true
    },
    guardian: {

        type: {
            fatherName: {
                type: String,
                required: true
            },
            fatherOccupation: {
                type: String,
                required: true
            },
            fatherContactNo: {
                type: String,
                required: true
            },
            motherName: {
                type: String,
                required: true
            },
            motherOccupation: {
                type: String,
                required: true
            },
            motherContactNo: {
                type: String,
                required: true
            }
        }
    },
    localGuardian: {
        type: {
            name: {
                type: String,
                required: true
            },
            occupation: {
                type: String,
                required: true
            },
            contactNo: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            }
        }

    },
    profileImage: {
        type: String,
        required: true,
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,

    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
        required: true,
    },
    academicSemester: {
        type: Schema.Types.ObjectId,
        ref: 'Academic-Semester',
        required: true,
    }
}, {
    timestamps: true, toJSON: {
        virtuals: true
    }
});