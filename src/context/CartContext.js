import React, { createContext, useState } from 'react'

export const CartContext = createContext([])

const CartProvider = ({children}) => {
  
  const [cart, setCart] = useState([]);
  const [show, setShow] = useState(false);
  
  const closeModal = () => {
    setShow(false)
}

  const addItem = (item, itemQty) => {
    let isInCart = cart.findIndex((e) => e.item.id === item.id )
    if (isInCart !== -1) {
      let newCart = cart.filter((e)=> e !== cart[isInCart])
      itemQty = cart[isInCart].itemQty + itemQty
      if (itemQty > item.stock) {
        setShow(true)
      }
      else {
      setCart([...newCart, { item, itemQty }])
      console.log(isInCart)}
    }
    else {
      setCart([...cart, { item, itemQty }])
      console.log(isInCart)
    }
  }

  const removeItem = (item) => {
    let newCart = cart.filter((e)=> e.item !== item)
    setCart([...newCart])
  }



  const reset = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{cart, addItem, removeItem, reset, show, closeModal}}>{children}</CartContext.Provider>
  )
}

export default CartProvider