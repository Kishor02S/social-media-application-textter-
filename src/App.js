// import { Link, Route, Routes } from "react-router-dom";
import { About } from "./About";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Home } from "./Home";
import { Missing } from "./Missing";
import { Nav } from "./Nav";
import { NewPost } from "./NewPost";
import { PostPage } from "./PostPage";
// import { Post } from "./Post";
import { useEffect, useState } from "react";
import {format} from "date-fns";
import { Route, Routes, useNavigate } from "react-router-dom";
import api from "./axios/Posts"
import { EditPost } from "./EditPost";

function App() {
  const[posts,setPosts]=useState([])
  const[search, setSearch]=useState('');
  const[searchResult,setSearchResult]=useState([]);
  const[postTitle,setPostTitle]=useState('');
  const[postBody,setPostBody]=useState('');
  const[editTitle,setEditTitle]=useState('');
  const[editBody,setEditBody]=useState('');
  const navigate=useNavigate();//used to go to a default page when page not found

  useEffect(()=>{
    const fetchPosts= async ()=>{
      try{
        const response=await api.get('/posts');
        setPosts(response.data);
      }catch(err){
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }else{
          console.log(`error:${err.message}`);
        }
      }
    }
    fetchPosts();
  },[])

  useEffect(()=>{
    const filteredResults=posts.filter((post)=>((post.body).toLowerCase()).includes(search.toLowerCase())
  || ((post.title).toLowerCase()).includes(search.toLowerCase()));
  setSearchResult(filteredResults.reverse());
  },[posts,search])

  const handleSubmit=async (e)=>{
    e.preventDefault();
    const id=posts.length ?posts[posts.length-1].id+1:1;
    const datetime =format(new Date(),'MMMM dd, yyyy pp');
    const newPost={id,title:postTitle,datetime,body:postBody};
    try{
    const response=await api.post('posts',newPost)//adding newPost data to json server data
    const allPosts=[...posts,response.data];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/'); //navigate is a variable with usenavigate hook
  }catch(err){
    if(err.response){
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    }else{
      console.log(`error:${err.message}`);
    }
  }
}
const handleEdit=async(id)=>{
  const datetime =format(new Date(),'MMMM dd, yyyy pp');
  const updatedPost={id,title:editTitle,datetime,body:editBody};
try{
  const response= await api.put(`/post${id}`,updatedPost);
  setPosts(posts.map(post=>post.id===id?{...response.data}:post));//replacing the old post with new updatePost using id
  setEditTitle('');
  setEditBody('');
  navigate('/');
}catch(err){
  console.log(err.message);
}
}
const handleDelete= async(id)=>{
try{
    await  api.delete(`/posts/${id}`)
      const postsList=posts.filter(post=>post.id !==id);
      setPosts(postsList);
      navigate('/')
    }catch(err){
      console.log(err.message);
    }
  }
  return (
    <div className="App">
     <Header title={"Textter"} />
     <Nav 
     search={search}
     setSearch={setSearch}/>
     <Routes>
     <Route path="/" element={<Home posts={searchResult} />} />
      <Route path="post">
        <Route index element={<NewPost
    handleSubmit={handleSubmit}
     postTitle={postTitle}
     setPostTitle={setPostTitle}
     postBody={postBody}
     setPostBody={setPostBody}
     />}/>
     <Route path=":id" element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
     </Route>
     <Route path="/edit/:id" element={<EditPost
     posts={posts}
      handleEdit={handleEdit}
       editBody={editBody}
      setEditBody={setEditBody} 
      editTitle={editTitle}
     setEditTitle={setEditTitle}
     />}/>
     <Route path="about" element={<About />}/>
     <Route path="*" element={<Missing />}/>
     </Routes>
     {/* header and footer will always stay in all pages */}
     <Footer />


    </div>
  );
}

export default App;
