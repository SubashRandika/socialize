import React, { useEffect, useState } from "react";
import { Grid, Header, Loader } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PostCard from "../components/PostCard";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const { loading, data } = useQuery(FETCH_POSTS_QUERY);

	useEffect(() => {
		if (!loading) {
			const { getPosts } = data;
			setPosts(getPosts);
		}
	}, [data, loading]);

	return (
		<>
			<Header as='h1'>Recent Posts</Header>
			<Grid columns={3}>
				{loading ? (
					<Loader active={loading} size='big'>
						Loading...
					</Loader>
				) : (
					posts?.map((post) => (
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
	{
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
