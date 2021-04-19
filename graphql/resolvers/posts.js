import Post from "../../models/Post.js";

const postResolvers = {
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

export default postResolvers;
