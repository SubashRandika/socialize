export const validateRegisterInput = (username, email, password, confirmPassword) => {
	const errors = {};

	if (username.trim() === "") {
		errors.username = "Username cannot be empty";
	}

	if (email.trim() === "") {
		errors.email = "Email cannot be empty";
	} else {
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!email.match(emailRegex)) {
			errors.email = "Email must be a valid email address. Such as example@gmail.com";
		}
	}

	if (password === "") {
		errors.password = "Password cannot be empty";
	} else if (password !== confirmPassword) {
		errors.confirmPassword = "Password does not match with confirm password";
	}

	return {
		errors,
		isValid: Object.keys(errors) < 1
	};
};
