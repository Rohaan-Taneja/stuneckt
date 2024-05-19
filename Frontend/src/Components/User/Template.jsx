import React from "react";
import { useNavigate } from "react-router-dom";

const Template = (props) => {
  console.log("these are the props", props);

  const navigate = useNavigate();

  const user = props.uid;

  const someone_Uid = user;

  // this will send the id of the user in the follower/following list and hence that follower/following user profile will open
  const handleClick = (event) => {
    event.preventDefault();
    navigate(`/user/UserProfile/${someone_Uid}`);
    window.location.reload();
  };

  return (
    <div className="follow_user_outerdiv">
      <button onClick={handleClick} className="follower-button">
        <div className="follower-info">
          <div className="f_name">{props.uname}</div>
        </div>
      </button>
    </div>
  );
};

export default Template;
