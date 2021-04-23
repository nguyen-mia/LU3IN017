import React from 'react'
import Login from './Login'
import Logout from './Logout'

class NavigationPanel extends React.Component {

  render() {
    const { currentPage, setConnected, setLogout, handlePage, isConnected, username, setMessages, setProfile} = this.props;
    
    return <nav id="navPanel">
      <button onClick={() => { setMessages();  }}>Home</button>
      {isConnected
        ? <div>
            <button onClick={() => { setProfile(username); }}> {username} </button>
            <Logout setLogout={setLogout} />
          </div>
        : <div>
            <Login setConnected={setConnected } /> 
            {currentPage !== 'signup' && 
              <button onClick={() => { handlePage('signup'); }}>S'inscrire</button>
            }

            
          </div>
      }
      {}
    
    </nav>;
  }
}

export default NavigationPanel;
