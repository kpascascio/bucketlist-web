export default function({ dispatch }) {
	// ES5 of the ES6 return next => action => {}
	/*
		return function(next) {
			return function(action) {
				
			}
		}
	*/

	return next => action => {
		//if the action does not have a payload
		//or the payload does not have a .then property
		//we don't care send it on
		if (!action.payload || !action.payload.then) {
			//next() forwards the action onto next middleware or
			//if this is the last middleware in the stack
			//it is forwarded onto reducers
			return next(action);
		}

		// make sure the action's promise resolves
		action.payload
			.then(function(response) {
				//create a new action with the old type, but 
				//replace the promise with the response data
				const newAction = {...action, payload: response};
				//dispatch is a function that sends it through everything
				//again (the entire MW stack)
				dispatch(newAction);
			});
	}
}