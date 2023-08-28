import {React , useState} from "react";
import { NavLink } from "react-router-dom";
const Registrarion = () => {

    const [login,setLogin] = useState('')
    const [password,setPassword] = useState('')
    const onChangeLogin = (e)=>{
        setLogin(e.target.value)
    }
    const onChnagePassword =(e)=>{
        setPassword(e.target.value)
    }

    const sendDataToServer = ()=>{
      console.log(login,password)
      fetch('http://localhost:5000/reg',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login1: login,
          password1: password
        })
      })
      .catch(err => console.error(err))
    }
    
    return (
    <div className="login-container">
      <form className="login-form" >
        
        <label htmlFor="username">Username:</label>
        <br/>
        <input
          type="text"
          id="username"
          value = {login}
          onChange={onChangeLogin}
        />
        <br/>
        <label htmlFor="password">Password:</label>
        <br/>
        <input
          type="password"
          id="password"
          value = {password}
          onChange={onChnagePassword}

        />
        <br/>
        <button type="submit" onClick={sendDataToServer}>Login</button>
        <h2>Есть аккаунт?</h2>
        <NavLink to='/enter'>
            <h2>Войти</h2>
        </NavLink>
        <NavLink to='/'>
            <h2>На главную</h2>
        </NavLink>
      </form>
    </div>
    )
}
export default Registrarion