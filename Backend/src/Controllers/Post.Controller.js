import { Post } from "../Models/Post.Model.js"
import User from "../Models/User.Model.js"



// function to cretae a new post 
const CreatePost = async (req, res) => {
    try {

        const { uid, title, content } = req.body;

        // Find user
        const userrr = await User.findById(uid);

        if (!userrr) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create post in the name of the user
        const newPost = await Post.create({
            PostCreator: uid,
            title: title,
            PostContent: content,
            PostCreator_Name: userrr.Username
        });

        // Add new post to the array of user's posts
        const updatedUser = await User.updateOne(
            { _id: uid },
            {
                $push: { UsersPost: newPost._id },
                $currentDate: { lastUpdated: true }
            }
        );

        const u_user = await User.findById(uid);

        res.status(200).json({
            message: "Post created successfully",
            newpost : newPost
        });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// function to get all the psot creted by user 
const GetUserAllsPosts = async(req,res)=>{
    // what we are doing?
    // 1)got user of the user , we will get arrayof post creted by the user first
    // 2)then retrieve the data of those post from post model and send it

    const userid = req.body.userid

    console.log("userid = " , userid);

    // getting user 
    const userr = await User.findById(userid)

    // getting posts array of user 
    const UserCreatedPosts= userr.UsersPost

    console.log("this is the list of post creted by user" , UserCreatedPosts);


    // fetching and storing all the details of post present in the array 
    const posts = await Post.find({ _id: { $in: UserCreatedPosts } });

    res.status(200).json({
        message :"sbb changa hai", 
        userposts : posts

    })



}


// thsi function will get all the post created till date 
const AllExistingPost = async (req, res)=>{
    
    // here we are getting all the posts 

    const AllPosts = await Post.find()

    res.status(200).json({
        message :"all the posts" , 
        allposts : AllPosts
    })


}


export {CreatePost ,GetUserAllsPosts , AllExistingPost}