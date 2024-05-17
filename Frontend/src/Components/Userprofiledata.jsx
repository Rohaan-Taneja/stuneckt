import React, { useEffect, useState } from "react";

const Userprofiledata = (props) => {
  const [userdata, setuserdata] = useState({
    username: "",
    followers: "",
    following: "",
  });

  const [UpdatedUsername, setUpdatedUsername] = useState(null);

  const userid = props.uid;

  //   function to update the changes happening in username modal input field
  const handleInputChange = (e) => {
    setUpdatedUsername(e.target.value);
  };

//   function to update the username in backend 
  const Save_Updated_Changes = async () => {

    const content ={
        u_name : UpdatedUsername,
        u_id : userid
    }
    try {
      const response = await fetch(
        `http://localhost:8000/api/user/Update_userdetails`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body : JSON.stringify(content)
        }
      );

      const data = await response.json();

      if(data.message === "user with this name alredy exist"){
        setUpdatedUsername("")
        alert("user with this alredy exist , please select some other name")
      }
      else{
        setuserdata({
          ...userdata,
          username: UpdatedUsername,
  
        });
        alert("username updated")

      }

      console.log(data);

      

      // if any error occured
    } catch (error) {
      console.error("login failed!", error);
      alert(
        "an error is coming up in logging you in  , please try to login again"
      );
    }
  };

  useEffect(() => {
    // function to get username , followers , following
    async function fetchuserdata() {
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

        console.log(data);

        setuserdata({
          username: data.username,
          followers: data.followers,
          following: data.following,
        });

        // if any error occured
      } catch (error) {
        console.error("login failed!", error);
        alert(
          "an error is coming up in logging you in  , please try to login again"
        );
      }
    }

    fetchuserdata();
  }, []);

  return (
    <div>
      <div class="profile-container">
        {/* user details  */}
        <div className="username">{userdata.username}</div>
        <span className="followers">{userdata.followers} Followers</span> •{" "}
        <span className="following">{userdata.following} Following</span>

        {/* modal /button to edit user username  */}
        {/* <!-- Button trigger modal --> */}
        <button
          type="button"
          class="btn btn-primary font-weight-bold"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <h2> Edit Profile</h2>
        </button>
        {/* <!-- Modal --> */}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 id="exampleModalLabel">Edit Profile</h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <label
                  htmlFor="inputIndex"
                  className="updated_username_modal_field"
                >
                  Username
                </label>
                {/* Input field */}
                <input
                  type="text"
                  className="updated_username_modal_field"
                  id="inputIndex"
                  name="inputIndex"
                  value={UpdatedUsername}
                  onChange={handleInputChange}
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={Save_Updated_Changes}
                >
                  <h2>Save</h2>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userprofiledata;
