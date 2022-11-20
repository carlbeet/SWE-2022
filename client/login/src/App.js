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
    setUser({
      name: details.name,
      email: details.email
    });

    setCookie('username', details.email, { path: '/' });
	  

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
    <div className="App">
      { (user.email != "") ? ( // javascript statement!
        <div className = "welcome">  
        <h2> Welcome, <span> {user.name} </span></h2>
        
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
  );
}

export default App;
