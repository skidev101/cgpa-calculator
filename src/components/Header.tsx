import React from 'react'

const Header = () => {
  return (
    <header className='fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-6 bg-[#080a08]'>
      <div className='flex items-center gap-4 text-xl'>
        <span className='text-[#e8ff47]'>◈</span>
        <span className='text-white -ml-2'><em className='font-bold'>CGPA</em>calc</span>
      </div>
    </header>
  )
}

export default Header