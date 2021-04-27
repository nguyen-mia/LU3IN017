import React from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import {withRouter} from "react-router-dom";


class MessagesPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentUser : this.props.currentUser,
      messages : [],
      intervalID : null,
      status: "",
      filter : false,
      following : []
    }
    this.fetch = this.fetch.bind(this)
    this.fetchUser = this.fetchUser.bind(this)   
    this.handleFilter = this.handleFilter.bind(this)
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
    this.fetchUser()
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

  response_user(response) {
    //console.log(response.data)
    if(response.data["status"] === 401) {
          const message = response.data["message"];
          this.setState({status:"error", texterror:message})
    } else {
      this.setState({ 
        following: response.data["following"]
      })
    }
  }
  async fetchUser(){
    const api = axios.create({
      baseURL : '/api/',
      timeout : 1000,
      headers : {'X-Custom-Header' : 'foobar'}
      });
    await api.get(`/users/${this.state.currentUser}`,{})
    .then(response => { 
      this.response_user(response);
    });
  }

  handleFilter(event) {
    this.setState({
     filter: !this.state.filter });
  }

  render(){
      return(
          <div className = "MessagesPage"> 
              <div key={this.state.status}>
                {
                  (this.state.status === "error")
                  ? <span style={{color:"red"}}>
                      {this.state.texterror}
                    </span>
                  : <span></span>
                }
              </div>
              <MessageForm 
                fetch = {this.fetch} 
                currentUser = {this.props.currentUser}
              /> 
              <div>
                <input 
                  type="checkbox" 
                  id="following" 
                  name="following"               
                  defaultChecked={this.state.filter}
                  onChange={this.handleFilter}
                />
                <label for="following"> Following only</label>
              </div>
              <MessageList 
                messages = {this.state.messages} 
                fetch = {this.fetch} 
                currentUser = {this.props.currentUser} 
                filter = {this.state.filter}
                following = {this.state.following}
              />
          </div> 
      );
  }
}

export default withRouter(MessagesPage)
