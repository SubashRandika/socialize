import { AuthenticationError } from "apollo-server-errors";
import jwt from "jsonwebtoken";

export const checkAuthentication = async (context) => {
	const authHeader = context.req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split("Bearer ")[1];

		if (token) {
			try {
				const user = jwt.verify(token, process.env.SECRET_KEY);
				return user;
			} catch (error) {
				throw new AuthenticationError("Invalid or already expired token");
			}
		}

		throw new Error("Authorization header must be in format 'Bearer [TOKEN]'");
	}

	throw new Error("Authorization header must be provided");
};
