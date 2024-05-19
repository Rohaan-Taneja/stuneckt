import React from 'react'
import { useNavigate } from 'react-router-dom'


const PostTemplate = (props) => {

  const navigate = useNavigate();

  const gotoPostCreator_ProfilePage =()=>{

    const someone_Uid = props.creator_id

    navigate(`/user/UserProfile/${someone_Uid}`)

  
  }
  return (
    <div className="post-container" onClick={gotoPostCreator_ProfilePage}>
    <div className="post-title">{props.post_title}</div>
    <div className="post-content">{props.posts_content}</div>
  </div>
  )
}

export default PostTemplate