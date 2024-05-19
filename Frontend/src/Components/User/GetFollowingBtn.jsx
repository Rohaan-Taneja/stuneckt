import React from "react";
import { useState } from "react";
import Template from "./Template";

const GetFollowingBtn = (props) => {
  // this is the map callback function , this will return individual following list item/user
  const userfollowingsData = (user) => {
    // console.log("thisis the user" , user);
    if (!user) {
      return null;
    }

    // console.log("this is the userr", user);

    return <Template uid={user._id} uname={user.Username} />;
  };

  // usestate arrray to store the list of following users
  const [FollowingList, setFollowingList] = useState([]);

  // fuction to fetch the following list from backend
  const GetMyFollowingList = async () => {
    try {
      const userid = { userid: props.uid };

      const response = await fetch(
       "/api/user/getAllMyFollowings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userid),
        }
      );

      const data = await response.json();
      console.log("following list =" ,data.allusers);

      // console.log("this is the folowing data " , data);

      if (
        data.message === "0 followings" ||
        data.status === 404 ||
        data.status === 500
      ) {
        setFollowingList([]);
      } else {
        setFollowingList(data.allusers);
      }

      // console.log("this isthelist of following", data);
    } catch (error) {
      console.log("erros is coming in getting user folowing list", error);
    }
  };

  

  return (
    <div>
      <div>
        {/* Modal button */}
        <button
          type="button"
          className="btn custom-btn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalFollowing"
          onClick={GetMyFollowingList}
        >
              <h2>{props.userfollowings} Following</h2>
        </button>

        {/* Modal */}
        <div
          class="modal fade"
          id="exampleModalFollowing" // Unique identifier
          tabindex="-1"
          aria-labelledby="exampleModalLabelFollowing" // Unique identifier for aria-labelledby
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              {/* Modal Header */}
              <div class="modal-header">
                <h1 id="exampleModalLabelFollowing">Following List</h1>{" "}
                {/* Unique identifier */}
              </div>

              {/* Modal Body */}
              <div class="modal-body">
                {FollowingList && FollowingList.length > 0 ? (
                  FollowingList.map(userfollowingsData)
                ) : (
                  <h1>No following</h1>
                )}
              </div>

              {/* Modal Footer */}
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  <h2>Close</h2>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetFollowingBtn;
