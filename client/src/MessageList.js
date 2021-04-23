import React from 'react'

class MessageList extends React.Component {
    render(){
        const {messages, setProfile} = this.props;
        console.log(messages[0])
        let res = messages.map((msg)=>{
            return <li key={msg._id}> <a href="#" onClick={() => { setProfile(msg.author_username) }}>{msg.author_username}</a> : {msg.message} </li>
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
