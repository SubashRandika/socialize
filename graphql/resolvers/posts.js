import { AuthenticationError } from "apollo-server-errors";
import Post from "../../models/Post.js";
import { checkAuthentication } from "../../util/checkAuth.js";

const postResolvers = {
	Query: {
		async getPosts() {
			try {
				const posts = await Post.find({}).sort({ createdAt: -1 });
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
	},
	Mutation: {
		async createPost(_, { body }, context) {
			const user = await checkAuthentication(context);

			const newPost = new Post({
				body,
				user: user.id,
				username: user.username
			});

			const post = await newPost.save();

			return post;
		},
		async deletePost(_, { id }, context) {
			const user = await checkAuthentication(context);

			try {
				const post = await Post.findById(id).exec();

				if (!post) {
					throw new Error("Does not exists. Post may be deleted");
				}

				if (user?.username === post?.username) {
					await post.delete();
					return "Post is deleted successfully";
				} else {
					throw new AuthenticationError("Not allowed to perform this action");
				}
			} catch (err) {
				throw new Error(err);
			}
		}
	}
};

export default postResolvers;
