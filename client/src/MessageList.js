import React from 'react'
import axios from 'axios';
import {Link} from "react-router-dom";

import styles from './css/MessageList.module.css';
import profilepic from './css/profilepic.png';


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
            return <div class={styles.gryph_wrap}>
                <div class={styles.gryph_header}>
                    <img src= {profilepic} alt="Profile_Picture" class={styles.avator}/>

                    <li  key={msg._id}> 

                        <div class={styles.gryph_header_info}>

                        <Link to={`/user/${msg.author_username}`}> 
                            {msg.author_username} 
                        </Link> 
                                               
                        <span> {msg.date} </span>
                        </div>
                        
                        <div>
                            {msg.message} 
                        
                        
                        {this.props.currentUser === msg.author_username && 

                        <button class = {styles.delete} 
                            onClick={() => { this.deleteMessage(msg._id)}}> delete 
                        </button> 
                        
                        }
                        </div>
                </li>
            </div>
        </div>
        })

        let follow_list = this.props.following.map((f) => {
            return f.followee_id
        })
        let resAvecF = messages.map((msg)=>{
            return <div>             
                { follow_list.indexOf(msg.author_username) > -1 
                &&
                <div class={styles.gryph_wrap}>
                    <div class={styles.gryph_header}>
                        <img src= {profilepic} alt="Profile_Picture" class={styles.avator}/>

                            <li key={msg._id}> 
                                <div class={styles.gryph_header_info}>
                                    <Link to={`/user/${msg.author_username}`}> 
                                        {msg.author_username} 
                                    </Link> 

                                   
                                    <span> {msg.date}</span>

                                </div>

                                    {msg.message} 
                                    {this.props.currentUser === msg.author_username && 


                                    <button className = {styles.delete} onClick={() => { this.deleteMessage(msg._id)}}> delete </button> }
                                    
                            </li>
                    </div>
                </div>
        }
            
        </div>
            
        })
        return (
            <div className = {styles.MessageList}>
                
                { filter 
                    ? <ul> {resAvecF} </ul>
                    : <ul> {resSansF} </ul>
                }
            </div>
        )
    }
}
export default MessageList;
