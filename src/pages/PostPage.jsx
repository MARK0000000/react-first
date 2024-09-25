import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import PostService from '../APi/PostService';
import MyLoader from '../components/UI/Loader/MyLoader';
import {useFetching} from '../hooks/useFetching'


const PostPage = () => {
   const param = useParams()
   const [post, setPost] = useState({})
   const [comments, setComments] = useState([])
   const [fetchPostsById, isLoading, error] = useFetching( async (id) => {
      const response = await PostService.getById(param.id)
      setPost(response.data)
      console.log(response.data)
   })
   const [fetchComments, isComLoading, comError] = useFetching( async (id) => {
      const response = await PostService.getCommentsById(param.id)
      setComments(response.data)
   })


   useEffect( () => {
     fetchPostsById(param.id)
     fetchComments(param.id)
   }, [])
  
   return (
      <div className='container'>
         <h1 style={{fontSize: 50, textAlign: 'center'}}>You have reached the post page {param.id}</h1>
         <hr />
         {isLoading 
         ?  <MyLoader/>
         :   <div style={{fontSize: 40, textAlign: 'center'}}>{post.title}</div>
         }
         <h1 style={{fontSize: 50, textAlign: 'center', marginTop: 30}}>Comments</h1>
         {isComLoading 
         ?   <MyLoader/>
         :   <div>
               {comments.map( com => 
                  <div key={com.id} style={{marginTop: 15}}>
                     <h5>{com.email}</h5>
                     <div>{com.body}</div>
                  </div>
               )}
            </div>
         }
      </div>
   )

} 

export default PostPage
