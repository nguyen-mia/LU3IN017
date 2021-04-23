import React from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import SearchBar from './SearchBar';
import { withRouter, Link} from "react-router-dom";


class MessagesPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      messages : [],
      intervalID : null,
      status: "",
      keyword: props.match.params.keyword
    }
    this.fetch = this.fetch.bind(this)  
    this.handleSearch = this.handleSearch.bind(this)  
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
    console.log(this.state)
    if (!this.state.keyword){ //no keyword, normal timeline
      await api.get('/messages',{})
      .then(response => {
        this.response_messages(response);
      });

    } else {
      api.get(`messages/search/${this.state.keyword}`, {})
      .then(response => {
        this.setState({
          keyword : ""
        })
        this.response_messages(response)
      });
    }
  }

  handleSearch(data){
    this.setState({
      keyword: data
    })
    this.fetch()
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
              <SearchBar handleSearch={this.handleSearch}/> 
              <MessageForm fetch = {this.fetch} username = {this.props.username}/> 
              <MessageList messages = {this.state.messages} setProfile = {this.props.setProfile}/>
          </div> 
      );
  }
}

export default withRouter(MessagesPage)
