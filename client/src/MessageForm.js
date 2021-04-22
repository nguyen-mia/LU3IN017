import React from 'react'
import axios from 'axios';

class MessageForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
      message : "",
      status : ""
    };
		this.handleChange = this.handleChange.bind(this);
	}

	response_login(response) {
    //console.log(response.data)
    if(response.data["status"] == 401) {
          const message = response.data["message"];
          this.setState({status:"error", texterror:message})
      } else {

          this.props.setConnected(response.data["session_key"], response.data["username"],);
      }
  }
	createMessage(){
		const api = axios.create({
			baseURL : '/api/',
			timeout : 1000,
			headers : {'X-Custom-Header' : 'foobar'}
			});
		api.post('/messages', { 
				"username":this.props.username,
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
				<div>Message</div>
				<input
						type="text"
						name="message"
						onChange={this.handleChange}
						value={this.state.message}
				/>
				<button onClick = { (event => this.createMessage()) } >
          Post
        </button>
			</div>
				
		)
	}
}
export default MessageForm;
