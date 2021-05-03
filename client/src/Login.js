import React from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";

import "./css/Login.module.css";
import styles from './css/Login.module.css';
import logo from './css/logo.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username : "",
      password : "",
      status : "",
      texterror : ""
    };
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event = {}) {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;
    this.setState({[name]:value});
  }
  
  response_login(response) {
    //console.log(response.data)
    if(response.data["status"] !== 200) {
      this.setState({
        status: response.data["status"], 
        texterror:response.data["message"]
      })
    } else {
      this.props.setConnected(response.data["session_key"], response.data["username"]);
      this.props.history.push('/')
    }
  }

  send() {
    const api = axios.create({
    baseURL : '/api/',
    timeout : 1000,
    headers : {'X-Custom-Header' : 'foobar'}
    });
    api.post('/login',{
              "username":this.state.username,
              "password":this.state.password,
            })
    .then(response => {
      this.response_login(response);
    })
    .catch(error => {
      this.response_login(error.response);
    });
  }

  render(){

    return (
      <section class={styles.container}>
     
    <div classname = {styles.log}>
    
      
      
      <nav className = {styles.all}>
      <img className={styles.logo} src= {logo} alt="gryphon" /> 
      <h1 className={styles.text}> See what's happening <br/> in your University!</h1>
      <h6 className={styles.text2}> Join Gryphon today.</h6>
          <div>
          <div className={styles.partie_gauche}> <img className={styles.partie_logo} src= {logo} alt="gryphon" /> </div>

              <span>
                  {/*<h4>Login</h4>*/}
                  <input className={styles.login}
                      placeholder = "Login"
                      type="text"
                      name="username"
                      onChange={this.handleChange}
                      value={this.state.username}
                  />
              </span>
              <span>
                  {/*<h4>Password</h4>*/}
                  <input className={styles.password}
                      placeholder = "Password"
                      type="password"
                      name="password"
                      onChange={this.handleChange}
                      value={this.state.password}
                  />
              </span>
              </div>
          <div key={this.state.status}>
              {
                (this.state.status !== "error")
                ? <div style={{color:"red"}}>{this.state.texterror}</div>
                : <span></span>
              }
              <button className={styles.butlogin}
                onClick = { (event => this.send()) }
              >
              Log In
              </button>
          </div>
          
      </nav>
      </div>
      </section>
      );
  };
}

export default withRouter(Login);
