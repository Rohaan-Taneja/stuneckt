import React, { useState } from "react";

const CreatePost = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [PostD, setPostD] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Title:", title);
    console.log("Content:", content);

    const postData = {
      uid: props.uid,
      title: title,
      content: content,
    };

    const response = await fetch(`https://stuneckt-k58i.onrender.com/api/post/createPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const data = await response.json();

    if (data.message === "User not found") {

        console.log("user not found");
        alert("user not found");
        
    }
    else if (data.message === "Internal server error") {

        console.log("server error , please try again");
        alert("some server error , please try again later")
        
    }
    else if (data.message === "Post created successfully") {
        console.log("all okayy , post created");
        alert("New post created")
        window.location.reload();
        
    }

    // Reset the form fields if needed
    setTitle("");
    setContent("");
  };
  return (
    <div>
      <div className="CreatePost_OuterContainer">
        <h2>Create Your Post</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input"
          />

          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="textarea"
          ></textarea>

          <button type="submit" className="Post_Creation_button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
