import React, { useState } from 'react';



// Notes: React "reacts" to changes in components, and rerenders the jsx in the return statement
// 1. import a react hook
// 2. create a component (class or function)
// 3. handle Events: we write useState which returns a tuple of the variable, and a function we can use to modify the values 
    // 
    // onclick is ref to function where we put js
// 4. pass in parameters to functions 
function Home() {
const [count, setCount] = useState(0)

const generateName = () => {
//TODO: implement generate name function, probably move to separate ./utils/helper folder for organization
console.log("sans sweep 2022")

}

// playing around:
const add = () => {
setCount(count+1);

}


//TODO: front end wireframes, sign up onboarding screen (+ include username gen)
//TODO: mess with css styles so that the navbar will stick to the top and cooperate. we get this result when the page is filled 
// up but otherwise not so....

//navbar:
return(
<div>
<div className = "navigation">
  <nav class="navbar navbar-expand-lg navbar-mainbg">
   
    <a class="navbar-brand navbar-logo" href="#"> Build Website</a>
  
  {/* tip: using curly brackets within jsx lets us write javascript statements! /* }
  { /*this is what we are interested in -
   how to get the navbar button click to display a different react component? */}
    <button 
      class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <i class="fas fa-bars text-white"></i>
    </button>
   
    <div 
      class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
       
            <div class="hori-selector">
              <div class="left"></div>
              <div class="right"></div>
            </div>
           
            <li class="nav-item">
                <a 
                  class="nav-link" href="dashboard">
                  <i 
                    class="fas fa-tachometer-alt">
                  </i>Dashboard
                </a>
            </li>
            <li class="nav-item active">
                <a 
                  class="nav-link" href="address">
                  <i 
                    class="far fa-address-book">
                  </i>Address Book
                </a>
            </li>
            <li class="nav-item">
                <a 
                  class="nav-link" href="components">
                  <i class="far fa-clone">
                  </i>Components
                </a>
            </li>
            <li class="nav-item">
                <a 
                  class="nav-link" href="login">
                  <i 
                    class="far fa-calendar-alt">
                  </i>Login
                </a>
            </li>
            <li class="nav-item">
                <a 
                  class="nav-link" href="signup">
                  <i 
                    class="far fa-chart-bar">
                  </i> Sign up
                </a>
            </li>
            <li class="nav-item">
                <a 
                  class="nav-link" href="settings">
                  <i class="far fa-copy">
                  </i>Settings
                </a>
            </li>
        </ul>
    </div>
  </nav>
</div>
  
  <header class="mt-5 pt-5">
    <div class="container">
      <div class="row align-items-center">
   
        <div class="col-md-6">
          <h1 class="mb-4 font-weight-bold">We build
            <span class="text-info"> website</span>
          </h1>
          <p class="mb-4 pb-2 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam vitae, culpa qui officia deserunt laborum fuga similique mollit id quos aperiam proident non ut rerum debitis.
          </p>
          <div>
            <a href="#contact" class="text-center btn btn-outline-dark btn-lg btn-block">Contact Us</a>
          </div>
        </div>
       
        <div class="col-md-6 d-none d-sm-none d-md-block">
        
        </div>
        
      </div>
    </div>
  </header>
 

  <div className='header'> 
  <h2> Chat Chat </h2>
   <h2> Welcome, <span> bookie </span></h2>
   <text> To protect your anonymity, let's generate a random name and photo </text>
  <text> Write whatever you want! Select tags related to things below blah blah </text>
  <button onClick = {generateName}> Generate!</button>
  <button onClick = {() => add()}> Add to Count </button>
  </div>
  <p>

hey guys

  </p>
  </div>
  

  
);

}
export default Home;
