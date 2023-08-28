import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
const Upp = () => {

    return(
        <div>
            {!localStorage.getItem('LogIn') ? (
            <div>
            <div className="buttons">
                <NavLink to="/enter">
                <button className='EnterButton'>Enter</button>
                </NavLink>
                <NavLink to="/reg">
                <button className="RegButton">Registrarion</button>
                </NavLink>
            </div>
            <h1 className="shop">Shop</h1>
            </div>
            ):
            (
            <nav className="navigation">
                <NavLink to={`${localStorage.getItem('LogIn')}/items`} className="nav-link" activeClassName="active-link" exact>
                Shop
                </NavLink>
                <NavLink to={`${localStorage.getItem('LogIn')}/recommendations`} className="nav-link" activeClassName="active-link">
                Рекомендации
                </NavLink>
                <NavLink to={`${localStorage.getItem('LogIn')}/cart`} className="nav-link" activeClassName="active-link">
                Корзина
                </NavLink>
                <NavLink to={`/${localStorage.getItem('LogIn')}`} className="nav-link" activeClassName="active-link">
                Профиль
                </NavLink>
            </nav>
            )
}
        </div>
    )
}
export default Upp