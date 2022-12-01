//import logo from './logo.svg';
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import Home from './components/Home';


function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123"
  }

  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);

    if (details.email == adminUser.email && details.password == adminUser.password) {
    console.log("Logged in!");
    setUser({
      name: details.name,
      email: details.email
      document.cookie = "username=" + details.name;
    });
    }
    else {
    console.log("Details do not match!")
    }
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
        <button onClick = {Logout}> Logout </button> 
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
