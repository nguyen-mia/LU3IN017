import React from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import SearchBar from './SearchBar';
import { withRouter, Link} from "react-router-dom";


class SearchPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      messages : [],
      intervalID : null,
      status: "",
      keyword: props.match.params.keyword
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

  // componentWillUpdate(nextProps, nextState) {
  //   if (nextProps.match.params.keyword !== this.props.match.params.keyword) {
  //     nextState.keyword = nextProps.match.params.keyword;
  //     this.fetch()
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
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

	
  // componentWillReceiveProps(props) {
  //   console.log('keyword: ', props.match.params.keyword);
  //   var newKeyword = props.match.params.keyword;
  //   if(this.state.keyword !== newKeyword) {
  //       this.setState({keyword: newKeyword});
  //   }
	// }


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
              <MessageForm fetch = {this.fetch} username = {this.props.username}/> 
              <MessageList messages = {this.state.messages} setProfile = {this.props.setProfile}/>
          </div> 
      );
  }
}

export default withRouter(SearchPage)
