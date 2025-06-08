import React from 'react'
import Button from '@/app/components/Button';
import Image from 'next/image';
import thumb from '@/public/images/summer.jpg';
const page = () => {
  return (
    <>      
    <div>Mission Page</div>
    <Button/>
    <Image placeholder="blur" src={thumb} alt="Thumbnail Image"/>
    </>
  )
}

export default page