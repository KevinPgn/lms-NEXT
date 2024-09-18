import { Categories } from '@/features/headersExplore/Categories'
import { HeadersExplore } from '@/features/headersExplore/HeadersExplore'
import { SearchGroups } from '@/features/headersExplore/SearchGroups'
import React from 'react'

const PageExplore = () => {
  return (
    <div>
        <HeadersExplore />
        <section className='max-w-[1400px] relative flex flex-col items-center justify-center mx-auto mt-10'>
          <div className='absolute w-[600px] h-[200px] bg-white/10 -z-10 opacity-50 rounded-full blur-xl'></div>
          <h1 className='text-7xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-r from-white/20 via-white to-white/20 leading-tight'>Explore Groups</h1>
          <span className='text-center flex items-center gap-1 justify-center text-sm text-gray-500'>or <span className='underline cursor-pointer'>create your own</span></span>
          
          <SearchGroups />
          <Categories />
        </section>
    </div>
  )
}

export default PageExplore