import { notFound } from 'next/navigation';
import React from 'react'

const page = ({params}) => {
    const { id } = params;
    if( id === '3') {
        notFound();
    }   
  return (
    <div>page {id}</div>
  )
}

export default page