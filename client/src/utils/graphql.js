import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
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
