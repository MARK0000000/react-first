
import React, {useState} from 'react';
import MyButton from './UI/button/MyButton';
import { useNavigate } from 'react-router';
const PostItem = (props) => {
   //console.log(props)
   const navigate = useNavigate();
   return (
      <div className="post">
         <div className="post__items">
            <h1 className="post__title">
               <strong className="post__title-strong">{props.post.id}. {props.post.title}</strong>
            </h1>
            <p className="post__item">{props.post.body}</p>
         </div>
         <MyButton onClick={() => navigate(`${props.post.id}`, { replace: false })} className="post__btn">Open</MyButton>
         <MyButton onClick={() => props.remove(props.post)} className="post__btn">Delete</MyButton>
      </div>
   )

} 

export default PostItem;