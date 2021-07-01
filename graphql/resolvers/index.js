import { DateTimeResolver } from "graphql-scalars";
import postResolvers from "./posts.js";
import userResolvers from "./users.js";
import commentResolvers from "./comments.js";

const resolvers = {
	DateTime: DateTimeResolver,
	Post: {
		likeCount: (parent) => parent.likes.length,
		commentCount: (parent) => parent.comments.length
	},
	Query: {
		...postResolvers.Query
	},
	Mutation: {
		...userResolvers.Mutation,
		...postResolvers.Mutation,
		...commentResolvers.Mutation
	},
	Subscription: {
		...postResolvers.Subscription
	}
};

export default resolvers;
