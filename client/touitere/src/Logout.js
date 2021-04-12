import React from 'react';
import './index.css';

class Logout extends React.Component{
    constructor(props){
        super(props);
        this.state = 
            {page : props.page,
            isConnected : props.isConnected
        }
    }

    render(){
        return(
            <div className = "Logout"> 
                <input type = "submit" value = "Logout"/>
            </div> 
        );
    }
}

export default Logout
