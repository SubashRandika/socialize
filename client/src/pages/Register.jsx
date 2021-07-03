import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Form, Grid, Header, Input } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../utils/hooks";

const Register = () => {
	const [errors, setErrors] = useState({});
	const history = useHistory();

	const { handleChange, handleSubmit, values } = useForm(registerUser, {
		username: "",
		email: "",
		password: "",
		confirmPassword: ""
	});

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(proxy, result) {
			console.log(result);
			history.push("/");
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values
	});

	function registerUser() {
		addUser();
	}

	return (
		<Container>
			<Header as='h1' textAlign='center'>
				Register
			</Header>
			<Grid centered columns={3}>
				<Grid.Column>
					<Form onSubmit={handleSubmit} noValidate className={loading ? "loading" : ""}>
						<Form.Field
							control={Input}
							type='text'
							label='Username'
							placeholder='johndoe'
							name='username'
							value={values.username}
							onChange={handleChange}
							error={errors.username ? errors.username : false}
						/>
						<Form.Field
							control={Input}
							type='text'
							label='Email'
							placeholder='johndoe@example.com'
							name='email'
							value={values.email}
							onChange={handleChange}
							error={errors.email ? errors.email : false}
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
						<Form.Field
							control={Input}
							type='password'
							label='Confirm Password'
							placeholder='Confirm Password'
							name='confirmPassword'
							value={values.confirmPassword}
							onChange={handleChange}
							error={errors.confirmPassword ? errors.confirmPassword : false}
						/>
						<Button primary type='submit'>
							Register
						</Button>
					</Form>
				</Grid.Column>
			</Grid>
		</Container>
	);
};

const REGISTER_USER = gql`
	mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
		register(
			registerInput: { username: $username, email: $email, password: $password, confirmPassword: $confirmPassword }
		) {
			id
			email
			username
			token
			createdAt
		}
	}
`;

export default Register;
