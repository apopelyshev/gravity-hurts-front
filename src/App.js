import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import useToken from './components/util/auth';
import LoginPage from './views/login';
import HomePage from './views/home';
import DefaultPage from './views/default';

const LOGIN_OVERRIDE = true;

function PrivateRoute({ children, token, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				return LOGIN_OVERRIDE ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location },
						}}
					/>
				);
			}}
		/>
	);
}

export default function App() {
	const { token, setToken } = useToken();

	return (
		<Router>
			<Route path='/'>
				<DefaultPage />
			</Route>
			<Route path='/login'>
				<LoginPage setToken={setToken} />
			</Route>
			<PrivateRoute token={token} path='/today'>
				<HomePage />
			</PrivateRoute>
		</Router>
	);
}
