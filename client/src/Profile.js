import React from 'react';
import axios from 'axios';
import UserList from './UserList';
import MessageList from './MessageList';
import { withRouter } from "react-router-dom";

class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentUser : this.props.currentUser,
      username : props.match.params.username,
      messages : [],
      intervalID : null,
      lastname: "",
      firstname: "",
      followers : [],
      following : [],
      isFollowed : false,
      filter : false
    }
    this.fetchUser = this.fetchUser.bind(this)
    this.fetchMessage = this.fetchMessage.bind(this)
    this.fetch = this.fetch.bind(this)
    this.follow = this.follow.bind(this)
    this.unfollow = this.unfollow.bind(this)

  }

  componentDidMount(){
    this.fetch()
    // try{
    //   this.intervalId = setInterval(this.fetch, 5000);
    // }catch(e){
    //   console.log(e)
    // }
  }
  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.match.params.username !== this.props.match.params.username) {
      this.fetch()
    }
  }
  componentWillUnmount(){
    clearInterval(this.intervalId) 
  }
  
  async fetch(){
    await this.fetchMessage();
    await this.fetchUser();
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

  async fetchUser(){
    const api = axios.create({
      baseURL : '/api/',
      timeout : 1000,
      headers : {'X-Custom-Header' : 'foobar'}
      });
    await api.get(`/users/${this.state.username}`,{})
    .then(response => { 
      this.response_user(response);
    });
  }

  componentWillReceiveProps(props) {
    var newUser = props.match.params.username;
    if(this.state.username !== newUser) {
        this.setState({username: newUser});
    }
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

  follow(username) {
    const api = axios.create({
    baseURL : '/api/',
    timeout : 1000,
    headers : {'X-Custom-Header' : 'foobar'}
    });
    api.post(`/follows/${username}`,{})
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

  unfollow(username) {
    const api = axios.create({
    baseURL : '/api/',
    timeout : 1000,
    headers : {'X-Custom-Header' : 'foobar'}
    });
    api.delete(`/follows/${username}`,{})
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
          {this.state.username !== this.state.currentUser && 
            <div>
              {this.state.isFollowed
              ? <button onClick={() => { 
                this.unfollow(this.state.username); 
                this.fetchUser()
              }}> 
                Unfollow 
              </button>
              : <button onClick={() => { 
                this.follow(this.state.username); 
                this.fetchUser()
              }}> 
                Follow 
              </button>}
            </div>
          }
        </div>
        <UserList 
          userList = {this.state.followers} 
          type ="followers" 
        > 
           
        </UserList>
        <UserList 
          userList = {this.state.following} 
          type ="following" 
          unfollow = {this.unfollow} 
          fetchUser = {this.fetchUser} 
          currentUser={this.props.currentUser}
        > 
           
        </UserList>
        <MessageList 
          messages = {this.state.messages} 
          fetch = {this.fetchMessage} 
          currentUser={this.props.currentUser}
          filter = {this.state.filter}
          following = {this.state.following}
          />
      </div> 
    );
  }
}

export default withRouter(Profile)
