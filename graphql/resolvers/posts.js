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
		},
		async getPost(_, { id }) {
			try {
				if (!id.match(/^[0-9a-fA-F]{24}$/)) {
					throw new Error("Invalid post id");
				}

				const post = await Post.findById(id).exec();

				if (!post) {
					throw new Error("Post cannot be found");
				}

				return post;
			} catch (error) {
				throw new Error(error);
			}
		}
	}
};

export default postResolvers;
