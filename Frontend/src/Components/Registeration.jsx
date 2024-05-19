
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Registeration() {

  // usestate to store formdata 
  const [formData, setFormData] = useState(
    {
      username: "",
      password: "",
    });

    const navigate = useNavigate();


    // whenevr something is changed in input fields , this will funtion will update that in the usestaet variables 
  const handleChange = (e) => {

    // field name(username/password) and it value 
    const { name, value } = e.target;

    console.log(name , value);

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  // this will submit the data to the backend , and in return
  //  eitther the user will be register and redirected to the the useraccount page 
  // or or user is alredy register , he/she will be 
  // get an alert and will be redirected to the login page 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      // if user is alredy registered previously , he/she will be redirected to login page 
      if (data.message === "user alredy registed , please try to login" ) {

        console.log("user alredy exist" ,data)

        alert("user alredy exist , ,please try to login")
        navigate("/user/login")
        
      }

      // if we are registering user for the first and it will be redirectedto useraccount
      else{
        
        console.log('Registration successful!', data);
        const user = data.userid 
        navigate(`/user/UserAccount/${user}`)

      }
      

      // backend se user ki _id leke , use next page me dedenge and then next page me usski sari details ko 
      // dipslay krrwaleneg
      // navigate("/")
      
  
      // if any error occured 
    } catch (error) {
      console.error('Registration failed!', error);
      alert("an error is coming up in registering you , please try to register again")
    }

    console.log(formData);
    // Reset form fields after submission
    setFormData({
      username: "",
      password: "",
  
    });
  };

  return (
    <div className="registerPageOuter">
      <div className="register-container">

        <h1>Register</h1>

        <form onSubmit={handleSubmit} className="register-form">



            {/* urername field  */}
            <label htmlFor="username" className="labell">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
        
            {/* password field  */}
            <label htmlFor="password" className="labell">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registeration;
