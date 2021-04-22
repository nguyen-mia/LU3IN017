import React from 'react';
import NavigationPanel from './NavigationPanel';
import MessagesPage from './MessagesPage';
import SignUp from './SignUp';
import Profile from './Profile'

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'login', // valeurs possibles: 'login', 'messages', 'signup',
      isConnected: false,
      sessionKey : '',
      username : ''
    }
    this.setConnected = this.setConnected.bind(this)
    this.handlePage = this.handlePage.bind(this)
  }

  setConnected = (sesKey, sesUser) => {
    this.setState({
      isConnected: true,
      currentPage: 'messages',
      sessionKey: sesKey,
      username : sesUser
    });
  }

  setLogout = (data) => {
    this.setState({
      isConnected: false,
      currentPage: 'login',
      sessionKey: data
    });
  }

  handlePage = (pageName) => {
    this.setState({ currentPage: pageName});
  }

  render() {
    const { isConnected, currentPage, username } = this.state;

    return <div>
      <h1>Birdy !</h1>
      <NavigationPanel
        isConnected={isConnected}
        setConnected={ this.setConnected }
        setLogout={() => { this.setLogout() }}  
        handlePage={ this.handlePage }
        currentPage={currentPage}
        username={username}
      />
      <main>
        {!isConnected &&
          <div>Welcome to birdy</div>
        }
        {currentPage === 'messages' && isConnected
          && <MessagesPage  username={username}/>}
        {currentPage === 'profile' && isConnected
          && <Profile  username={username}/>}
        {currentPage === 'signup' && !isConnected
          && <SignUp setConnected={ this.setConnected }/>}
      </main>
    </div>;
  }
}

export default MainPage;
