import React, { useEffect, useState } from "react";
import PostTemplate from "./PostTemplate";

const DisplayAllPost = () => {
  const [Posts, setPosts] = useState([]);

  const getPostTemplate = (p) => {
    console.log("post content", p);
    return (
      <PostTemplate
        p_id={p._id}
        creator_id={p.PostCreator}
        post_title={p.title}
        posts_content={p.PostContent}
        PostCreator_name={p.PostCreator_Name}
      />
    );
  };

  useEffect(() => {
    try {
      const GetAllPost = async () => {
        const response = await fetch(
          `https://stuneckt-k58i.onrender.com/api/post/getAllPosts`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log("posts ==", data.allposts);
        setPosts(data.allposts);
      };

      GetAllPost();
    } catch (error) {
      console.log("an error occured whie loading all Post", error);
    }
  }, []);

  console.log(Posts.length);
  return <div>{Posts.map(getPostTemplate)}</div>;
};

export default DisplayAllPost;
