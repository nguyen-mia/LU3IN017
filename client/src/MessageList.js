import React from 'react'
import {Link} from "react-router-dom";

class MessageList extends React.Component {
    render(){
        const {messages, setProfile} = this.props;
        let res = messages.map((msg)=>{
            return <li key={msg._id}> <Link to={`/user/${msg.author_username}`}>{msg.author_username} </Link>: {msg.message} </li>
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
