import React, {useState} from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';


const PostForm = ({create}) => {
   //console.log(props)
   const [post, setPost] = useState({title: '', body: ''})

   const addNewPost = (e) => {
      e.preventDefault()
      const newPost = {
         ...post,
         id: Date.now()
      }
      create(newPost)
      setPost({title: '', body: ''})
   }

   return (
      <form action="#">
      {/* Управляемый */}
      <MyInput value={post.title} placeholder='Title of post' type='text' onChange={e => setPost({...post, title: e.target.value})}></MyInput>
      <MyInput value={post.body}  placeholder='Description' type='text' onChange={e => setPost({...post, body: e.target.value})}></MyInput>
      {/* Неуправляемый
      <MyInput ref={bodyInputRef} placeholder='Описание поста'></MyInput> */}
      <MyButton onClick={addNewPost}>Add post</MyButton>
   </form>
   )

} 

export default PostForm;