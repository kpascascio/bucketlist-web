import React, { Component, PropTypes } from 'react';
import { initialize, reduxForm } from 'redux-form';
import { updatePost } from '../../actions/index';
import { Link } from 'react-router';
import axios from 'axios';

const { DOM: { input, select, textarea } } = React;

const ROOT_URL = 'http://localhost:3000';

const config = {
   headers: { authorization: localStorage.getItem('token') }
}

class UpdateList extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			post : {}
		}
	}

	componentWillMount() {
		//todo - add the axios call here
		//this.props.fetchPost(this.props.params.id);
		axios.get(ROOT_URL + '/items/' + this.props.params.id, config)
	      .then( (response) => {
	        console.log("Response", response)
	      	this.setState({
	      		post: response.data
	      	})

	      });

	}

	componentWillReceiveProps(nextProps) {
		this.setState({ post: nextProps })
	}

	handleChange(event) {
		this.setState({title: event.target.value})
	}

	handleFormSubmit(formProps){
		//TODO - make this an update Post 
	    this.props.updatePost(formProps, this.props.params.id);
	}

	render() {
		const { fields: { title, topic, url, content }, handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<h3>Update Post</h3>
				
				<fieldset className="form-group">
					<label>Title</label>
					<input type="text" className="form-control" {...title} value={this.state.post.title} onBlur={this.handleChange} />
				</fieldset>
				<fieldset className="form-group">
					<label>Category</label>
					<input type="text" className="form-control" {...topic} />
				</fieldset>
				<fieldset className="form-group">
					<label>URL</label>
					<input type="text" className="form-control" {...url} />
				</fieldset>
				<fieldset className="form-group">
					<label>Content</label>
					<textarea type="text" rows="8" className="form-control text" {...content} />
				</fieldset>

				<button type="submit" className="btn btn-primary">Save</button>
				<Link to="/items" className="btn btn-danger">Cancel</Link>
			</form>
		);

	}
}


export default reduxForm({
	form: 'UpdateNewForm',
	fields: ['title', 'topic', 'url', 'content']
}, null, { updatePost })(UpdateList);

