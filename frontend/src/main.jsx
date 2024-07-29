import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home/Home.jsx';
import Search from './pages/Search/Search.jsx';
import { GlobalStyled } from './GlobalStyled.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import Authentication from './pages/Auth/Authentication.jsx';
import Profile from './pages/Profile/Profile.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar/>,
    errorElement: <ErrorPage/>,
    children: [
      {path: "/", element: <Home/>},
      {path: "/search/:title", element: <Search/>}
    ]
  },
  {
    path: "/auth",
    element: <Authentication/>
  },
  {
    path: "/profile",
    element: <Profile/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyled/>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
