
import { useState, useRef, Component } from 'react';
import RegisterForm from "@/app/(browser)/_components/RegisterForm/RegisterForm";
import LoginForm from "@/app/(browser)/_components/LoginForm/LoginForm";

export default function AuthForm (props) {
    const[formToShow, setFormToShow]=useState<string>(props.form);
    console.log(formToShow);
    console.log("Token from login " + localStorage.getItem("jwtToken"));
    return(

        ( formToShow === 'login') 
        ? (<LoginForm stateChanger={setFormToShow} />) 
        : ( formToShow === 'register') 
        ?(<RegisterForm stateChanger={setFormToShow} />)
        : null

        
    )
  }