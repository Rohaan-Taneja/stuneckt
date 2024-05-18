import React, { useEffect, useState } from "react";
import PostTemplate from "./PostTemplate";

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

  }, [props.uid]);
console.log("this is the post array ",  Posts)
  return <div>
    {Posts.map(getPostTemplate)}
    </div>;
};

export default DisplayUserAllPosts;
