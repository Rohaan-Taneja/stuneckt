import React, { useState } from "react";

// component to update the userprofilee data
const EditUserProfileModal = (props) => {
  // useeffec to store the updated user useername
  const [UpdatedUsername, setUpdatedUsername] = useState(null);

  //   function to update the changes happening in username modal input field
  const handleInputChange = (e) => {
    setUpdatedUsername(e.target.value);
  };

  //   function to update the username in backend
  const Save_Updated_Changes = async () => {
    const content = {
      u_name: UpdatedUsername,
      u_id: props.uid,
    };

    try {
      const response = await fetch(
        `https://stuneckt-k58i.onrender.com/api/user/Update_userdetails`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(content),
        }
      );

      const data = await response.json();

      if (data.message === "user with this name alredy exist") {
        setUpdatedUsername("");
        alert("user with this alredy exist , please select some other name");
      } else {
        props.setU_data({
          ...props.U_data,
          username: UpdatedUsername,
        });
        alert("username updated");
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

  return (
    <div>
      {/* modal /button to edit user username/edit user info */}
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn edit-profile-btn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <h2> 	&#9998; Edit Profile</h2>
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
  );
};

export default EditUserProfileModal;
