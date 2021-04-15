import React from 'react';
import axios from 'axios';

const serveur_config = {
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json:charset=UTF-8',
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login : "",
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

  response_login(response) {
      //console.log(response.data)
      if(response.data["status"] == 401) {
          const message = response.data["message"];
          this.setState({status:"error", texterror:message})
      } else {
          this.setState({
            status:"",
            login: response.data["session_key"]
          })
          //this.props.login(response.data["session_key"])
      }
  }

  send() {
    const api = axios.create({
    baseURL : '/api/',
    timeout : 1000,
    headers : {'X-Custom-Header' : 'foobar'}
    });
    api.post('/login/',{
              "login":this.state.login,
              "password":this.state.password,
            })
    .then(response => {
      this.response_login(response);
      console.log(response)
    });
  }

  render(){

    return (
      <nav>
          <div>
              <span>
                  <div>Login</div>
                  <input
                      type="text"
                      name="login"
                      onChange={this.handleChange}
                      value={this.state.login}
                  />
              </span>
              <span>
                  <div>
                      Password
                  </div>
                  <input
                      type="password"
                      name="password"
                      onChange={this.handleChange}
                      value={this.state.password}
                  />
              </span>
          </div>
          <div key={this.state.status}>
              {
                (this.state.status == "error")
                ? <span style={{color:"red"}}>{this.state.texterror}</span>
                : <span></span>
              }
              <button
                onClick = { (event => this.send()) }
              >
              Log In
              </button>
          </div>
      </nav>
      );
  };
}

export default Login;
