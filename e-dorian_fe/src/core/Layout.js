import React from 'react'
import '../styles.css'

const Layout = ({
  title = 'Title',
  description = 'Description',
  className,
  children,
}) => (
  <div style={{minHeight:'75vh'}}>
    <div className='jumbotron'>
      <h2>{title}</h2>
      <p className='lead'>{description}</p>
      <p>Tady bude Carousel</p>
    </div>
    <div className={className}>{children}</div>
  </div>
)

export default Layout
