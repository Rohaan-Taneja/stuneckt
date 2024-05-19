import React, { useEffect, useState } from "react";
import PostTemplate from "./PostTemplate";
import CreatePost from "./CreatePost";
import { useSelector } from "react-redux";

const DisplayUserAllPosts = (props) => {

  const [Posts, setPosts] = useState([]);

  const getPostTemplate = (p) => {
    return (
      <PostTemplate
        key={p._id}
        p_id={p._id}
        creator_id={p.PostCreator}
        post_title={p.title}
        posts_content={p.PostContent}
        PostCreator_name={p.PostCreator_Name}
      />
    );
  };

  // Getting the loggedin user from the Redux store
  const loggedInUser = useSelector((state) => state.userid);

  useEffect(() => {
    const GetUserAllPost = async () => {
      try {
        const content = {
          userid: props.uid,
        };

        const response = await fetch(
          `http://localhost:8000/api/post/getUserAllPost`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(content),
          }
        );

        const data = await response.json();

        console.log("posts ==", data.userposts);
        setPosts(data.userposts);
      } catch (error) {
        console.log("An error occurred while loading all posts", error);
      }
    };

    GetUserAllPost();
  }, [props.uid ]);
  console.log("this is the post array ", Posts);
  return (
    <div className="p_outer_div">
      {loggedInUser === props.uid && (
        <div className="create-post-container">
          <CreatePost uid={props.uid} />
        </div>
      )}

      <div className="posts-container">
        {Posts.length > 0 ? (
          Posts.map(getPostTemplate)
        ) : (
          <h2>No posts available</h2>
        )}
      </div>
    </div>
  );
};

export default DisplayUserAllPosts;
