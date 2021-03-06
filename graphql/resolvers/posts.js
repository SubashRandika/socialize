import { UserInputError } from "apollo-server";
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
		async getPost(_, { postId }) {
			try {
				if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
					throw new Error("Invalid post id");
				}

				const post = await Post.findById(postId).exec();

				if (!post) {
					throw new UserInputError("Post cannot be found");
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

			if (body.trim() === "") {
				throw new UserInputError("Post body cannot be empty");
			}

			const newPost = new Post({
				body,
				user: user.id,
				username: user.username
			});

			const post = await newPost.save();

			context.pubsub.publish("NEW_POST", {
				newPost: post
			});

			return post;
		},
		async deletePost(_, { postId }, context) {
			const user = await checkAuthentication(context);

			try {
				const post = await Post.findById(postId).exec();

				if (!post) {
					throw new UserInputError("Does not exists. Post may be deleted");
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
		},
		async likePost(_, { postId }, context) {
			const { username } = await checkAuthentication(context);

			try {
				const post = await Post.findById(postId).exec();

				if (!post) {
					throw new UserInputError("Post cannot be found");
				}

				if (post.likes.find((like) => like.username === username)) {
					// Post is already liked and need to unlike it
					post.likes = post.likes.filter((like) => like.username !== username);
				} else {
					post.likes.push({
						username
					});
				}

				await post.save();
				return post;
			} catch (err) {
				throw new Error(err);
			}
		}
	},
	Subscription: {
		newPost: {
			subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST")
		}
	}
};

export default postResolvers;
