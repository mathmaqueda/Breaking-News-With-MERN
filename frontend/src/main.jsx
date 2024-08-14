import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home/Home.jsx';
import Search from './pages/Search/Search.jsx';
import { GlobalStyled } from './GlobalStyled.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import Authentication from './pages/Auth/Authentication.jsx';
import Profile from './pages/Profile/Profile.jsx';
import UserProvider from './Context/UserContext.jsx';
import ManageNews from './pages/ManageNews/ManageNews.jsx';
import ManageUser from './pages/ManageUser/ManageUser.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search/:title", element: <Search /> },
      { path: "/profile", element: <Profile />},
      {path: "/manage-news/:action/:id", element: <ManageNews/>},
      {path: "/manage-user/edit/", element: <ManageUser/>}
    ]
  },
  {
    path: "/auth",
    element: <Authentication />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyled />
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
