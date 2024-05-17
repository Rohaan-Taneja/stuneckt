import React from 'react';
import { Link } from 'react-router-dom';



function Home() {

  return (
    <div className="home-container">
        
      <div className="login-section">
        <div className='heading'>Welcome to Our Website! </div>
        <h2>Please login or register to continue.</h2>

        <div className="button-container">

          <Link to="/user/register" className="button">Register</Link>

          <Link to="/user/login" className="button" >Login</Link>
          
        </div>
      </div>
    </div>
  );
}

export default Home;

