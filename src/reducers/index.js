import { combineReducers } from 'redux';
import PostsReducer from './reducer-posts';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
		form: formReducer,
		auth: authReducer,
		posts: PostsReducer
});

export default rootReducer;
