import React from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import { withRouter, Link} from "react-router-dom";


class MessagesPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentUser : this.props.currentUser,
      messages : [],
      intervalID : null,
      status: "",
    }
    this.fetch = this.fetch.bind(this)  
  }

  response_messages(response) {
      if(response.data["status"] === 401) {
        const message = response.data["message"];
        this.setState({status:"error", texterror:message})
      } else {
        this.setState({ messages: response.data })
      }
    }
    
  componentWillMount(){
    this.fetch()
  }

  componentDidMount(){
    if (!this.state.keyword){
      try{
        this.intervalId = setInterval(this.fetch, 10000);
      }catch(e){
        console.log(e)
      }
    }
  }
  
  componentWillUnmount(){
    clearInterval(this.intervalId) 
  }

  async fetch(){
    const api = axios.create({
      baseURL : '/api/',
      timeout : 1000,
      headers : {'X-Custom-Header' : 'foobar'}
    });
    //console.log(this.state)
    await api.get('/messages',{})
    .then(response => {
      this.response_messages(response);
    });
  }

  render(){
      return(
          <div className = "MessagesPage"> 
              <div key={this.state.status}>
                {
                  (this.state.status === "error")
                  ? <span style={{color:"red"}}>{this.state.texterror}</span>
                  : <span></span>
                }
              </div>
              <MessageForm fetch = {this.fetch} currentUser = {this.props.currentUser}/> 
              <MessageList messages = {this.state.messages} fetch = {this.fetch} currentUser = {this.props.currentUser}/>
          </div> 
      );
  }
}

export default withRouter(MessagesPage)
