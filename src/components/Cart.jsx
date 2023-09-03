
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
const Cart =()=>{
    const [items,setItems]=useState([])
    const {login}=useParams()

    

    const OnClickClose=(userLogin,name,id,price,count)=>{
        fetch('http://localhost:5000/cart/delete',{
          method:'DELETE',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(
            {
              user:userLogin,
              name:name,
              id:id,
              price:price,
              count:count
            }
          )
          })
          .then(res=>res.json())
          .then(res=>{
            if(res===true){
              window.location.reload()
            }
          })
  }


    useEffect(()=>{
    fetch('http://localhost:5000/cart',
    {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(
            {
            login:localStorage.getItem('LogIn')
            
            }
            )
        
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Лежим')
      }
      return res.json()
    })
    .then(res => {
      setItems(res)
    })
    .catch(error => {
      console.error('error:', error);
      
    })
  }, []);
  
  const onPay = (name,id,price,count,login)=>{
    fetch('http://localhost:5000/cart/pay',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },   
    body:JSON.stringify(
      {
        name:name,
        id:id,
        price:price,
        count:count,
        login:login
      }
    )
  })
  }
  
  
  
  
  
    
    return (
        <div>
            {login===localStorage.getItem('LogIn')?(
                <div>
                  <NavLink to='/'>
                    <button className="cart-button" >На главную</button>
                  </NavLink>
                <div className="cart-container">
                
                {items.length === 0 ? (
                  <div className="empty-cart">No items in the cart.</div>
                
                ) 
                : (
                  items.map((item, index) => (
                    <div key={new Date().getTime() + index} className="cart-item">
                      
                      <div className="item-index">{index + 1}.</div>
                      <div className="item-details">
                        <div className="item-name">Name: {item.name}</div>
                        <div className="item-price">Price: {item.price}</div>
                        <div>Count:{item.count}</div>
                        <div className="final-price">Final Price: <span id="final-price-value">{item.price * item.count}</span></div>
                      </div>
                      <div className="checkout-button-wrapper">
                        <button className="checkout-button" onClick={()=>onPay(item.name,item.id,item.price,item.count,localStorage.getItem('LogIn'))}>Оформить</button>
                      </div>
                      <div>
                        
                      </div>
                      <button className="close-button" onClick={()=>OnClickClose(localStorage.getItem('LogIn'),item.name,item.id,item.price,item.count)}>&times;</button>
                    </div>
                    
                  ))
                )}
                </div>
              </div>
            )
            :(
                <h1>404</h1>
            )
            }
        </div>
    )
  
}
export default Cart