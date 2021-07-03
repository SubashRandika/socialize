import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
const PostCard = ({ post }) => {
	const { id, body, username, likeCount, commentCount, createdAt } = post;

	const handleLikePost = () => {
		console.log("Post Liked");
	};

	const handleCommentPost = () => {
		console.log("Post Commented");
	};

	return (
		<Card fluid>
			<Card.Content>
				<Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
				<Card.Header>{username}</Card.Header>
				<Card.Meta as={Link} to={`/posts/${id}`}>
					{dayjs().diff(dayjs(createdAt), "d") >= 1
						? dayjs(createdAt).format("MMMM D, YYYY h:mm a")
						: dayjs(createdAt).fromNow(true)}
				</Card.Meta>
				<Card.Description>{body}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button as='div' labelPosition='right' onClick={handleLikePost}>
					<Button basic color='teal'>
						<Icon name='heart' />
						Like
					</Button>
					<Label basic color='teal' pointing='left'>
						{likeCount}
					</Label>
				</Button>
				<Button as='div' labelPosition='right' onClick={handleCommentPost}>
					<Button basic color='blue'>
						<Icon name='comments' />
						Comment
					</Button>
					<Label basic color='blue' pointing='left'>
						{commentCount}
					</Label>
				</Button>
			</Card.Content>
		</Card>
	);
};

export default PostCard;
