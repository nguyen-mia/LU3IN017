import React from 'react'

class MessageList extends React.Component {
    constructor(props){
      super(props)
    }

    render(){
        const {messages} = this.props;
        console.log(messages[0])
        let res = messages.map((msg)=>{
            return <li key={msg._id}> {msg.author_username} : {msg.message} </li>
        })
        return (
            <ul className = 'MessageList'>
                {res}
            </ul>
        )
    }
}
export default MessageList;
