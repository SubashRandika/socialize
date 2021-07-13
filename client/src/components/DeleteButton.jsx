import React, { useState } from "react";
import { Button, Confirm, Popup } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const DeleteButton = ({ id }) => {
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [deletePost] = useMutation(DELETE_POST, {
		update() {
			setConfirmDelete(false);
			// TODO: Remove post from cache
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
