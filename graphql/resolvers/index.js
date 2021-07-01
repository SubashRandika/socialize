import { DateTimeResolver } from "graphql-scalars";
import postResolvers from "./posts.js";
import userResolvers from "./users.js";
import commentResolvers from "./comments.js";

const resolvers = {
	DateTime: DateTimeResolver,
	Query: {
		...postResolvers.Query
	},
	Mutation: {
		...userResolvers.Mutation,
		...postResolvers.Mutation,
		...commentResolvers.Mutation
	}
};

export default resolvers;
