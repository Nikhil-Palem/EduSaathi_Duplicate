import mongoose from 'mongoose'

const studentStaffMappingSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming 'User' is your student model
    required: true
  },
  staff_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead', // Assuming 'Lead' is your staff model
    required: true
  },
  college_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CreatedCollege', // Assuming this is your college model
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

export const StudentStaffMapping= mongoose.model('StudentStaffMapping', studentStaffMappingSchema);
