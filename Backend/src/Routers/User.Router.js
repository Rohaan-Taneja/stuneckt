import router from "express";
import {
  FollowerFollowingDecrease,
  FollowerFollowingIncrease,
  getAllMyFollowers,
  getAllMyFollowings,
  getFollowStatus,
  getuserdetails,
  LoginUser,
  RegisterUser,
  UpdateUserDetails,
} from "../Controllers/User.Controller.js";

const UserRouter = router();

UserRouter.route("/register").post(RegisterUser);

UserRouter.route("/login").post(LoginUser);

UserRouter.route("/getuserdetails/:userid").get(getuserdetails);

UserRouter.route("/Update_userdetails").post(UpdateUserDetails);

// followeer/following route handling

// loggedin user following this profile user
UserRouter.route("/follow_this_user").post(FollowerFollowingIncrease);

// loggedin user unfollowing this profile user
UserRouter.route("/unfollow_this_user").post(FollowerFollowingDecrease);

UserRouter.route("/getAllMyFollowers").post(getAllMyFollowers);

UserRouter.route("/getAllMyFollowings").post(getAllMyFollowings);

UserRouter.route("/followStatus").post(getFollowStatus)

export default UserRouter;
