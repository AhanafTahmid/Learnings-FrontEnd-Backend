import React from 'react'
import Child2 from './Child2'

function Child1(props) {
  return (
    <>
    <div>Mai hu {props.name} </div>
    <Child2 ex2_age="111"/>
    <Child2 ex2_age={props.age}/>
    </>
    
  )
}

export default Child1