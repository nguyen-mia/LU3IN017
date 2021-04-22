import React from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

class MessagesPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      messages : [],
      intervalID : null
    }
    this.fetch = this.fetch.bind(this)  
  }

  response_messages(response) {
      //console.log(response.data)
      if(response.data["status"] == 401) {
            const message = response.data["message"];
            this.setState({status:"error", texterror:message})
        } else {
          // var joined = this.state.messages.concat(response.data);
          // console.log(joined)
          this.setState({ messages: response.data })
          // console.log(this.state.messages)
        }
    }

  componentDidMount(){
    this.fetch()
    try{
      this.intervalId = setInterval(this.fetch, 10000);
    }catch(e){
      console.log(e)
    }
  }

  async fetch(){
    const api = axios.create({
      baseURL : '/api/',
      timeout : 1000,
      headers : {'X-Custom-Header' : 'foobar'}
      });
    await api.get('/messages',{})
    .then(response => {
      this.response_messages(response);
    });
  }

  componentWillUnmount(){
    clearInterval(this.intervalId) 
  }


  render(){
      return(
          <div className = "MessagesPage"> 
              <div key={this.state.status}>
                {
                  (this.state.status == "error")
                  ? <span style={{color:"red"}}>{this.state.texterror}</span>
                  : <span></span>
                }
              </div>
              <MessageForm fetch = {this.fetch} username = {this.props.username}/> 
              <MessageList messages = {this.state.messages}/>
          </div> 
      );
  }
}

export default MessagesPage
