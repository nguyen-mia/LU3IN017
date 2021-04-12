import React from 'react';
import './index.css';
import Login from './Login';
import Logout from './Logout';
import Signin from './Signin';

class NavigationPannel extends React.Component{
    constructor(props){
        super(props);
        this.state = 
            {page : props.page,
            isConnected : props.isConnected
        }
    }

    render(){
        return ( 
            <div className = "NavigationPannel" >
                <nav>
                {this.state.isConnected ? 
                    <Logout logout = {this.setLogout}></Logout>
                    : 
                    <Login login = {this.getConnected}></Login> 
                }   
                <Signin signin = {this.setSignin}></Signin> 
                </nav>
            </div> 
        );
    }
}

export default NavigationPannel