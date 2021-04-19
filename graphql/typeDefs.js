import { gql } from "apollo-server";

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

export default typeDefs;
