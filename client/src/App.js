import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Post from "./pages/Post";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Container>
					<NavBar />
					<Route exact path='/' component={Home} />
					<AuthRoute exact path='/login' component={Login} />
					<AuthRoute exact path='/register' component={Register} />
					<Route exact path='/posts/:postId' component={Post} />
				</Container>
			</Router>
		</AuthProvider>
	);
};

export default App;
