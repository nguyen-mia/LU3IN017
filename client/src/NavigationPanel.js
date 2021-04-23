import React from 'react'
import Login from './Login'
import Logout from './Logout'

class NavigationPanel extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const { currentPage, setConnected, setLogout, handlePage, isConnected, username } = this.props;
    
    return <nav id="navPanel">
      <button onClick={() => { handlePage('messages'); }}>Home</button>
      {isConnected
        ? <div>
            <button onClick={() => { handlePage('profile'); }}> {username} </button>
            <Logout setLogout={this.props.setLogout} />
          </div>
        : <div>
            <Login setConnected={this.props.setConnected } /> 
            {currentPage != 'signup' && 
              <button onClick={() => { handlePage('signup'); }}>S'inscrire</button>
            }

            
          </div>
      }
      {}
    
    </nav>;
  }
}

export default NavigationPanel;