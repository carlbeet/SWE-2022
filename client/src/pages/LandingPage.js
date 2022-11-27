import React, { useState } from "react";


export default function LandingPage() {

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
        <div className = 'form'> 
        <div className = 'header'>
          <h1> {FormTitles[page]} </h1>
        </div>
          <div className = 'body'> 
          <button className = 'headrs' onClick = {backUpPage}> prev </button>
          <button className = 'headrs' onClick = {advancePage}> next </button>
          </div>
        </div>
       
    )
}