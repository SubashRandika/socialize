import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Header, TextArea } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../utils/hooks";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const PostForm = () => {
	const [errors, setErrors] = useState({});
	const history = useHistory();

	const { handleChange, handleSubmit, values } = useForm(createPostCallback, {
		body: ""
	});

	const [createPost, { loading }] = useMutation(CREATE_POST, {
		update(proxy, result) {
			const data = proxy.readQuery({
				query: FETCH_POSTS_QUERY
			});
			data.getPosts = [result.data.createPost, ...data.getPosts];
			proxy.writeQuery({
				query: FETCH_POSTS_QUERY,
				data
			});
			values.body = "";
			setErrors({});
			history.push("/");
		},
		onError(err) {
			setErrors(err.graphQLErrors[0]);
		},
		variables: values
	});

	function createPostCallback() {
		createPost();
	}

	return (
		<Form onSubmit={handleSubmit} noValidate className={loading ? "loading" : ""}>
			<Header as='h3'>Create a post:</Header>
			<Form.Field
				control={TextArea}
				placeholder='Type your latest post here...'
				name='body'
				value={values.body}
				onChange={handleChange}
				error={errors.message ? errors.message : false}
			/>
			<Button type='submit' color='teal'>
				Create
			</Button>
		</Form>
	);
};

const CREATE_POST = gql`
	mutation createPost($body: String!) {
		createPost(body: $body) {
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

export default PostForm;
