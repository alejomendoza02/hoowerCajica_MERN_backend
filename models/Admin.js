import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

  // Function for compare passwords

  adminSchema.methods.checkPassword = async function(passwordForm){
    return await bcrypt.compare(passwordForm, this.password)
}

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
