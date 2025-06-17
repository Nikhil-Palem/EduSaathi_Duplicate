import mongoose from 'mongoose';


// Define the address schema
const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
});

// Define the contact information schema
const contactInformationSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
    permanentAddress: { type: addressSchema, required: true },
    correspondenceAddress: addressSchema // This field is optional
});

// Define the parents information schema
const parentsSchema = new mongoose.Schema({
    parentsName: { type: String, required: true },
    parentsOccupation: { type: String, required: true },
    parentsContactInformation: { type: contactInformationSchema, required: true },
});

// Define the academic information schema
const schoolSchema = new mongoose.Schema({
    schoolInfo: { type: String, required: true },
    schoolAddress: { type: addressSchema, required: true },
    schoolContactInformation: {
        type: contactInformationSchema, //required: true

    },
});

const boardExamSchema = new mongoose.Schema({
    boardName: { type: String, required: true },
    yearOfPassing: { type: Date, required: true },
    rollNumber: { type: String, required: true },
    subjects: {
        type: [String],
        required: true
    },
});

const academicRecordsSchema = new mongoose.Schema({
    class10Marks: {
        marksObtained: { type: String, required: true },
        boardType: { type: boardExamSchema, required: true },
    },
    class12Marks: {
        marksObtained: { type: String, required: true }, boardType: { type: boardExamSchema, required: true }
    },
});

const academicModelSchema = new mongoose.Schema({
    schoolInformation: { type: schoolSchema, required: true },
    academicRecords: { type: academicRecordsSchema, required: true },
});

const entranceExamSchema = new mongoose.Schema({
    nameOfExam: { type: String, required: true },
    rollNumber: { type: String, required: true },
    rank: { type: Number, required: true },
    dateOfExam: { type: Date, required: true },
});

const extracurricularActivitySchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., Sports, Arts, Music, Volunteer Work, Clubs, Societies
    details: { type: String, required: true },
});

const achievementSchema = new mongoose.Schema({
    title: { type: String, required: true }, // e.g., Competitions Won, Certificates, Recognitions
    description: { type: String, required: true },
});

const additionalInformationSchema = new mongoose.Schema({
    statementOfPurpose: { type: String },
    lettersOfRecommendation: [{ type: String }],
    photograph: { type: String }, // URL or file path to the photograph
    signature: { type: String }, // URL or file path to the signature
    category: { type: String, enum: ['General', 'SC', 'ST', 'OBC', 'EWS'] },
    casteCertificateNumber: { type: String },
});

const documentSchema = new mongoose.Schema({
    proofOfIdentity: { type: String, enum: ['Aadhar Card', 'Passport', 'Voter ID'], required: true },
    proofOfAddress: { type: String, required: true },
    passportSizedPhotographs: [{ type: String, required: true }],
    academicCertificates: [{ type: String, required: true }],
    entranceExamAdmitCard: { type: String, required: true },
});

const applicationSchema = new mongoose.Schema({
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
    grade: {
        type: String,
        required: true
    },
    bitSatFile: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    percentage_9: {
        type: Number,
    },
    markSheet_9:{
      type: String,
    },
    percentage_10: {
        type: Number
    },
    markSheet_10:{
        type: String,
    },
    percentage_11: {
        type: Number
    },
    markSheet_11:{
        type: String,
    },
    percentage_12: {
        type: Number,
        required: true,
    },
    markSheet_12:{
        type: String,
        required: true,
    },
    additionalExams:{
      type: String
    },
    contactInformation: {
        type: contactInformationSchema,
        // required: true,
    },
    familyInformation: {
        type: parentsSchema,
        // required: true,
    },
    academicInformation: {
        type: academicModelSchema,
        // required: true,
    },
    entranceExamInformation: {
        type: entranceExamSchema,
    },
    extracurricularActivities: {
        type: [extracurricularActivitySchema],
    },
    achievementsAndAwards: {
        type: [achievementSchema],
    },
    additionalInformation: {
        type: additionalInformationSchema,
    },
    otherDocuments: {
        type: documentSchema,
    }
});

export const Application = mongoose.model('Application', applicationSchema);
