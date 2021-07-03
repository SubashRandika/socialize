import React from "react";
import { Grid, Header, Loader } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PostCard from "../components/PostCard";

const Home = () => {
	const { loading, data } = useQuery(FETCH_POSTS_QUERY);

	return (
		<>
			<Header as='h1' textAlign='center'>
				Recent Posts
			</Header>
			<Grid columns={3}>
				{loading ? (
					<Loader active={loading} size='big'>
						Loading...
					</Loader>
				) : (
					data?.getPosts?.map((post) => (
						<Grid.Column key={post.id}>
							<PostCard post={post} />
						</Grid.Column>
					))
				)}
			</Grid>
		</>
	);
};

const FETCH_POSTS_QUERY = gql`
	query {
		getPosts {
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

export default Home;
