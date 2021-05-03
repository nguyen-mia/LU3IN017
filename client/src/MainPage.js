import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavigationPanel from './NavigationPanel';
import MessagesPage from './MessagesPage';
import SearchPage from './SearchPage';
import SignUp from './SignUp';
import Profile from './Profile';
import Login from './Login';

import styles from './css/MainPage.module.css';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      sessionKey : '',
      currentUser : '',
    }
    this.setConnected = this.setConnected.bind(this)
    this.setLogout = this.setLogout.bind(this)
  }

  setConnected = (sesKey, sesUser) => {
    this.setState({
      isConnected: true,
      sessionKey: sesKey,
      currentUser : sesUser,
    });
  }

  setLogout = (data) => {
    this.setState({
      isConnected: false,
      sessionKey: data
    });
  }


  render() {
    const { isConnected, currentUser} = this.state;

    return (
      <Router>
        <div>
          <NavigationPanel 
            isConnected={isConnected}
            setConnected={ this.setConnected }
            setLogout={this.setLogout}  
            currentUser={currentUser}
          />
             
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/user/:username">
              { isConnected
                ? <Profile currentUser={currentUser}/>
                : <Login setConnected={this.setConnected }/>
              }
            </Route>
            <Route path="/signup">
              <SignUp setConnected={ this.setConnected }/>
            </Route>
            <Route path="/search/:keyword">
            { isConnected
                ? <SearchPage currentUser={currentUser} />
                : <Login setConnected={this.setConnected }/>
              }
            </Route>
            <Route path="/">
              { isConnected 
                ? <MessagesPage currentUser={currentUser} />
                : <Login setConnected={this.setConnected } /> 

              }
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default MainPage;
