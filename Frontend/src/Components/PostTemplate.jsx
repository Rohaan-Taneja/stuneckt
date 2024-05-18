import React from 'react'
import { useNavigate } from 'react-router-dom'


const PostTemplate = (props) => {

  const navigate = useNavigate();

  const gotoPostCreator_ProfilePage =()=>{

    const someone_Uid = props.creator_id

    navigate(`/user/UserProfile/${someone_Uid}`)
  
  }
  return (
    <div onClick={gotoPostCreator_ProfilePage}>
      {/* <div>{props.p_id}</div> */}
      {/* <div>{props.creator_id}</div> */}
      <div>{props.PostCreator_name}</div>
      <div>{props.post_title}</div>
      <div>{props.posts_content}</div>
      
    </div>
  )
}

export default PostTemplate