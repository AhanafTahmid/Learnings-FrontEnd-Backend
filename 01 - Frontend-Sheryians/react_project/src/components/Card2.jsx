import React from 'react'

function Card2(props) {
    //console.log(props);
    const obarray = [
          {
            "name": "Alice Johnson",
            "age": 28,
            "city": "New York"
          },
          {
            "name": "Bob Smith",
            "age": 35,
            "city": "Los Angeles"
          },
          {
            "name": "Charlie Brown",
            "age": 22,
            "city": "Chicago"
          },
          {
            "name": "Diana Wilson",
            "age": 30,
            "city": "Houston"
          }
        ]

      
  return (
    // <div>
    //     Username: {props.username}.
    //     City is : {props.city}.
    //     Ager is : {props.age}
    // </div>

    <div>
        {obarray.map((el, key)=>{
            return <h1>{el.name}</h1>
        })}
    </div>
    
  )
}

export default Card2