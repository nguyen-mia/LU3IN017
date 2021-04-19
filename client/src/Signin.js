import React from 'react';
import './index.css';

class Signin extends React.Component{
    constructor(props){
        super(props);
        this.state = 
            {page : props.page,
            isConnected : props.isConnected
        }
    }

    render(){
        return(
            <div className = "Signin"> 
            </div> 
        );
    }
}

export default Signin
