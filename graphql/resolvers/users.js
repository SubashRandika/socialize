import { UserInputError } from "apollo-server-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import { validateRegisterInput, validateLoginInput } from "../../util/validations.js";

const generateToken = (user) => {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username
		},
		process.env.SECRET_KEY,
		{ expiresIn: "1h" }
	);
};

const userResolvers = {
	Mutation: {
		async register(parent, { registerInput }, context, info) {
			// Validate user input data
			let { username, email, password, confirmPassword } = registerInput;
			const { errors, isValid } = validateRegisterInput(username, email, password, confirmPassword);

			if (!isValid) {
				throw new UserInputError("Errors", { errors });
			}

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

			const token = generateToken(result);

			return {
				...result._doc,
				id: result._id,
				token
			};
		},
		async login(parent, { username, password }, context, info) {
			const { errors, isValid } = validateLoginInput(username, password);

			if (!isValid) {
				throw new UserInputError("Errors", { errors });
			}

			const user = await User.findOne({ username });

			if (!user) {
				errors.general = "User you are looking for not found";
				throw new UserInputError("User you are looking for not found", { errors });
			}

			const match = await bcrypt.compare(password, user.password);

			if (!match) {
				errors.general = "Incorrect password provided";
				throw new UserInputError("Incorrect password provided", { errors });
			}

			const token = generateToken(user);

			return {
				...user._doc,
				id: user._id,
				token
			};
		}
	}
};

export default userResolvers;
