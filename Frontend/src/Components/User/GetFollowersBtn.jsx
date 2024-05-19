import React from "react";
import { useState } from "react";
import Template from "./Template";

const GetFollowersBtn = (props) => {
  const [FollowersList, setFollowersList] = useState([]);

  // this is the map callback function , this will return individual follower list item/user
  const userfollowersData = (user) => {
    if (!user) {
      return null;
    }

    return <Template uid={user._id} uname={user.Username} />;
  };

  // fuction to fetch the following list from backend
  const getMyFolwersList = async () => {
    try {
      const userid = { userid: props.uid };

      const response = await fetch(
        "http://localhost:8000/api/user/getAllMyFollowers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userid),
        }
      );

      const data = await response.json();

      // console.log("this is the following data ", data)

      if (
        data.message === "0 followers" ||
        data.status === 404 ||
        data.status === 500
      ) {
        setFollowersList([]);
      } else {
        setFollowersList(data.allfollowers);
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
          data-bs-target="#exampleModalFollowers"
          onClick={getMyFolwersList}
        >
          <h2 >
            {props.userfollowers}{" "}
            {props.userfollowers > 1 ? "Followers" : "Follower"}{" "}
          </h2>
        </button>

        {/* Modal */}
        <div
          class="modal fade"
          id="exampleModalFollowers"
          tabindex="-1"
          aria-labelledby="exampleModalLabelFollowers"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              {/* Modal Header */}
              <div class="modal-header">
                <h1 id="exampleModalLabelFollowers">Followers List</h1>{" "}
              </div>

              {/* Modal Body */}
              <div className="list_of_follow_following">
                {FollowersList.length > 0 && FollowersList ? (
                  FollowersList.map(userfollowersData)
                ) : (
                  <h1>No follower</h1>
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

export default GetFollowersBtn;
