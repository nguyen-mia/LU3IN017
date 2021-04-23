import React from 'react';
import axios from 'axios';

class Logout extends React.Component{
    constructor(props){
        super(props);
        this.state = 
            {page : props.page,
            isConnected : props.isConnected
        }
    }

    response_logout(response) {
        //console.log(response.data)
        if(response.data["status"] === 401) {
              const message = response.data["message"];
              this.setState({status:"error", texterror:message})
          } else {
              this.props.setLogout('');
          }
      }

    send() {
        const api = axios.create({
        baseURL : '/api/',
        timeout : 1000,
        headers : {'X-Custom-Header' : 'foobar'}
        });
        api.delete('/logout',{})
        .then(response => {
          this.response_logout(response);
        });
      }
    

    render(){
        return(
            <div className = "Logout"> 
                <div key={this.state.status}>
              {
                (this.state.status === "error")
                ? <span style={{color:"red"}}>{this.state.texterror}</span>
                : <span></span>
              }
              <button
                onClick = { (event => this.send()) }
              >
              Log Out
              </button>
          </div>
            </div> 
        );
    }
}

export default Logout
