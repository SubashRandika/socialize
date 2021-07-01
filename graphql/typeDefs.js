import { gql } from "apollo-server";

const typeDefs = gql`
	scalar DateTime
	type Post {
		id: ID!
		body: String!
		username: String!
		createdAt: DateTime
		comments: [Comment]!
		commentCount: Int!
		likes: [Like]!
		likeCount: Int!
	}
	type Comment {
		id: ID!
		body: String!
		username: String!
		createdAt: DateTime
	}
	type Like {
		id: ID!
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
		getPost(id: ID!): Post
	}
	type Mutation {
		register(registerInput: RegisterInput): User!
		login(username: String!, password: String!): User!
		createPost(body: String!): Post!
		deletePost(id: ID!): String!
		createComment(postId: ID!, body: String!): Post!
		deleteComment(postId: ID!, commentId: ID!): Post!
		likePost(postId: ID!): Post!
	}
	type Subscription {
		newPost: Post!
	}
`;

export default typeDefs;
