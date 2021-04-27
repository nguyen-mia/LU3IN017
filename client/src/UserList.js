import React from 'react'

class UserList extends React.Component {
    render(){
        const {userList, type} = this.props;
        let following = userList.map((user)=>{
            return <li key={user.followee_id}> 
                {user.followee_id}
                {this.props.currentUser === user.follower_id 
                && <button onClick={() => { 
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
            <div>
                {type === 'following'
                ?<div>FOLLOWING 
                    <ul className = 'UserList'>
                        {following}
                    </ul>
                </div>
                :<div>FOLLOWERS
                    <ul className = 'UserList'>
                        {followers}
                    </ul>
                </div>
                }
                
                

            </div>
        )
    }
}
export default UserList;
