import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, Icon, Image, Label, Popup } from "semantic-ui-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

dayjs.extend(relativeTime);
const PostCard = ({ post }) => {
	const history = useHistory();
	const { user } = useContext(AuthContext);
	const { id, body, username, likes, likeCount, commentCount, createdAt } = post;

	const deletePostCallback = () => {
		history.push("/");
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
				<LikeButton user={user} post={{ id, likes, likeCount }} />
				<Popup
					content='Comment'
					trigger={
						<Button labelPosition='right' as={Link} to={`/posts/${id}`}>
							<Button basic color='blue'>
								<Icon name='comments' />
							</Button>
							<Label basic color='blue' pointing='left'>
								{commentCount}
							</Label>
						</Button>
					}
				/>
				{user?.username === username && <DeleteButton postId={id} callback={deletePostCallback} />}
			</Card.Content>
		</Card>
	);
};

export default PostCard;
