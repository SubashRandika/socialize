import React, { useState } from "react";
import { Button, Confirm, Popup } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const DeleteButton = ({ postId, commentId, callback }) => {
	const [confirmDelete, setConfirmDelete] = useState(false);
	const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

	const [deletePost] = useMutation(mutation, {
		update(proxy) {
			setConfirmDelete(false);

			if (!commentId) {
				const data = proxy.readQuery({
					query: FETCH_POSTS_QUERY
				});
				data.getPosts = data.getPosts.filter((post) => post.id !== postId);
				proxy.writeQuery({
					query: FETCH_POSTS_QUERY,
					data
				});
			}

			if (callback) {
				callback();
			}
		},
		variables: { postId, commentId }
	});

	return (
		<>
			<Popup
				content='Delete'
				trigger={<Button floated='right' color='red' icon='trash' onClick={() => setConfirmDelete(true)} />}
			/>
			<Confirm open={confirmDelete} onCancel={() => setConfirmDelete(false)} onConfirm={deletePost} />
		</>
	);
};

const DELETE_POST = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId)
	}
`;

const DELETE_COMMENT = gql`
	mutation deleteComment($postId: ID!, $commentId: ID!) {
		deleteComment(postId: $postId, commentId: $commentId) {
			id
			comments {
				id
				username
				body
				createdAt
			}
			commentCount
		}
	}
`;

export default DeleteButton;
