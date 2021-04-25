import React from 'react'
import axios from 'axios';
import {Link} from "react-router-dom";

class MessageList extends React.Component {
    async deleteMessage(message_id){
        const api = axios.create({
          baseURL : '/api/',
          timeout : 1000,
          headers : {'X-Custom-Header' : 'foobar'}
        });
        //console.log(this.state)
        await api.delete(`/messages/${message_id}`,{})
        .then(response => {
          this.props.fetch();
        });
      }
    
    render(){
        const {messages} = this.props;
        let res = messages.map((msg)=>{
            return <li key={msg._id}> 
                <Link to={`/user/${msg.author_username}`}> 
                    {msg.author_username} 
                </Link> : {msg.message} 
                {this.props.currentUser == msg.author_username && 
                    <button onClick={() => { this.deleteMessage(msg._id)}}> X </button> 
                }
            </li>
        })
        return (
            <div className = 'MessageList'>
                MESSAGES
                <ul>
                    {res}
                </ul>
            </div>
        )
    }
}
export default MessageList;
