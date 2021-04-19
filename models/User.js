import mongoose from "mongoose";

const { model, Schema } = mongoose;

const userSchema = new Schema(
	{
		username: String,
		password: String,
		email: String
	},
	{
		timestamps: true
	}
);

const User = model("User", userSchema);

export default User;
