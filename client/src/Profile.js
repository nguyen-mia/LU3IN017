import React from 'react';
import axios from 'axios';
import UserList from './UserList';
import MessageList from './MessageList';
import { withRouter } from "react-router-dom";

class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username : props.match.params.username,
      messages : [],
      intervalID : null,
      lastname: "",
      firstname: "",
      followers : [],
      following : [],
      isFollowed : false
    }
    this.fetchMessage = this.fetchMessage.bind(this)
  }

  componentDidMount(){
    this.fetchMessage()
    this.fetchUser()
    try{
      this.intervalId = setInterval(this.fetchMessage, 5000);
    }catch(e){
      console.log(e)
    }
  }
  
  componentWillUnmount(){
    clearInterval(this.intervalId) 
  }
  
  ///////////////////////////////////////////////////////////////////MESSAGES///////////////////////////////////////////////////////////////////
  response_messages(response) {
    //console.log(response.data)
    if(response.data["status"] === 401) {
          const message = response.data["message"];
          this.setState({status:"error", texterror:message})
    } else {
      this.setState({ messages: response.data })
    }
  }

  async fetchMessage(){
    
    const api = axios.create({
      baseURL : '/api/',
      timeout : 1000,
      headers : {'X-Custom-Header' : 'foobar'}
      });
    await api.get(`/users/${this.state.username}/messages`,{})
    .then(response => { 
      this.response_messages(response);
    });
  }
  
    ///////////////////////////////////////////////////////////////////USERS///////////////////////////////////////////////////////////////////


  response_user(response) {
    //console.log(response.data)
    if(response.data["status"] === 401) {
          const message = response.data["message"];
          this.setState({status:"error", texterror:message})
    } else {
      this.setState({ 
        lastname: response.data["lastname"],
        firstname: response.data["firstname"],
        followers: response.data["followers"],
        following: response.data["following"],
        isFollowed: response.data["isFollowed"]  
      })
    }
  }

  fetchUser(){
    const api = axios.create({
      baseURL : '/api/',
      timeout : 1000,
      headers : {'X-Custom-Header' : 'foobar'}
      });
    api.get(`/users/${this.state.username}`,{})
    .then(response => { 
      this.response_user(response);
    });
  }

  ///////////////////////////////////////////////////////////////////FOLLOW/UNFOLLOW//////////////////////////////////////////////////////////////////

  response_follow(response) {
    //console.log(response.data)
    if(response.data["status"] === 401) {
          const message = response.data["message"];
          this.setState({status:"error", texterror:message})
    } else {
      this.setState({ 
        isFollowed: true
      })
    }
  }

  follow() {
    const api = axios.create({
    baseURL : '/api/',
    timeout : 1000,
    headers : {'X-Custom-Header' : 'foobar'}
    });
    api.post(`/follows/${this.state.username}`,{})
    .then(response => {
      this.response_follow(response);
    });
  }

  response_unfollow(response) {
    //console.log(response.data)
    if(response.data["status"] === 401) {
          const message = response.data["message"];
          this.setState({status:"error", texterror:message})
    } else {
      this.setState({ 
        isFollowed: false
      })
    }
  }

  unfollow() {
    const api = axios.create({
    baseURL : '/api/',
    timeout : 1000,
    headers : {'X-Custom-Header' : 'foobar'}
    });
    api.delete(`/follows/${this.state.username}`,{})
    .then(response => {
      this.response_follow(response);
    });
  }

    ///////////////////////////////////////////////////////////////////RENDER//////////////////////////////////////////////////////////////////


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
        <div>
          {this.state.isFollowed
          ? <button onClick={() => { this.unfollow() ; this.fetchUser()}}> Unfollow </button>
          : <button onClick={() => { this.follow() ; this.fetchUser()}}> Follow </button>}
        </div>
        <UserList userList = {this.state.followers} type ="followers"> FOLLOWERS </UserList>
        <UserList userList = {this.state.following} type ="following"> FOLLOWING </UserList>
        <MessageList messages = {this.state.messages}/>
      </div> 
    );
  }
}

export default withRouter(Profile)
