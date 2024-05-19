import React, { useEffect, useState } from "react";
import EditUserProfileModal from "./EditUserProfileModal";
import GetFollowersBtn from "./GetFollowersBtn";
import GetFollowingBtn from "./GetFollowingBtn";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DisplayUserAllPosts from "../Post/DiplayUserAllPosts";

// This will show the ID of the logged-in user
const Userprofiledata = () => {
  // This is the ID of the person of whom i want to see the profile
  const { someone_Uid } = useParams();

  const [FollowStatus, setFollowStatus] = useState(false);

  // whose details is to be shown
  var userid = someone_Uid;

  // Getting the loggedin user from the Redux store
  const loggedInUser = useSelector((state) => state.userid);
  // console.log("This is the logged-in user ID from Redux:", loggedInUser);

  // useEffect variable to store user profile data
  const [userdata, setUserdata] = useState({
    username: "",
    followers: "",
    following: "",
  });

  // function to update the follow status / follow or unfollow user
  const update_followStatus = async () => {
    var what_To_Do = null;
    // this means loggedin user was folliwng this profile user , but on press of bttn , he wants to unfollow
    if (FollowStatus) {
      what_To_Do = "unfollow_this_user";
    }

    // loggedin user want to follow this profile user
    else {
      what_To_Do = "follow_this_user";
    }

    try {
      const Follow_UNfollow_User = {
        P_user: userid,
        L_user: loggedInUser,
      };

      async function Follow_Unfollow_User() {
        const response = await fetch(
          `http://localhost:8000/api/user/${what_To_Do}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Follow_UNfollow_User),
          }
        );

        const data = await response.json();

        console.log("i am clicked");
        console.log(data);
        setFollowStatus(!FollowStatus);
      }
      Follow_Unfollow_User();
    } catch (error) {
      console.log("an error occured in ", what_To_Do, "=>", error);
    }
  };

  useEffect(() => {
    if (userid) {
      // Function to get username, followers, and following
      async function fetchUserdata() {
        try {
          const response = await fetch(
            `http://localhost:8000/api/user/getuserdetails/${userid}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();

          setUserdata({
            username: data.username,
            followers: data.followers,
            following: data.following,
          });
        } catch (error) {
          console.error("Fetching user data failed!", error);
          // alert("An error occurred while fetching user data. Please try again." , error);
        }
      }

      fetchUserdata();
    }

    // this is to get if loggedin user following the person whose id details is been displayed
    try {
      // puser = user , whose id detail is been displayed here
      const UsersData = {
        P_user: userid,
        logedin_User: loggedInUser,
      };

      async function isLoggedInUser_FollwingThisUser() {
        const response = await fetch(
          `http://localhost:8000/api/user/followStatus`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(UsersData),
          }
        );

        const data = await response.json();

        console.log("following status", data);

        if (data.followstatus === "not Following") {
          setFollowStatus(false);
        } else {
          setFollowStatus(true);
        }
      }

      isLoggedInUser_FollwingThisUser();
    } catch (error) {
      console.log("an error occured in gtting follow status=>  ", error);
    }
  }, [userid, FollowStatus]);

  // Render loading state if userid is null
  if (!userid) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="profile-container">
        {/* User details */}
        <div className="username">{userdata.username}</div>

        <GetFollowersBtn userfollowers={userdata.followers} uid={userid} />
        <GetFollowingBtn userfollowings={userdata.following} uid={userid} />

        {/* if person viewing the this profile/page is same as the loggedin user ,  */}
        {/* then he will see edit profile else if someone else is seeing then he will see follow bttn  */}
        {userid === loggedInUser ? (
          <EditUserProfileModal
            U_data={userdata}
            setU_data={setUserdata}
            uid={userid}
          />
        ) : (
          
          // if loggedin user following this user , then following will display else vise versa
          <button onClick={update_followStatus} className="follow-btn">
            <h1>{FollowStatus ? "Following" : "Follow"}</h1>
          </button>
        )}
      </div>

      <DisplayUserAllPosts uid={userid} />
    </div>
  );
};

export default Userprofiledata;
