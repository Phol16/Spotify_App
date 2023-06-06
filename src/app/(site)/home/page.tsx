import React from 'react'
import Categories from './components/Categories'

const Home = () => {
  return (
  <div className='p-2 h-[calc(100dvh_-_230px)] overflow-y-auto scrollbar-hide'>
    <section className=' p-2'>
    <Categories/>
    </section>
  </div>
  )
}

export default Home