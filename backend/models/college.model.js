import mongoose from 'mongoose';
//mongodb+srv://edusaathiapp:VTKg02g78nvxpmn5@cluster0.llyzhsl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const collegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    collegeLogo: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
}, {timestamps: true});

export const College = mongoose.model('College', collegeSchema);

