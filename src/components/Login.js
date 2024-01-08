import React from "react";
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    },[])
    
    const handleLogin = async() => {
        console.log(email, password);

        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        if(result.auth){
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('token',JSON.stringify(result.auth));
            navigate('/'); 
        }else{
            console.log("Please enter correct credential");
        }
        
        
    }
    return (
        <div className='login'>
            <h1>Login</h1>
            <input className="inputBox"
                value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Enter Email' />
           
            <input className="inputBox" type="password"
                value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
            <button className="appButton" type="button" onClick={handleLogin} >Login</button>
        </div>
    )
}

export default Login;