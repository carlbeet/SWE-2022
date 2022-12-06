import React, { useState } from 'react'



function LoginForm({login, error}) { //functional component
    const [details, setDetails] = useState({name: "", email: "", password: ""}); //local details
   
    const submitHandler = e => { //prevent page from rerender.
        // pass in event as e and prevent default
        // e.target is button element
        // we can see more keys and properties of 'e" if we observe console.log(e)
        e.preventDefault();
        
        login(details);
    }

  return (
    <form onSubmit = {submitHandler}>
        <div className = "form-inner">
            <h2> Login </h2>
            { /*Error*/ }
            <div className= "form-group">
               
                <label htmlFor="email"> Email: </label>
                { (details.email.includes("gmail") ) ? (<label htmlFor="message"> lookin good icon (gmail detected) </label> ) : ( console.log ("okay")) }
        
                <input type="text" name="email" id="email" onChange={ e => setDetails({...details, email: e.target.value})} value = {details.email} />
            </div>
            <div className= "form-group">
                <label htmlFor="password"> Password: </label>
                <input type="password" name="password" id="password" onChange={ e => setDetails({...details, password: e.target.value})} value = {details.password} />
            </div>
            <input type= "submit" value = "LOGIN"/>
            <input type= "submit" onclick="location.href='http://localhost:3000';" value = "SIGNUP" />
        </div>
    </form>
  )
}

export default LoginForm;
