import mongoose from 'mongoose';

const awardSchema = new mongoose.Schema({
    title: String,
    issuer: String,
    year: String,
    description: String
});

const applicationSchema = new mongoose.Schema(
    {
        studentRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // Replace 'Student' with the actual name of the referenced model
        },
        personalInfo: {
            fullName: String,
            email: String,
            phone: String,
            gender: String,
            dateOfBirth: String,
            address: String,
            nationality: String
        },
        educationalInfo: {
            highestQualification: String,
            institution: String,
            graduationYear: String,
            grade: String,
            major: String
        },
        testScores: {
            jeeScore: String,
            neetScore: String,
            satScore: String,
            greScore: String,
            gmatScore: String
        },
        activitiesInfo: {
            extracurriculars: [String],
            leadershipRoles: [String],
            volunteerExperience: [String]
        },
        newAward: awardSchema,
        awards: [awardSchema]
    },
    {
        timestamps: true
    }
);

const Application = mongoose.model('Application', applicationSchema);

export default Application;