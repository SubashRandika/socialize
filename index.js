import express from "express";
import path from "path";
import { ApolloServer, PubSub } from "apollo-server";
import dotenv from "dotenv";
import colors from "colors";

import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";
import connectDB from "./config/db.js";

const app = express();
dotenv.config();

const pubsub = new PubSub();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req, pubsub })
});

const startServer = async () => {
	try {
		if (process.env.NODE_ENV === "production") {
			const __dirname = path.resolve();
			app.use(path.resolve(__dirname, "public"));

			app.get("*", (req, res) => {
				res.sendFile(path.resolve(__dirname, "public", "index.html"));
			});
		}

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
