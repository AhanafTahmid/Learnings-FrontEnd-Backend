import React from 'react'
import Link from 'next/link';

const layout = ({children}) => {
  return (
    <div>
        
        <Link href="/about/mission" className="text-blue-500 hover:underline" > Mission </Link>
        <Link href="/about/vision" className="text-blue-500 hover:underline ml-4"> Vision </Link>
        {children}
        </div>
  )
}

export default layout