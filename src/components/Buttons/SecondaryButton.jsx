import React from 'react'

const SecondaryButton = ({text}) => {
  return (
    <button className='md:w-40 w-24 text-lg px-4 py-2 border border-gray-500/60 rounded-xl hover:bg-gray-600 hover:text-white'>{text}</button>
  )
}

export default SecondaryButton