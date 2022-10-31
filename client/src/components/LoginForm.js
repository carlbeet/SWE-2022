import React, { useState } from 'react'



function LoginForm({login, error}) {
    const [details, setDetails] = useState({name: "", email: "", password: ""}); //local details
   
    const submitHandler = e => { //prevent page from rerender.
        e.preventDefault();
        
        login(details);
    }

  return (
    <form onSubmit = {submitHandler}>
        <div className = "form-inner">
            <h2> Login </h2>
            { /*Error*/ }
            <div className= "form-group">
                <label htmlFor="name"> Name: </label>
                <input type="text" name="name" id="name" onChange={ e => setDetails({...details, name: e.target.value})} value = {details.name}  />
            </div>
            <div className= "form-group">
                <label htmlFor="email"> Email: </label>
                <input type="text" name="email" id="email" onChange={ e => setDetails({...details, email: e.target.value})} value = {details.email} />
            </div>
            <div className= "form-group">
                <label htmlFor="password"> Password: </label>
                <input type="text" name="password" id="password" onChange={ e => setDetails({...details, password: e.target.value})} value = {details.password} />
            </div>
            <input type= "submit" value = "LOGIN" />
        </div>
    </form>
  )
}

export default LoginForm;
