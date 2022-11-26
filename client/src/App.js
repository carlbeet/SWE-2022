import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
//import { Route, Routes} from "react-router";
import LandingPage from './components/LandingPage.js';
import About from './components/About.js';
import SignUpForm from './components/SignUpForm.js';
import Login from './components/login.js';
import LoginForm from './components/LoginForm.js';
//terminal: npm install react-router-dom

export default function App() {

const styles = {
  main: {
    // width: '100vw',
    // height: '100vh',
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center'
  },

  top: {
    // backgroundColor: 'rgb(0, 250, 250)',
    // display: 'flex',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  
   },

  navbar: {
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'baseline'
   
  }

}

const links = [ {text: 'HOME', link: '/', emphasis: true },
{text: 'ABOUT', link: '/about' },
{text: 'SIGN UP', link: '/signup'},
{text: 'LOGIN', link: '/login'}
// ... navbar ...
 ]
 
 // this is the multi step onboarding form!
 // https://www.youtube.com/watch?v=wOxP4k9f5rk
 const [page, setPage] = useState(0);
 const advancePage = () => {
  setPage((page) => page + 1);
 }
 const backUpPage = () => {
  setPage((page) => page - 1);
 }

 const FormTitles = ["Anonymous Web Messaging App", "is bro ok?", "bro is scaring the hoes"]

return (
  <div className = "App">
  <Router> 
    <div style = {styles.main} >
      <div style = {styles.top} >
      <div style = {styles.navbar}> 
    {links.map((link) => (
      <Link to = {link.link}>
        <p className ="link"> {link.text} </p>
      </Link>  
     // link ref: https://www.youtube.com/watch?v=DO-pSysGItQ
     // Switch make sures theres only one page at a time renders that component inside the route*/
    ))}
    <div className = "routes" > 
    <Routes> 
      <Route exact path = '/' element ={<About/>} />
      <Route path = {links[1].link} element = {<About/>} />
      <Route path = {links[2].link} element = {<SignUpForm/>} />
      <Route path = {links[3].link} element = {<Login/>} />
  
    </Routes>
    </div>
      </div>
      </div>
    </div>
  </Router>

  <div className = 'form'> 
    <div className = 'header'>
      <h1> {FormTitles[page]} </h1>
    </div>
      <div className = 'body'> 
      <button className = 'headrs' onClick = {backUpPage}> prev </button>
      <button className = 'headrs' onClick = {advancePage}> next </button>
      </div>
    </div>
    </div>
)}
