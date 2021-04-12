import React from 'react';
import './index.css';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = 
            {page : props.page,
            isConnected : props.isConnected
        }
    }

    render(){
        return(
            <div className = "Login"> 
                <div>
                    <label> Login </label>
                        <input type ="text"/>
                </div>
                <div>
                    <label> Mot de passe </label>
                        <input type = "password"/>
                </div>
                <input type = "submit" value = "Login"/>
            </div> 
        );
    }
}

export default Login
