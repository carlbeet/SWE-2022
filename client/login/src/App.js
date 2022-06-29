//import logo from './logo.svg';
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import { useCookies } from 'react-cookie';
import { adminUser, testingUser } from './accts.js'


function App() {


  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(['username']);

  const Login = details => {
    console.log(details);

    if ((details.email == adminUser.email && details.password == adminUser.password) || (details.email == testingUser.email && details.password == testingUser.password)) {
      
      console.log("Logged in!");
      if(details.email == adminUser.email){
        setUser({
          name: adminUser.name,
          email: details.email
        });
        setCookie('username', adminUser.username, { path: '/' });
    
      }
      else{
        setUser({
          name: testingUser.name,
          email: details.email
        });
        setCookie('username', testingUser.username, { path: '/' });

      }

   

    }
    else {
    console.log("Details do not match!")
    }
  }

  const submitHandler = e => { //prevent page from rerender.
        // pass in event as e and prevent default
        // e.target is button element
        // we can see more keys and properties of 'e" if we observe console.log(e)
        e.preventDefault();
        window.location.href = "http://localhost:3000"
        
    }

  const Logout = () => {
    setUser({ name: "", email: ""});
    console.log("logout");
  }

 
  return (
    <>
      <div class="topnav">
        <a class="active" href="http://localhost:3000">Home</a>
        <a href="http://localhost:3001">Comment</a>
        <a href="http://localhost:3002">Messaging</a>
        <a href="">About</a>
      </div>
      <div className="App">
        { (user.email != "") ? ( // javascript statement!
          <div className = "welcome">  
          <h2> Welcome, <span> {user.name} </span></h2>
          <br></br>

          <h3> Browse to our different services with the taskbar above! </h3>
          
          <form onSubmit = {submitHandler}>
          <div className = "form-inner">
              { /*Error*/ }
              <input type= "submit" value = "Log out" />
          </div>
      </form>

          </div>
        ) : (
          //<Home></Home>
          <LoginForm login = {Login} error = {error}/> //if there is an error we will display it if there isnt we wont
          // we also have the option to write anonymous functions within the jsx: onClick = {() => setDetails...}
        )
        }
       
      </div>
    </>
  );
}

export default App;
