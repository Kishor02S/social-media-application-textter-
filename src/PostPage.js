import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
export const PostPage = ({posts,handleDelete}) => {
  const {id}=useParams();
  const post=posts.find(post=>(post.id).toString()===id);
  return (
  <main className='PostPage'>
    <article className='post'>
      {post &&
      <>
      <h2>{post.title}</h2>
      <p className='postDate'> {post.date}</p>
      <p className='postBody'>{post.body}</p>
      <Link to={`/edit/${post.id}`}>
      <button>Edit Post</button>
      </Link>
      <button onClick={()=>handleDelete(post.id)}>
        Delete Post
      </button>
      </>}
      {!post &&
      <>
      <h2>
        Post not found
      </h2>
      <p> <Link to="/">Go To Home Page</Link></p>
      </>
      }
    </article>
    
  </main>
  )
}
