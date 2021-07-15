import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Tooltip from "./Tooltip";

const LikeButton = ({ post, user }) => {
	const { id, likes, likeCount } = post;
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		if (user && likes.find((like) => like.username === user.username)) {
			setLiked(true);
		} else {
			setLiked(false);
		}
	}, [likes, user]);

	const [likePost] = useMutation(LIKE_POST, {
		variables: { postId: id },
		onError(err) {}
	});

	const likeButton = user ? (
		liked ? (
			<Button color='teal'>
				<Icon name='heart' />
			</Button>
		) : (
			<Button basic color='teal'>
				<Icon name='heart' />
			</Button>
		)
	) : (
		<Button basic color='teal' as={Link} to={"/login"}>
			<Icon name='heart' />
		</Button>
	);

	return (
		<Tooltip content={liked ? "Unlike" : "Like"}>
			<Button as='div' labelPosition='right' onClick={likePost}>
				{likeButton}
				<Label basic color='teal' pointing='left'>
					{likeCount}
				</Label>
			</Button>
		</Tooltip>
	);
};

const LIKE_POST = gql`
	mutation likePost($postId: ID!) {
		likePost(postId: $postId) {
			id
			likes {
				id
				username
			}
			likeCount
		}
	}
`;

export default LikeButton;
