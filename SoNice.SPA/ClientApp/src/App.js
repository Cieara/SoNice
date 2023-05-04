import React, { Component, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import { Layout } from './components/Layout';
import SoNiceContext from './SoNiceContext';

const App = () =>
 {
  const [authenticated, setAuthenticated] = useState(false);
  const [shoppingBasket, setShoppingBasket] = useState([]);

    return (
      <SoNiceContext.Provider value={{ authenticated, setAuthenticated,shoppingBasket, setShoppingBasket  }}>
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, requireAuth, ...rest } = route;
            return <Route key={index} {...rest} element={requireAuth ? <AuthorizeRoute {...rest} element={element} /> : element} />;
          })}
        </Routes>
      </Layout>
      </SoNiceContext.Provider>
    );
  
}

export default App;