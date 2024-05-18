import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { currentLoggedInUser } from "../features/User/UserSlice";
import UseAvatarComponent from "./UseAvatarComponent";
import DisplayAllPost from "./DisplayAllPost";

const UserAccount = () => {

  const { user } = useParams();

  const userid = user;
  // console.log(user);

  // storing the userid of the logged in user 
  const dispatch = useDispatch()
  dispatch(currentLoggedInUser(user))


  return (
    <div>

      {/* thsi is the user id {user}/avatar component of the loggedin user  */} 
      <UseAvatarComponent uid = {userid} />


      {/* load all post */}
      <DisplayAllPost />
     
    </div>
  );
};

export default UserAccount;
