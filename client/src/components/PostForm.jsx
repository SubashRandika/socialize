import React from "react";
import { Button, Form, Header, TextArea } from "semantic-ui-react";

const PostForm = () => {
	return (
		<Form noValidate>
			<Header as='h3'>Create a post:</Header>
			<Form.Field control={TextArea} placeholder='Type your latest post here...' name='body' />
			<Button type='submit' color='teal'>
				Create
			</Button>
		</Form>
	);
};

export default PostForm;
