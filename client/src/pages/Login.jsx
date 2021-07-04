import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Form, Grid, Header, Input } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";

const Login = () => {
	const [errors, setErrors] = useState({});
	const history = useHistory();
	const context = useContext(AuthContext);

	const { handleChange, handleSubmit, values } = useForm(loginUserCallback, {
		username: "",
		password: ""
	});

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(proxy, { data: { login: userData } }) {
			context.login(userData);
			history.push("/");
		},
		onError(err) {
			console.log(err.graphQLErrors[0].extensions.exception.errors);
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values
	});

	function loginUserCallback() {
		loginUser();
	}

	return (
		<Container>
			<Header as='h1' textAlign='center'>
				Login
			</Header>
			<Grid centered columns={3}>
				<Grid.Column>
					<Form onSubmit={handleSubmit} noValidate className={loading ? "loading" : ""}>
						<Form.Field
							control={Input}
							type='text'
							label='Username'
							placeholder='Username'
							name='username'
							value={values.username}
							onChange={handleChange}
							error={errors.username ? errors.username : false}
						/>
						<Form.Field
							control={Input}
							type='password'
							label='Password'
							placeholder='Password'
							name='password'
							value={values.password}
							onChange={handleChange}
							error={errors.password ? errors.password : false}
						/>
						<Button primary type='submit'>
							Login
						</Button>
					</Form>
				</Grid.Column>
			</Grid>
		</Container>
	);
};

const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			id
			email
			username
			token
			createdAt
		}
	}
`;

export default Login;
