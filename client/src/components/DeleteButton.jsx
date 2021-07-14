import React, { useState } from "react";
import { Button, Confirm, Popup } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const DeleteButton = ({ id, callback }) => {
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [deletePost] = useMutation(DELETE_POST, {
		update(proxy) {
			setConfirmDelete(false);
			const data = proxy.readQuery({
				query: FETCH_POSTS_QUERY
			});
			data.getPosts = data.getPosts.filter((post) => post.id !== id);
			proxy.writeQuery({
				query: FETCH_POSTS_QUERY,
				data
			});
			if (callback) {
				callback();
			}
		},
		variables: { id }
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
	mutation deletePost($id: ID!) {
		deletePost(id: $id)
	}
`;

export default DeleteButton;
