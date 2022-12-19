import React from 'react'
import BlogSection from '../components/blogSection/BlogSection'

const Home = () => {
  return (
    <div>
      <div>Trending</div>
      <div>Blog Section
        <BlogSection />
      </div>
      <div>Tags</div>
      <div>Most Popular</div>
    </div>
  )
}

export default Home