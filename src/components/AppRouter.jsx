import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context';
import Login from '../pages/Login';
import Posts from '../pages/Posts';
import { publicRoutes, privateRoutes } from '../router/index';

const AppRouter = () => {
  const {isAuth} = useContext(AuthContext);
  console.log(isAuth)
  return (
    isAuth
      ?
      <Routes>
      {privateRoutes.map(route => 
        <Route
            path={route.path}
            element={route.element}
            key={route.path}
        />
      )}
      <Route path="*" element={<Posts/>}/>
      </Routes>
      :
      <Routes>
      {publicRoutes.map(route => 
        <Route
            path={route.path}
            element={route.element}
            key={route.path}
        />
      )}
      <Route path="*" element={<Login/>}/>
      </Routes>
  );
};

export default AppRouter;