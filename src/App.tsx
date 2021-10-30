import * as React from 'react';
import * as Redux from './app/hooks';
import * as Action from './app/reducer/appSlice';
import { API } from './app/service/api';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginScreen } from './senter/LoginScreen';
import { DashboardScreen } from './senter/DashboardScreen';
import { AccountScreen } from './senter/AccountScreen';
import { AddScreen } from './senter/AddScreen';
import { Purchase } from './senter/PurchaseScreen';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

// import { SenterComponents } from './senter/Component';
// const { Account, Login, Dashboard, Purchase, Add } = SenterComponents;

export const App = (): JSX.Element => {
	const dispatch = Redux.useAppDispatch();

	React.useEffect(() => {
		(async function () {
			const { name, version } = await API.fetchAppInfo();
			dispatch(Action.updateInfo({ name, version }));
		})();
	}, [dispatch]);

	// return (
	// 	<Router>
	// 		<Switch>
	// 			<Route exact path='/' component={Login.Screen} />
	// 			<Route exact path='/dashboard' component={Dashboard.Screen} />
	// 			<Route exact path='/account' component={Account.Screen} />
	// 			<Route exact path='/add' component={Add.Screen} />
	// 			<Route exact path='/purchase' component={Purchase.Screen} />
	// 		</Switch>
	// 	</Router>
	// );

	return (
		<Router>
			<Switch>
				<Route exact path='/' component={LoginScreen} />
				<Route exact path='/dashboard' component={DashboardScreen} />
				<Route exact path='/account' component={AccountScreen} />
				<Route exact path='/add' component={AddScreen} />
				<Route exact path='/purchase' component={Purchase} />
			</Switch>
		</Router>
	);
};

export default App;
