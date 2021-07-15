import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Button, Card, Grid, Icon, Image, Label, Loader, Popup } from "semantic-ui-react";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import { AuthContext } from "../context/auth";

dayjs.extend(relativeTime);
const Post = () => {
	const { postId } = useParams();
	const history = useHistory();
	const { user } = useContext(AuthContext);

	const { loading, data } = useQuery(FETCH_POST, {
		variables: { postId }
	});

	const deletePostCallback = () => {
		history.push("/");
	};

	let postContent;

	if (loading) {
		postContent = (
			<Loader active={loading} size='big'>
				Loading...
			</Loader>
		);
	} else {
		const { id, body, username, likes, comments, likeCount, commentCount, createdAt } = data?.getPost;

		postContent = (
			<Grid>
				<Grid.Row>
					<Grid.Column width={2}>
						<Image
							avatar
							src='https://react.semantic-ui.com/images/avatar/large/molly.png'
							size='small'
							float='right'
						/>
					</Grid.Column>
					<Grid.Column width={10}>
						<Card fluid>
							<Card.Content>
								<Card.Header>{username}</Card.Header>
								<Card.Meta>
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
										<Button labelPosition='right' as='div'>
											<Button basic color='blue'>
												<Icon name='comments' />
											</Button>
											<Label basic color='blue' pointing='left'>
												{commentCount}
											</Label>
										</Button>
									}
								/>
								{user?.username === username && <DeleteButton postId={postId} callback={deletePostCallback} />}
							</Card.Content>
						</Card>
						{comments.map((comment) => (
							<Card fluid key={comment?.id}>
								<Card.Content>
									{user?.username === comment?.username && <DeleteButton postId={postId} commentId={comment?.id} />}
									<Card.Header>{comment?.username}</Card.Header>
									<Card.Meta>
										{dayjs().diff(dayjs(comment?.createdAt), "d") >= 1
											? dayjs(comment?.createdAt).format("MMMM D, YYYY h:mm a")
											: dayjs(comment?.createdAt).fromNow(true)}
									</Card.Meta>
									<Card.Description>{comment?.body}</Card.Description>
								</Card.Content>
							</Card>
						))}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}

	return postContent;
};

const FETCH_POST = gql`
	query ($postId: ID!) {
		getPost(postId: $postId) {
			id
			body
			username
			likes {
				username
			}
			likeCount
			comments {
				id
				body
				username
				createdAt
			}
			commentCount
			createdAt
		}
	}
`;

export default Post;
