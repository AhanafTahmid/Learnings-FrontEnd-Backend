import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../context/UserContext.Jsx'
import UserContext from '../context/UserContext.Jsx'


const Header = () => {
  const uuuuuser = useContext(DataContext);

  return (
    <div>
      {/* <a href="/">Home  </a>
      <a href="/contact">Contact </a>
      <a href="/about">About</a> */}


      {/* <Link to={"/"}>Home</Link>
      <Link to={"/contact"}>Contact</Link>
      <Link to={"/about"}>About</Link> */}

      {uuuuuser}
    </div>
  )
}

export default Header