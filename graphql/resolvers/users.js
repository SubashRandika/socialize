import { UserInputError } from "apollo-server-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const userResolvers = {
	Mutation: {
		async register(parent, { registerInput }, context, info) {
			let { username, email, password, confirmPassword } = registerInput;
			// TODO: Validate Data
			
			//make sure user already exists
			const user = await User.findOne({ username });

			if (user) {
				throw new UserInputError("Username is taken", {
					errors: {
						username: "This username is already taken"
					}
				});
			}

			//hash the password and create an auth token
			password = await bcrypt.hash(password, 12);

			const newUser = new User({
				email,
				username,
				password
			});

			const result = await newUser.save();

			const token = jwt.sign(
				{
					id: result.id,
					email: result.email,
					username: result.username
				},
				process.env.SECRET_KEY,
				{ expiresIn: "1h" }
			);

			return {
				...result._doc,
				id: result._id,
				token
			};
		}
	}
};

export default userResolvers;
