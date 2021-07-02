import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

const App = () => {
	return (
		<Router>
			<Container>
				<NavBar />
				<Route exact path='/' component={Home} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
			</Container>
		</Router>
	);
};

export default App;
