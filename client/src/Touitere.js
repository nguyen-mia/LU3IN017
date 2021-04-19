import React from 'react';
import Login from './login';

class Touitere extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='Touitere'>
        <Login />
      </div>
    );
  }

};


export default Touitere;
