import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext([])

const CartProvider = ({children}) => {
  
  const [cart, setCart] = useState([]);
  const [show, setShow] = useState(false);
  const [cartCount, setCartCount] = useState(0)
  const [billTotal, setBillTotal] = useState(0)

  useEffect(() => {
    const getCartTotal = () => {
      let cartTotal = 0
      cart.map((e) => cartTotal += e.itemQty)
  
      setCartCount(cartTotal) 
    }
    setBillTotal(cart.map((e)=>e.item.price*e.itemQty).reduce((prev, act)=> prev + act, 0))

    getCartTotal();
  }, [cart])
  

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
      }}
      else {
      setCart([...cart, { item, itemQty }])
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
    <CartContext.Provider value={{cart, addItem, removeItem, reset, show, closeModal, cartCount, billTotal}}>{children}</CartContext.Provider>
  )
}

export default CartProvider