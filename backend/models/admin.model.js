import mongoose, {Schema} from 'mongoose';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema({
    username: {type: String, required: true},
    acronym: {type: String, required: true},
    name: { type: String, required: true },
    collegeType: { type: String, required: true },
    contactNumber: { type: String, required: true },
    state: { type: String, required: true },
    email: { type: String, required: true },
    position: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    eduId: { type: String, required: true },
    applications : [{ type: Schema.Types.ObjectId, ref: 'Application' }],
    password: { type: String, required: true },
    college_logo: { type: String },
    college_link: { type: String},
}, {timestamps: true});

adminSchema.pre("save", async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcryptjs.hash(this.password, 10);

    next();
})

adminSchema.methods.comparePassword = async function(password) {
    return await bcryptjs.compare(password, this.password);
}

adminSchema.methods.generateToken = async function(){
    return jwt.sign(
        {_id: this._id}
        , process.env.SECRET,
        {expiresIn: '1d'})
}

export const Admin = mongoose.model('Admin', adminSchema);

