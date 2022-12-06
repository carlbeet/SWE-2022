import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import About from './pages/About.js';
import LandingPage from './pages/LandingPage.js';
import Login from './pages/Login.js';
import Home from  './pages/Home.js';
import Signup from './pages/Signup.js';
//to run locally, type in terminal: npm start 
//terminal: npm install react-router-dom

// 1. in login.js, we will use database calls api POST and GET mappings to check if info matches a record from the database
// findBy(user) is not null and if the passwords are ==, we approve login 
// then we have auth function 
//favorite resources
    //Net Ninja full tutorial, routing: https://www.youtube.com/watch?v=DO-pSysGItQ&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=23
    //AuthRoute: https://www.freecodecamp.org/news/react-router-tutorial/#:~:text=To%20add%20the%20link%20in,link%20if%20it%20is%20active. or only show dash once authenticated
// 2. all the styles... T.T
// we shall be lazy and use templates

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
{text: 'LOGIN', link: '/login'},
{text: 'Bonus', link: '/bonus'}
// ... navbar ...
 ]
 


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
      <Route exact path = '/' element ={<Home/>} />
      <Route path = {links[1].link} element = {<About/>} />   {/* about */}
      <Route path = {links[2].link} element = {<Signup/>} />   {/* signup */}
      <Route path = {links[3].link} element = {<Login/>} />    {/* login */}
      <Route path = {links[4].link} element = {<LandingPage/>} />    {/* bonus */}
  
    </Routes>
    </div>
      </div>
      </div>
    </div>
  </Router>
</div>
)}
