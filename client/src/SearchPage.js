import React from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import { withRouter } from "react-router-dom";




class SearchPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentUser : this.props.currentUser,
      messages : [],
      intervalID : null,
      status: "",
      keyword: props.match.params.keyword,
      filter : false,
      following : []
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
    

  componentDidMount(){
    this.fetch()
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.keyword !== this.props.match.params.keyword) {
      this.fetch()
    }
  }


  async fetch(){
    const api = axios.create({
      baseURL : '/api/',
      timeout : 1000,
      headers : {'X-Custom-Header' : 'foobar'}
    });
    await api.get(`messages/search/${this.props.match.params.keyword}`, {})
    .then(response => {
      this.setState({
        keyword : ""
      })
      this.response_messages(response)
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
              <MessageList 
                messages = {this.state.messages} 
                filter = {this.state.filter}
                following = {this.state.following}
                />
          </div> 
      );
  }
}

export default withRouter(SearchPage)
