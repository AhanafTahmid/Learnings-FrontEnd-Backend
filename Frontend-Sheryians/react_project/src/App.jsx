import React,{useState, useEffect, useContext} from 'react'
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Card2 from './components/Card2';

import Child1 from './components/Child1';
import Child2 from './components/Child2';

import axios from 'axios';
import { Route,Routes } from 'react-router-dom';

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import {DataContext} from './context/UserContext.Jsx';

export const App = () => {
    var user = "ahanaf";
    const clicks = () =>{
        console.log("Button Clicked");
    }

    const chageuser = () =>{
        user = "Tahmid";
    }

    const [a, seta] = useState(10);
    const changeA = () =>{
        console.log(a);
        seta(a+1);
    }

    const [username, setusername] = useState('');

    const submithandler = (e) =>{
        e.preventDefault();
        console.log(username);
        setusername('');
    }


    const userCard = "ahanaf";

    //getting data from api
    const [data, setData] = useState([]);

    const getData = async () =>{
        const res = await axios.get('https://picsum.photos/v2/list');
        const d = res.data;
        setData(d);
        //console.log(d);
    }

    useEffect(()=>{
        getData();
    });

    const datas  = useContext(DataContext);
    //console.log(datas);

  return (
    <div >
        {/* <h1 className='text-9xl'>Hello</h1>
        <span className='text-5xl'>Hello</span>
        <button onClick={changeA}> {user} </button>

        <h1>Number {a}</h1>
        <button onClick={() => seta(a+1)}> Increase </button>
        <button onClick={() => seta(a-1)}> Decrease </button>


        <br /><br /><hr />

        <form action="" onSubmit={submithandler} 
        onChange={(e) => setusername(e.target.value)}>
            <input type="text" placeholder='Input your name'/>
            <br />
            <button value={username}
            className='bg-amber-300'>submit</button>

        </form> */}


        {/* <Header/>
        <Navbar></Navbar>
        <Footer/> */}
        
        {/* <Card ucard = {userCard}/>
        <Card ucard = "sakib"/> */}


        {/* <Card2 username="ahanaf" city="Chittagong" age="11"/>
        <Card2 username="sakib" city="Chittagong" age="1112"/>
        <Card2 username="tamim" city="Chittagong" age="12131"/> */}

        {/* <Card2/> */}

        {/* <Child1 name="ahanaf" age="11"/> */}


            
        {/* <button onClick={getData} className='active:scale-50'>Get Data </button> */}

        {/* <div className='p-5'> 
            {
                data.map((elem, index) => (
                    <div key={index} >
                        <h1>{elem.author}</h1>
                        <img src={elem.url} />
                        <img src={elem.download_url} />
                    </div>
                ))
            }
        </div> */}


    {/* react router */}

    {/* <Header/>
    <br />
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
    </Routes> */}

    {/* Context Api */}

    hello from app.js 
    <br />
    {datas}
    {datas?.username}

    <Header/>

    

    </div>

  )
}

export default App

