import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NavigationPanel from './NavigationPanel';
import MessagesPage from './MessagesPage';
import SignUp from './SignUp';
import Profile from './Profile'

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      sessionKey : '',
      username : '',
    }
    this.setConnected = this.setConnected.bind(this)
    this.setLogout = this.setLogout.bind(this)
  }

  setConnected = (sesKey, sesUser) => {
    this.setState({
      isConnected: true,
      sessionKey: sesKey,
      username : sesUser,
    });
  }

  setLogout = (data) => {
    this.setState({
      isConnected: false,
      sessionKey: data
    });
  }


  render() {
    const { isConnected, username} = this.state;

    return (
      <Router>
        <div>
          <NavigationPanel
            isConnected={isConnected}
            setConnected={ this.setConnected }
            setLogout={this.setLogout}  
            username={username}
          />
             
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/user/:username">
              { isConnected && <Profile />}
            </Route>
            <Route path="/signup">
              <SignUp setConnected={ this.setConnected }/>
            </Route>
            <Route path="/search/:keyword">
              <MessagesPage key="1" username={username} />
            </Route>
            <Route path="/">
              { isConnected && 
                <MessagesPage key="2" username={username} />
              }
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default MainPage;
