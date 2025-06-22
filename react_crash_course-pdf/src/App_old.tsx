import Book from './components/Book'
import type {Books} from './components/Book'
import Welcome from './components/Welcome'
import UserProfile from './components/UserProfile'
import TodoList from './components/TodoList'
import ProductCard from './components/ProductCard'
import ArrayTodo from './components/ArrayTodo'
import { useState } from 'react'
import ShoppingCart from './components/ShoppingCart'
import Form from './components/Form'
import Todo from './components/Todo'
import CallBack from './components/CallBack'
import EnhancedCounter from './components/EnhancedCounter'
import Timer from './components/Timer'
import BasicForm from './components/BasicForm'
import HookForm from './components/HookForm'
import CustomForm from './components/CustomForm'
import BlogUser from './components/BlogUser'
import { Routes, Route } from 'react-router-dom'

function App() {

  const bookdata: Books = {
    title: "Atomic Habits",
    author: "James Clear",
    year: 2018,
    isAvailable: false,
  }
  const products = [
    {
      id: 1,
      name: "shirt",
      price: 150,
      image: 'https://poshgarments.com/wp-content/uploads/2021/09/Mens-Shirt-MWS0001.jpg',
      instock: true,
      category: 'wear'
    },
    {
      id: 2,
      name: "another shirt",
      price: 2500,
      image: 'https://poshgarments.com/wp-content/uploads/2021/09/Mens-Shirt-MWS0001.jpg',
      instock: false,
      category: 'wear'
    }
  ]

  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(prevct => prevct + 1);
  }
  //setCount(count+1);
  //console.log(count);


  const handleClickk = () => {
  console.log('Button was clicked!')
  }


  const ct = 0;

  return (
    <>

    
    <Routes>
  <Route path="/user/:userId" element={<BlogUser />} />
</Routes>


    {/* <CustomForm/> */}

     {/* <HookForm/> */}
      {/* <BasicForm/> */}

      {/* <Timer/> */}


      {/* <EnhancedCounter/> */}




      {/* <Form/>
      <Todo/>
      <CallBack items={['Item 1', 'Item 2', 'Item 3']} /> */}



    </>

    
    // <>
    //  {/* <div> */}
    //   {/* <Welcome isLoggedIn={true} username={"ahanaf"} />
    //   <TodoList/>
    //   <Book bookiebro={bookdata} />
    //   <UserProfile name={'Ahanaf'} email='ahanaf' avatar='https://avatars.githubusercontent.com/u/45955172?v=4' /> */}
      
    //   {/* {
    //     products.map((val)=>(
    //       < ProductCard id={val.id} name={val.name} price={val.price} image={val.image}
    //       inStock={val.instock} category={val.category}/> 
    //     ))
    //   } */}

    //     {/* <ArrayTodo/> */}


    //     {/* <button onClick={handleClick}>  Count </button> 

    //     {count} 
    //     {console.log(count)} */}

    //       <ShoppingCart/>


    //       {/* <button onClick={handleClickk}>
    //         Click me
    //       </button>


    //   </div> */}
    // </>
  )
}

export default App;