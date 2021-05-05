import { DateTimeResolver } from "graphql-scalars";
import postResolvers from "./posts.js";
import userResolvers from "./users.js";

const resolvers = {
	DateTime: DateTimeResolver,
	Query: {
		...postResolvers.Query
	},
	Mutation: {
		...userResolvers.Mutation
	}
};

export default resolvers;
