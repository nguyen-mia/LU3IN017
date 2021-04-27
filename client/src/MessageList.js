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
        const {messages, filter} = this.props;
        let resSansF = messages.map((msg)=>{
            return <li key={msg._id}> 
                <Link to={`/user/${msg.author_username}`}> 
                    {msg.author_username} 
                </Link> : {msg.message} 
                {this.props.currentUser === msg.author_username && 
                    <button onClick={() => { this.deleteMessage(msg._id)}}> X </button> 
                }
            </li>
        })

        let follow_list = this.props.following.map((f) => {
            return f.followee_id
        })
        let resAvecF = messages.map((msg)=>{
            return <div>
                { follow_list.indexOf(msg.author_username) > -1 
                &&<li key={msg._id}> 
                    <Link to={`/user/${msg.author_username}`}> 
                        {msg.author_username} 
                    </Link> : {msg.message} 
                    {this.props.currentUser === msg.author_username && 
                        <button onClick={() => { this.deleteMessage(msg._id)}}> X </button> }
                    
                    </li>}
                </div>
            
        })
        return (
            <div className = 'MessageList'>
                MESSAGES
                { filter 
                    ? <ul> {resAvecF} </ul>
                    : <ul> {resSansF} </ul>
                }
            </div>
        )
    }
}
export default MessageList;
