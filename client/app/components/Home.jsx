import React, { Component } from 'react';
import { Link } from 'react-router';
import Logout from './Logout';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	signedIn: false
        };
    }
	componentWillMount(){
        fetch('/api/signed-in', {
            headers: {
                Auth: localStorage.getItem('token'),
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            credentials: 'same-origin'
        }).then((response) => response.json())
        .then((results) => {
            if(results.message){
                if(results.message === "signed-in"){
                    this.setState({
                    	signedIn: true
                    })
                }
            }
        });
	}
  	render() {
  		const renderLinks = () => {
  			if(this.state.signedIn){
  				return (
  		      <nav className="navbar navbar-light bg-faded text-center">
  						<Link className="nav-links" to="/home">Profile</Link>
              <Logout />
  					</nav>
  				)
  			} else {
  				return (
            <div className="text-center">
              <nav className="text-center navbar navbar-light bg-faded">
    						<Link className="nav-links" to="/sign-up">Sign Up</Link>
    						<Link className="nav-links" to="/login">Login</Link>
    					</nav>
		        	<h1>Welcome Melophile</h1>
		        	<h2>Please Sign up or Sign in</h2>
		        </div>
  				)
  			}
  		}

	    return (
	        <div>
	        	{renderLinks()}
	        </div>

	    );
  	}
};
