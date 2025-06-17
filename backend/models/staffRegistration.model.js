import mongoose from 'mongoose';

const staffRegistrationSchema = new mongoose.Schema({
    collegeName: {
      type: String,
      required: true
    },
    branchName: {
      type: String,
      required: true
    },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CreatedCollege',
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lead',
      required: true
    }
  });

  export const StaffRegistration = mongoose.model('StaffRegistration', staffRegistrationSchema, 'staff_registration');