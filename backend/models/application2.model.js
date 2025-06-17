// Given Name:
//
//     Middle Name:
//
//     Last Name:
//
//     Date of Birth:
//
//     Social Category: General
//
// Custom Category:
import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    applicationName: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    socialCategory: {
        type: String,
        required: true,
    },
    schoolName: {
        type: String,
        required: true
    },
    schoolAddress: {
        type: String,
        required: true
    },
    schoolCity: {
        type: String,
        required: true
    },
    schoolState: {
        type: String,
        required: true
    },
    grades: {
        type: [],
        required: true
    },
    percentage:{
        type: [],
        required: true
    },
    marksheets:{
        type: []
    },
    testScoreExam:{
        type:[]
    },
    testScore:{
        type: []
    }

});
export const Application2 = mongoose.model('Application2', applicationSchema);