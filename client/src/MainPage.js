import React from 'react';
import './index.css';
import NavigationPannel from './NavigationPannel';

class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            page : "login_page", 
            isConnected : false
        }
        this.getConnected = this.getConnected.bind(this);
        this.setLogout = this.setLogout.bind(this);
        this.setSignin = this.setSignin.bind(this);
    }

    render(){
        return ( 
            <div className = "MainPage">
                {/* { this.state.isConnected ? 'Connected' : 'Please login' } */}
                <NavigationPannel 
                    login = {this.getConnected}
                    logout = {this.setLogout}
                    isConnected = {this.state.isConnected} 
                    signin = {this.setSingin}>
                </NavigationPannel>
            </div> 
        );
    }

    getConnected() { 
        this.setState(
            {page : "message_page",
            isConnected : true}
        )
    }

    setLogout(){
        this.setState(
            {page : "login",
            isConnected : false}
        )
    }

    setSignin(){
        this.setState(
            {page : "message_page",
            isConnected : true}
        )
    }
}
export default MainPage