import { gql } from "apollo-server";

const typeDefs = gql`
	scalar DateTime
	type Post {
		id: ID!
		body: String!
		username: String!
		createdAt: DateTime
	}
	type User {
		id: ID!
		username: String!
		email: String!
		token: String!
		createdAt: DateTime
	}
	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}
	type Query {
		getPosts: [Post]
	}
	type Mutation {
		register(registerInput: RegisterInput): User
	}
`;

export default typeDefs;
