import mongoose, { Document, Schema } from "mongoose";

export interface ApplicationDocument extends Document{
  userId: mongoose.Types.ObjectId,
  jobId: mongoose.Types.ObjectId,
  companyid: mongoose.Types.ObjectId,
  recruiterId: mongoose.Types.ObjectId
}

 const applicationSchema = new Schema<ApplicationDocument>({
  userId: {
    type: Schema.Types.ObjectId,
     ref: "User",
    required:true
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref:"Job",
    required:true
  },
  companyid: {
    type: Schema.Types.ObjectId,
    ref:"Company",
    required:true
  },
  recruiterId: {
    type: Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
})

 const ApplictionModel = mongoose.model<ApplicationDocument>("Application",applicationSchema)
export default ApplictionModel