import mongoose from "mongoose";
import User from "../Models/User.Model.js";
import { isUserUnique } from "../Utils/UserVerificationMethods.js";

// function to generate tokens
const generateRefreshAccessToken = async (userid) => {
  try {
    // searching the user or we can say we are getting user
    const Userr = await User.findById(userid);

    console.log("i am in token generating funct");

    // generating token using our defined moethods in the userschema/usermodel
    const AccessToken = Userr.generateAccessToken();
    const RefreshToken = Userr.generateAccessToken();

    // setting refresh token in the user databse
    await User.updateOne(
      { _id: Userr._id },
      {
        $set: {
          RefreshToken: RefreshToken,
        },
        $currentDate: { lastUpdated: true },
      }
    );
    console.log("accestoken , refreshtoken done", AccessToken, RefreshToken);

    return { RefreshToken, AccessToken };
  } catch (error) {
    console.log(
      "error is coming up in genrating access and refresh token",
      error
    );
    return;
  }
};

// controller for registering user
const RegisterUser = async (req, res) => {
  // 1) get user data form body
  // 2) check if user alredy existed
  // 3) data base me data ko daal denge
  // 4) then return okay and userid to the frontend

  const { username, password } = req.body;

  // if user is alredy regiser before , we willl return this else will move forward
  if (await isUserUnique(username)) {
    console.log(
      "this is running , because user exist and no point in registering user"
    );
    return res.json({
      message: "user alredy registed , please try to login",
    });
  }

  // we aree saving/registering the user , passwrod will be first encrypted then stored in the db
  const newUser = await User.create({
    Username: username,
    Password: password,
  });

  res.status(200).json({
    message: "registered user succesfully",
    userid: `${newUser._id}`,
  });
};

// controller to login the user
const LoginUser = async (req, res) => {
  // whatt we are doing -
  //1) geting input data
  //2) checking if user exist by username in the backend or not ,
  //3) if we do not found any input username ,then we will send messagee user not registered
  //4) if we found the username , then we check user password
  //5) if password id wrong then send wrong password message to frontend,
  //6) if it is correct then generate tokens and save it and save cookies also

  const { username, password } = req.body;

  const LoggedInUser = await User.findOne({ Username: username });

  // if input user does not exist , we will return no user exist to frontend
  if (!LoggedInUser) {
    return res.status(401).json({
      message: "user does not exist",
    });
  }

  // true/false => checking if user wrote the correct password
  const isUserCorrect = await LoggedInUser.isPasswordCorrect(password);

  // if paswword is wrong we will return wrong password message to frontend
  if (!isUserCorrect) {
    return res.status(301).json({
      message: "wrong password",
    });
  }

  // creating and setting AccessToken , refresh ttoken in the db
  const { AccessToken, RefreshToken } = await generateRefreshAccessToken(
    LoggedInUser._id
  );

  // setting the user cookies option , to keep it secure , only server can edit it
  const options = {
    httpOnly: true,
    //    secure:true
  };

  // aftter succesfull login , then we send ok message , userid and cookies
  //   we are setting two cookies acces token and refresh token
  res
    .status(200)
    .cookie("accessToken", AccessToken, options)
    .cookie("refrehToken", RefreshToken, options)
    .json({
      message: "user logged inn",
      Userid: `${LoggedInUser._id}`,
    });
};

// when user home page opens , to load the userprofile data , thiss controller will be called
const getuserdetails = async (req, res) => {
  // what are we doing ?
  // !) gettin userid from the url and then finding the user in the db

  const uid = req.params.userid;
  // console.log("this is the id coming",uid );

  // getting the username , no of followers and following from he db
  const result = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(uid) } },
    {
      $project: {
        Username: 1,
        followersCount: { $size: { $ifNull: ["$Followers", []] } },
        followingsCount: { $size: { $ifNull: ["$Followings", []] } },
      },
    },
  ]);

  // console.log("this is the result",result);

  // if no user found , then result = empty array
  if (result == []) {
    return res.status(404).json({
      message: "no user found",
    });
  }

  res.status(200).json({
    Message: "all okay",
    username: result[0].Username,
    followers: result[0].followersCount,
    following: result[0].followingsCount,
  });
};

// controller to update the user profile data , here in our case is only username
const UpdateUserDetails = async (req, res) => {
  const updated_name = req.body.u_name;

  const findd_user_with_this_name = await User.findOne({
    Username: updated_name,
  });

  // if user with the updatd  username aalredy exist , we cant change it , duplicate username will occur
  if (findd_user_with_this_name) {
    return res.status(300).json({
      message: "user with this name alredy exist",
    });
  }

  await User.updateOne(
    { _id: req.body.u_id },
    {
      $set: {
        Username: updated_name,
      },
      $currentDate: { lastUpdated: true },
    }
  );
  // getting the updated username from the backend , as well as checking if username is updated or not
  const userrrr = await User.findById(req.body.u_id);

  console.log("this is the undated user", userrrr);
  res.status(200).json({
    message: "updated",
    username: userrrr.Username,
  });
};

// function to increase followers and following , when user 1 follows user2
const FollowerFollowingIncrease = async (req, res) => {

  // L_user follows P_user

//   p_user = profile user , whose profile is being followed bythe loggedin user 
  const { P_user, L_user } = req.body;

  console.log(L_user, P_user);

  // L_user follows P_user , therefore , L_user followings list increased by 1
  await User.updateOne(
    { _id: L_user },
    {
      $push: {
        Followings: P_user,
      },
      $currentDate: { lastUpdated: true },
    }
  );

  // L_user follows P_user , therefore P_user followers list increased by 1
  await User.updateOne(
    { _id: P_user },
    {
      $push: {
        Followers: L_user,
      },
      $currentDate: { lastUpdated: true },
    }
  );

  const u1 = await User.findById(L_user);
  const u2 = await User.findById(P_user);
  console.log("LOGGEDIN USER", u1, "PROFILE USER", u2);

  res.status(200).json({
    message: "FOLLOW_STATUS_UPDATED",
  });
};

//fucntion when loggedin user unfollows this profile user 
const FollowerFollowingDecrease = async (req, res) => {
  // L_user unfollows P_user

//   p_user = profile user , whose profile is being followed bythe loggedin user 
  const { P_user, L_user } = req.body;

  // L_user unfollows P_user , therefore , L_user followings list decrease by 1
  await User.updateOne(
    { _id: L_user },
    {
      $pull: {
        Followings: P_user,
      },
      $currentDate: { lastUpdated: true },
    }
  );

  // L_user unfollows P_user , therefore P_user followers list decrease by 1
  await User.updateOne(
    { _id: P_user },
    {
      $pull: {
        Followers: L_user,
      },
      $currentDate: { lastUpdated: true },
    }
  );

  const u1 = await User.findById(L_user);
  const u2 = await User.findById(P_user);
  console.log("user1", u1, "user2", u2);

  res.status(200).json({
    message: "all okay",
  });
};

// FUNCTION TO GET FOLLOWERS LIST OF A USER
const getAllMyFollowers = async (req, res) => {
  const { userid } = req.body;

  try {
    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const followersIDlist = user.Followers;

    // getting user id and username from the list 
    const AllUsers = await User.find(
      { _id: { $in: followersIDlist } },
      { Username: 1, _id: 1 }
    );

    console.log(AllUsers);

    if (AllUsers.length === 0) {
      return res.json({
        message: "0 followers",
      });
    }

    res.status(200).json({
      message: "greater than 0 followers",
      allfollowers: AllUsers,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};


// function to get list of all followings
const getAllMyFollowings = async (req, res) => {
 
  const { userid } = req.body;

  try {
    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const followingIDlist = user.Followings;

    // getting username and id only
    const AllUsers = await User.find(
      { _id: { $in: followingIDlist } },
      { Username: 1, _id: 1 }
    );

    if (AllUsers.length === 0) {
      return res.json({
        message: "0 followings",
      });
    }

    console.log("this is the user list", AllUsers);

    res.status(200).json({
      message: "greater than 0 followings",
      allusers: AllUsers,
    });

  } catch (error) {
    console.error("Error fetching followings:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// this will check weather the logeedin use is following the user(whose profile page  is opened)
const getFollowStatus = async (req, res) => {
  const { P_user, logedin_User } = req.body;

  const userObjectId = new mongoose.Types.ObjectId(P_user);

  // checking if p_user exists in following list of loggedin user
  const isFollowing = await User.exists({
    _id: logedin_User,
    Followings: userObjectId,
  });

  if (!isFollowing) {
    return res.json({
      followstatus: "not Following",
    });
  }

  console.log("this is the following status", isFollowing);

  res.json({
    followstatus: "Following",
  });
};

export {
  RegisterUser,
  LoginUser,
  getuserdetails,
  UpdateUserDetails,
  FollowerFollowingIncrease,
  FollowerFollowingDecrease,
  getAllMyFollowers,
  getAllMyFollowings,
  getFollowStatus,
};
