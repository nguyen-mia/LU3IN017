import React from 'react'

import styles from './css/UserList.module.css';
import styles2 from './css/Profile.module.css';


class UserList extends React.Component {
    render(){
        const {userList, type} = this.props;
        let following = userList.map((user)=>{
            return <li key={user.followee_id}> 
                {user.followee_id}
                {this.props.currentUser === user.follower_id 
                && <button class = {styles2.unfollow} onClick={() => { 
                    this.props.unfollow(user.followee_id) ; 
                    this.props.fetchUser()
                    }
                }>
                    Unfollow 
                </button> }
            </li>
        })
        let followers = userList.map((user)=>{
            return <li key={user.follower_id}> {user.follower_id} </li>
        })
        return (
            <div class = {styles.container}>
                
                {type === 'following'
                
                ?<div class = {styles.container1ing}>
                    <p class = {styles.following}>FOLLOWING</p> 
                    <ul class = {styles.UserList}>
                        {following}
                    </ul>
                </div>
                
                :<div class = {styles.container2ers}>
                    <p class = {styles.followers}>FOLLOWERS</p>
                    <ul class = {styles.UserList}>
                        {followers}
                    </ul>
                </div>
                
                
                }
                
                

            </div>
            
            
        )
    }
}
export default UserList;
