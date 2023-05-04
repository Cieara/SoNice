import React,{ createContext }  from 'react';
import Product from './pages/Products/Product';


const SoNiceContext =  createContext({
    authenticated: false,
    setAuthenticated: (auth) => {},
    shoppingBasket:[],
    setShoppingBasket:(products)=>{}
  });




export default SoNiceContext;