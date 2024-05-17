import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {


  // usesstte for input login data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();


  // whenevr something is changed in input fields , this funtion will update that in the usestate variables
  const handleChange = (e) => {

    // name(username/password) , value
    const { name, value } = e.target;

    console.log(name, value);

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  // this fuction will submit the data to the backend and respond accordingly
  const handleSubmit = async (e) => {
    e.preventDefault();

    // sending login request to backend
    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log(data);

      // if user does not exist
      if (data.message === "user does not exist") {
        alert("user does not exist , please first register");

        navigate("/user/register");
      }

      // if password is wrong
      else if (data.message === "wrong password") {
        // Reset form
        setFormData({
          username: { ...formData.username },
          password: "",
        });
      }

      else{
       const user = data.Userid
       
        navigate(`/user/UserAccount/${user}`)
      }

  
      // if any error occured
    } catch (error) {
      console.log("login failed", error);
      alert(
        "an error is coming up in logging you in  , please try to login again");
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
        <h1>Login</h1>

        <form onSubmit={handleSubmit} className="register-form">

          {/* urername field  */}
          <label htmlFor="username" className="labell">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          {/* password field  */}
          <label htmlFor="password" className="labell">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-button">
            login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
