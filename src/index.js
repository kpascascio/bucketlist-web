import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, Redirect, browserHistory} from 'react-router';
import { AUTH_USER } from './actions/types';
import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import RequireAuth from './components/auth/require_auth'
import ListItem from './components/list/new-list-item';
import ListsShow from './components/list/list-items';
import ListShow from './components/list/list-show';
import promise from 'redux-promise';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);
console.log(store);
const token = localStorage.getItem('token');
if (token) {
  store.dispatch({type: AUTH_USER})
}
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
		<Router history={browserHistory}>
  			<Route path="/" component={App}>
            <Route path="items" component={RequireAuth(ListsShow)}>
            </Route>
            <Route path="items/:id" component={RequireAuth(ListShow)} />

  			  	<Route path="signin" component={Signin} />
    				<Route path="signout" component={Signout} />
  	   			<Route path="signup" component={Signup} />
  			  	<Route path="newitem" component={RequireAuth(ListItem)} />
  			</Route>
  		</Router>
  </Provider>
  , document.querySelector('.container'));
