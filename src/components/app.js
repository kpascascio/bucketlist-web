import React, { Component } from 'react';
import NavBarHeader from './Nav';
import Signin from './auth/signin';
import Video from './video/video'

	export default class App extends Component {
  		render() {
    			return (
      			<div>
	      			<NavBarHeader />
              <Video />
	      			{this.props.children}
      			</div>
    			);
  		}
	}
