import React from 'react'

export const Footer = () => {
  const date=new Date()
  return (
    <footer className='Footer'>
        <h1>
            Copyright @ {date.getFullYear()}
        </h1>
    </footer>
  )
}
