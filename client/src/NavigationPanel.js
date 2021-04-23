import React from 'react'
import Login from './Login'
import Logout from './Logout'
import {Link, withRouter} from "react-router-dom";

class NavigationPanel extends React.Component {

  render() {
    const { setConnected, setLogout, isConnected, username} = this.props;
    
    return <nav id="navPanel">
      <Link to="/">Home</Link>
      {isConnected
        ? <div>
            <Link to={`/user/${username}`}>{username} </Link>
            <Logout setLogout={setLogout} />
          </div>
        : <div>
            <Login setConnected={setConnected } /> 
            {this.props.location.pathname !== '/signup' && 
              <Link to="/signup">S'inscrire</Link>
            }

            
          </div>
      }
      {}
    
    </nav>;
  }
}

export default withRouter(NavigationPanel);
