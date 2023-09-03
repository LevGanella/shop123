import React ,{useState}from "react";
import { NavLink ,useParams } from "react-router-dom";
import Chat123 from "./Chat123";

const UserPage = () => {
    const {login}=useParams()
    const [help ,setHelp] =useState(false)
    console.log(login)
    const Onexit = ()=>{
        localStorage.removeItem('LogIn')
    }
    const Onhelp = ()=>{
        if(help){
            setHelp(false)
            window.location.reload()
        }
        else{
            setHelp(true)
            
        }
    }
    return (
        <div>
            
            {login==localStorage.getItem('LogIn')?(
                
        <div className="user-page">
        <nav className="navigation">
            <NavLink to="/" className="nav-link" activeClassName="active-link" >
            На главную
            </NavLink>
            <NavLink to={`/${localStorage.getItem('LogIn')}/recommendations`} className="nav-link" activeClassName="active-link">
            Рекомендации
            </NavLink>
            <NavLink to={`/${localStorage.getItem('LogIn')}/cart`} className="nav-link" activeClassName="active-link">
            Корзина
            </NavLink>
            <NavLink to="/" className="nav-link" activeClassName="active-link" onClick={Onexit}>
            Выйти
            </NavLink>
        </nav>
        
        <main>
            <section className="profile">
            <h2>Ваш профиль</h2>
            <div className="profile-details">
                <img
                src="https://via.placeholder.com/150"
                alt="User Avatar"
                className="avatar"
                />
                <div className="user-info">
                <p className="user-name">{login}</p>
                <p className="user-email">user@example.com</p>
                </div>
            </div>
            </section>
            <section className="settings">
            <h2>Настройки</h2>
            <label htmlFor="notifications">Уведомления</label>
            <input type="checkbox" id="notifications" checked />
            </section>
            <button onClick={Onhelp}>Help</button>
            {help?(
                <Chat123 />
            ):
            (
                <div>
                </div>
            )}
            
        </main>
        <footer>
            <p>&copy; {new Date().getFullYear()}</p>
        </footer>
        </div>
            ):(
                <div>
                    <h1>404</h1>
                </div>
            )}
        </div>
    )
}

export default UserPage;
