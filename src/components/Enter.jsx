import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const Enter = () => {

  const [login,setLogin] = useState('')
  const [password,setPassword]=useState('')
  const [url,setUrl]=useState('')
  const onChangeLogin = (e)=>{
    setLogin(e.target.value)
  }
  const onChnagePassword =(e)=>{
    setPassword(e.target.value)
  }
  const sendDataToServer = ()=>{
    fetch('http://localhost:5000/enter',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: login,
        password: password
      })
    })
    .then(res=>res.json())
    .then(result=>{
        if (result){
          setUrl(result)
          window.history.pushState(null,null,`http://localhost:3000/${result}`)
          window.location.reload()
          localStorage.setItem('LogIn',result)
        }        
        
      }
    )
    .catch(error => {
      console.error(error)});
  }

    return (
    <div className="login-container">
      <form className="login-form" >
        <label htmlFor="username">Username:</label>
        <br/>
        <input
          type="text"
          id="username"
          value={login}
          onChange={onChangeLogin}
        />
        <br/>
        <label htmlFor="password">Password:</label>
        <br/>
        <input
          type="password"
          id="password"
          value={password}
          onChange={onChnagePassword}
        />
        <br/>
        <button onClick={sendDataToServer} type="button">Login</button>
        <h2>Нет аккаунта?</h2>
        <NavLink to='/reg'>
            <h2>Регистрация</h2>
        </NavLink>
        <NavLink to='/'>
            <h2>На главную</h2>
        </NavLink>
      </form>
    </div>
    )
}
export default Enter