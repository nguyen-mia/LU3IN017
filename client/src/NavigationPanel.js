import React from 'react'
import Logout from './Logout'
import SearchBar from './SearchBar'
import {Link, withRouter} from "react-router-dom";

import "./css/NP.module.css";
import styles from "./css/NP.module.css";

class NavigationPanel extends React.Component {

  render() {
    const { setLogout, isConnected, currentUser} = this.props;
    
    return <div classname = "NP">
    <nav id="navPanel">
      <Link className={styles.Home} to="/">Home</Link>
      {isConnected
        ? <div>
            <Link to={`/user/${currentUser}`}>{currentUser} </Link>
            <Logout setLogout={setLogout} />
            <SearchBar currentUser={currentUser}/>
          </div>
        : <div>
            {this.props.location.pathname !== '/signup' && 
              <Link className={styles.signup} to="/signup">Sign up</Link>
            } 
          </div>
      }
      {}
    
    </nav>
    </div>
  }
}

export default withRouter(NavigationPanel);
