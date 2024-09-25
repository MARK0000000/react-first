import About from '../pages/About';
import Posts from '../pages/Posts';
import PostPage from '../pages/PostPage';
import Login from '../pages/Login';
import { Nav } from '../pages/Nav';

export const privateRoute = [
   {path: 'about', element: <About/>},
   {path: 'posts', element: <Posts/>},
   {path: 'posts/:id', element: <PostPage/>},

]

export const publicRoute = [
   {path: '/login', element: <Login/>},
]

