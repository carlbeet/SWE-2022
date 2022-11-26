//LandingPage 2
import React, { useState } from "react";


export default function Home() {

const n = 6;
 // this is the multi step onboarding form!
 // https://www.youtube.com/watch?v=wOxP4k9f5rk
 const [page, setPage] = useState(0);
 const advancePage = () => {
  
  (page > n-1) ? (
    setPage((page) => 0)) : (
    setPage((page) => page + 1))
    console.log(page);
 }

 const backUpPage = () => {
   (page < 1) ? (
    setPage((page) => n)) : (
    setPage((page) => page - 1))
    console.log(page);
  }
 

 const FormTitles = ["Anonymous Web Messaging App (Home Page)", "welcome to our app where u can talk anonymously to ur coworkers", "yes mhm good learns. its 4 am im so tired.", 
 "this app is structured a certain way! we go to the App component first. That is automatically rendered when we go to our website. and on top of that is the Home component, the one you're seeing right now! :) because the plain ol '/' route will use the Home component, as described by the code in App.js.",
"Try clicking 'about' on the navbar. what do you see in the search bar? That's right! We come to a new route.",
"notice here are the 'prev' and 'next' buttons. these are different from pages. They use <button> click Events to trigger changes to the state of our page variable. They will these work with react's useState and arrays. As we update page with each click, we loop through the array. If you inspect this page, you may observe that we log page number in the console. :)", 
"aaand we arrive back at start..." ]



    return ( 
        <div className = 'form'> 
        <div className = 'header'>
          {(page < 2) ? (<h1> {FormTitles[page]} </h1>) : (<div> <h1> A little bit on how this app is organized: </h1>
           <p> {FormTitles[page]} </p> </div>) }
         
        </div>
          <div className = 'body'> 
          <button className = 'headrs' onClick = {backUpPage}> prev </button>
          <button className = 'headrs' onClick = {advancePage}> next </button>
          </div>
          <div> 
            </div>
                </div>
       
    )
}