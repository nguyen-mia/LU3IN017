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
      username : '',
      profile :'',
      search : false
    }
    this.setConnected = this.setConnected.bind(this)
    this.setLogout = this.setLogout.bind(this)
    this.handlePage = this.handlePage.bind(this)
    this.setProfile = this.setProfile.bind(this)
    this.setMessages = this.setMessages.bind(this)
  }

  setConnected = (sesKey, sesUser) => {
    this.setState({
      isConnected: true,
      currentPage: 'messages',
      sessionKey: sesKey,
      username : sesUser,
    });
  }

  setLogout = (data) => {
    this.setState({
      isConnected: false,
      currentPage: 'login',
      sessionKey: data
    });
  }

  setProfile = (profile) => {
    this.setState({
      currentPage : 'profile',
      profile : profile
    })
  }
  
  setMessages = (reload) =>{
    this.setState({
      currentPage : 'messages',
      search : false,
      reload : reload
    })
  }
  handlePage = (pageName) => {
    this.setState({ currentPage: pageName});
  }

  render() {
    const { isConnected, currentPage, username, profile} = this.state;

    return <div>
      <h1>Birdy !</h1>
      <NavigationPanel
        isConnected={isConnected}
        setConnected={ this.setConnected }
        setLogout={this.setLogout}  
        handlePage={ this.handlePage }
        setMessages={ this.setMessages}
        currentPage={currentPage}
        username={username}
        setProfile={this.setProfile}
      />
      <main>
        {!isConnected &&
          <div>Welcome to birdy</div>
        }
        {currentPage === 'messages' && isConnected
          && <MessagesPage  username={username} setProfile={this.setProfile} setMessages={ this.setMessages}/>}
        {currentPage === 'profile' && isConnected
          && <Profile  profile={profile}/>}
        {currentPage === 'signup' && !isConnected
          && <SignUp setConnected={ this.setConnected }/>}
      </main>
    </div>;
  }
}

export default MainPage;
