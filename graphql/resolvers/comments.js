import { AuthenticationError, UserInputError } from "apollo-server";
import Post from "../../models/Post.js";
import { checkAuthentication } from "../../util/checkAuth.js";

const commentResolvers = {
	Mutation: {
		createComment: async (_, { postId, body }, context) => {
			const { username } = await checkAuthentication(context);

			if (body.trim() === "") {
				throw new UserInputError("Empty comment", {
					errors: {
						body: "Comment body cannot be empty"
					}
				});
			}

			const post = await Post.findById(postId).exec();

			if (!post) {
				throw new UserInputError("Post does not exist");
			}

			post.comments.unshift({
				body,
				username
			});

			await post.save();
			return post;
		},
		deleteComment: async (_, { postId, commentId }, context) => {
			const { username } = await checkAuthentication(context);

			const post = await Post.findById(postId).exec();

			if (!post) {
				throw new UserInputError("Post does not exist");
			}

			const commentIndex = post.comments.findIndex((comment) => comment.id === commentId);

			if (post.comments[commentIndex].username !== username) {
				throw new AuthenticationError("Not allowed to perform this action");
			}

			post.comments.splice(commentIndex, 1);
			await post.save();
			return post;
		}
	}
};

export default commentResolvers;
