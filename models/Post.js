import mongoose from "mongoose";

const { model, Schema } = mongoose;

const commentSchema = new Schema(
	{
		body: String,
		username: String
	},
	{
		timestamps: true
	}
);

const likeSchema = new Schema(
	{
		username: String
	},
	{
		timestamps: true
	}
);

const postSchema = new Schema(
	{
		body: String,
		username: String,
		comments: [commentSchema],
		likes: [likeSchema],
		user: {
			type: Schema.Types.ObjectId,
			ref: "users"
		}
	},
	{
		timestamps: true
	}
);

const Post = model("Post", postSchema);

export default Post;
