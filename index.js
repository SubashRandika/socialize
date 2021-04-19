import { ApolloServer, gql } from "apollo-server";
import { DateTimeResolver } from "graphql-scalars";
import dotenv from "dotenv";
import colors from "colors";

import connectDB from "./config/db.js";
import Post from "./models/Post.js";

dotenv.config();

const typeDefs = gql`
	scalar DateTime
	type Post {
		id: ID!
		body: String!
		username: String!
		createdAt: DateTime
	}
	type Query {
		getPosts: [Post]
	}
`;

const resolvers = {
	DateTime: DateTimeResolver,
	Query: {
		async getPosts() {
			try {
				const posts = await Post.find();
				return posts;
			} catch (error) {
				throw new Error(error);
			}
		}
	}
};

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
