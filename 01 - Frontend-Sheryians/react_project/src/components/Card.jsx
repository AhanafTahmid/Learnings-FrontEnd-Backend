import React from 'react'

function card(prop) {
    console.log(prop);//returns object
  return (
    <div>user name is {prop.ucard}</div>
  )
}

export default card