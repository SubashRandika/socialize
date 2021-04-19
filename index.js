import { ApolloServer, gql } from "apollo-server";
import dotenv from "dotenv";
import colors from "colors";

import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/root.js";
import connectDB from "./config/db.js";

dotenv.config();

const server = new ApolloServer({
	typeDefs,
	resolvers
});

const startServer = async () => {
	try {
		const port = process.env.PORT || 5000;
		const { url } = await server.listen({ port });

		console.log(`Server is running at ${url}`.brightYellow.underline);
	} catch (error) {
		console.error(`Server start error: ${error.message}`.brightRed);
		process.exit(1);
	}
};

await connectDB();
await startServer();
