import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Items from './Items/Items.tsx';
import Login from './Login/Login.tsx';
import SignUp from './Login/SignUp.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "items",
    element: <Items/>
  },
  {
    path: "sign-up",
    element: <SignUp/>
  }
]);

sessionStorage.setItem("token", "")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);