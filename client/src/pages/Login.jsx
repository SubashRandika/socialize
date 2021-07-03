import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Form, Grid, Header, Input } from "semantic-ui-react";

const Login = () => {
	const [errors, setErrors] = useState({});
	const [values, setValues] = useState({
		username: "",
		password: ""
	});
	const history = useHistory();

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<Container>
			<Header as='h1' textAlign='center'>
				Login
			</Header>
			<Grid centered columns={3}>
				<Grid.Column>
					<Form onSubmit={handleSubmit} noValidate>
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

export default Login;
