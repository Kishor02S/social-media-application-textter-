import React from 'react'
import { Link } from 'react-router-dom'

export const Nav = ({search,setSearch}) => {
  return (
    <nav className='Nav'>
        <form action="" className='searchForm' onSubmit={(e)=>e.preventDefault()}>
            <label htmlFor="search">Search Post</label>
            <input type="text" 
             id='search'
             onChange={(e)=>setSearch(e.target.value)}
             value={search}
             placeholder="Search Posts"
             />
        </form>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="post">Post</Link></li>
            <li><Link to="about">About</Link></li>
        </ul>
    </nav>
  )
}
