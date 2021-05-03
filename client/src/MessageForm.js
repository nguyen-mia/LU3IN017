import React from 'react'
import axios from 'axios';

import styles from './css/MessageForm.module.css';


class MessageForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
      message : "",
      status : ""
    };
		this.handleChange = this.handleChange.bind(this);
	}
	
	createMessage(){
		const api = axios.create({
			baseURL : '/api/',
			timeout : 1000,
			headers : {'X-Custom-Header' : 'foobar'}
			});
		api.post('/messages', { 
				"username":this.props.currentUser,
				"message":this.state.message,
		})
		.then(response => {
			this.props.fetch();
			this.setState({message : ""})
		});
	}

	handleChange(event = {}) {
		const name = event.target && event.target.name;
		const value = event.target && event.target.value;
		this.setState({[name]:value});
	}


	render(){
		return (
			<div>
				<input class={styles.minput}
					type="text"
					placeholder="What's happening?"
					name="message"
					onChange={this.handleChange}
					value={this.state.message}
				/>
				<button class={styles.post} onClick = { (event => this.createMessage()) } >
          Post
        </button>
			</div>
				
		)
	}
}
export default MessageForm;
