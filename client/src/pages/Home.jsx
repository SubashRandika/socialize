import React, { useContext } from "react";
import { Grid, Header, Loader } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const Home = () => {
	const { loading, data } = useQuery(FETCH_POSTS_QUERY);
	const { user } = useContext(AuthContext);

	return (
		<>
			<Header as='h1' textAlign='center'>
				Recent Posts
			</Header>
			<Grid columns={3}>
				{user && (
					<Grid.Column>
						<PostForm />
					</Grid.Column>
				)}
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

export default Home;
