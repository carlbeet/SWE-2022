//import logo from './logo.svg';
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';


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
      { (user.email != "") ? (
        <div className = "welcome"> 
        <h2> Welcome, <span> {user.name} </span></h2>
        <button onClick = {Logout}> Logout </button>
        </div>
      ) : (
        <LoginForm login = {Login} error = {error}/> //if there is an error we will display it if there isnt we wont
      )
      }
     
    </div>
  );
}

export default App;
