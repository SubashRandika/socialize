import { DateTimeResolver } from "graphql-scalars";
import postResolvers from "./posts.js";

const resolvers = {
	DateTime: DateTimeResolver,
	Query: {
		...postResolvers.Query
	}
};

export default resolvers;
