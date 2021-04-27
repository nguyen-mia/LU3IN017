import React from 'react'
import Logout from './Logout'
import SearchBar from './SearchBar'
import {Link, withRouter} from "react-router-dom";

class NavigationPanel extends React.Component {

  render() {
    const { setLogout, isConnected, currentUser} = this.props;
    
    return <nav id="navPanel">
      <Link to="/">Home</Link>
      {isConnected
        ? <div>
            <Link to={`/user/${currentUser}`}>{currentUser} </Link>
            <Logout setLogout={setLogout} />
            <SearchBar currentUser={currentUser}/>
          </div>
        : <div>
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
