import React, { useState, useEffect, useRef} from 'react';
import '../styles/Reset.css';
import '../styles/App.css';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import PostService from '../APi/PostService';
import { useFetching } from '../hooks/useFetching';
import { getPagesCount} from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';
import MyLoader from '../components/UI/Loader/MyLoader';


function Posts() {
   const [posts, setPosts] = useState([
      {id: 1, title: ' JavaScript', body: 'some text', },
      {id: 2, title: ' Java', body: 'some text', },
      {id: 3, title: ' JavaScript', body: 'some text', },
   ])
   const [modal, setModal] = useState(false)
   const [filter, setFilter] = useState( {sort: '', query: ''})
   const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
   const [totalPages, setTotalPages] = useState(0)
   const [limit, setLimit] = useState(10)
   const [page, setPage] = useState(1)
   const lastElement = useRef()
   console.log(totalPages)
   const [fetchPosts, isPostsLoading, postError] = useFetching( async (limit, page) => {
      console.log(limit, page)
      const response = await  PostService.getAll(limit, page)
      console.log(response)
      setPosts([...posts, ...response.data])
      console.log(response)
      const  totalCount = response.headers['x-total-count']
      setTotalPages(getPagesCount(totalCount, limit))
   })
   
   useObserver(lastElement, page < totalPages, isPostsLoading, () => {setPage(page + 1)})

   useEffect(() => {
      fetchPosts(limit, page)
   }, [page, limit])
   
   const createPost = (newPost) => {
      setPosts([...posts, newPost])
      setModal(false)
   }
   const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
   }
   const changePage = (page) => {
      setPage(page)
   }

  return (
   <>
      <div className="App">
         <MyButton onClick={() => fetchPosts(limit, page)}>Get posts</MyButton>

         <MyButton style={{marginTop: 30}} onClick={() => {setModal(true)}}>New post</MyButton>
         <MyModal visible={modal} setVisible={setModal}><PostForm create={createPost}/></MyModal>

         <hr style={{margin: '15px 0'}} />

         <PostFilter
         filter={filter}
         setFilter={setFilter}
         />
         <MySelect
         value={limit}
         onChange={value => setLimit(value)}
         defaultValue="Quantity of elements"
         options={[
            {value: 5, name: "5"},
            {value: 10, name: "10"},
            {value: 25, name: "25"},
            {value: -1, name: "ALL"},
         ]}
         />
         {postError && <h1 style={{fontSize: 60, textAlign: 'center'}}>Ошибка ${postError}</h1>}
         <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Posts'} />
         <div ref={lastElement} style={{height: 20}}></div>
         {isPostsLoading &&
            <MyLoader/>
         }
      </div>
   </>
  );
}

export default Posts;

