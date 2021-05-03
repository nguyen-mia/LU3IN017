import React from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";

import styles from './css/Signup.module.css';
import logo from './css/logo.png';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastname : "",
      firstname : "",
      currentUser : "",
      password : "",
      status : ""
    };
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event = {}) {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;
    this.setState({[name]:value});
  }
  
  response_signup(response) {
    //console.log(response.data)
    if(response.data["status"] !== 200) {
      this.setState({
        status: response.data["status"], 
        texterror:response.data["message"]
      })
    } else {
      this.props.setConnected(response.data["session_key"], response.data["username"]);
      this.setState({
        currentUser : response.data["username"]
      })
      this.props.history.push('/')
    }
  }

  send() {
    const api = axios.create({
    baseURL : '/api/',
    timeout : 1000,
    headers : {'X-Custom-Header' : 'foobar'}
    });
    api.post('/users/',{
              "username":this.state.username,
              "password":this.state.password,
              "lastname":this.state.lastname,
              "firstname":this.state.firstname
            })
    .then(response => {
      this.response_signup(response);
    })
    .catch(error => {
      this.response_signup(error.response);
    });
  }

  render(){

    return (<section class={styles.container}>
      <img className={styles.logo} src= {logo} alt="gryphon" /> 

      <nav>
          <div>
            <span>
                  <div></div>
                  <input className={styles.firstname}
                      placeholder = "First Name"
                      type="text"
                      name="firstname"
                      onChange={this.handleChange}
                      value={this.state.firstname}
                  />
              </span>
              <span>
                  <div></div>
                  <input className={styles.lastname}
                      placeholder = "Last Name"
                      type="text"
                      name="lastname"
                      onChange={this.handleChange}
                      value={this.state.lastname}
                  />
              </span>
              <span>
                  <div></div>
                  <input className={styles.username}
                      placeholder = "Username"
                      type="text"
                      name="username"
                      onChange={this.handleChange}
                      value={this.state.username}
                  />
              </span>
              <span>
                  <div></div>
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
                (this.state.status !== "")
                ? <div style={{color:"red"}}>{this.state.texterror}</div>
                : <span></span>
              }
              <button className={styles.signup}
                onClick = { (event => this.send()) }
              >
              Sign Up
              </button>
          </div>
      </nav>
      </section>
      );
  };
  
}

export default withRouter(SignUp);
