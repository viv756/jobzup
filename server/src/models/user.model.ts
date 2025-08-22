import mongoose, { Document, Schema } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";
import { RoleEnum, RoleEnumType } from "../enums/user.enum";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  profile: mongoose.Types.ObjectId | null;
  company: mongoose.Types.ObjectId | null;
  role: RoleEnumType;
  comparePassword(value: string): Promise<boolean>;
  omitPassword(): Omit<UserDocument, "password">;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: true,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      default: null,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
    role: {
      type: String,
      enum: Object.values(RoleEnum),
    },
    profilePicture: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    if (this.password) {
      this.password = await hashValue(this.password);
    }
  }
  next();
});

userSchema.methods.omitPassword = function (): Omit<UserDocument, "password"> {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.methods.comparePassword = async function (value: string) {
  return compareValue(value, this.password);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
