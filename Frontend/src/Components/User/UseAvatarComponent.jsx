import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UseAvatarComponent = (props) => {
  // this sill store loggedin user username
  const [username, setusername] = useState(null);

  const navigate = useNavigate();

  //   userid of the logedin user
  const userid = props.uid;

  //   this  is the id of the user of which i want to ssee the profile , here iit is logedin user only
  const someone_Uid = userid;

  // this will load the userid page of the loggedin user and send the id of the user of which i want to see the profile
  const openUserProfile = () => {
    console.log("opening");
    navigate(`/user/UserProfile/${someone_Uid}`);
  };

  //   this will feetch the the data form the backend of the loged in userr
  useEffect(() => {
    // function to get username
    async function fetchuserdata() {
      try {
        // fetching data of the logged in user
        const response = await fetch(
          `https://stuneckt-k58i.onrender.com/api/user/getuserdetails/${userid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        // console.log(data);
        setusername(data.username);

        // if any error occured
      } catch (error) {
        console.error("login failed!", error);
        alert(
          "an error is coming in getting user details, please try to login again"
        );
      }
    }

    fetchuserdata();
  }, [userid]);

  return (
    <div className="avatar_container">
      <div className="app_name">Social's</div>
      <div className="btn_and_username_div">
        <button className="avatar_round-button" onClick={openUserProfile}>
          <img className="avatar_img" src="/Images/avatar_Image.png" />
        </button>
        <h1>{username}</h1>
      </div>
    </div>
  );
};

export default UseAvatarComponent;
