import React from "react";
import { useParams } from "react-router-dom";
import Userprofiledata from "./Userprofiledata";
import { useState } from "react";
import { useEffect } from "react";

const UserAccount = () => {
  const { user } = useParams();
  console.log(user);


  return (
    <div>
      {/* thsi is the user id {user} */}
     <Userprofiledata uid = {user} />
    </div>
  );
};

export default UserAccount;
