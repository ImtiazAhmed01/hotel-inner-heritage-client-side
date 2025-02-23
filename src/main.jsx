import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Components/Root'
import ErrorPage from './Components/ErrorPage'
import Home from './Components/Home/Home'
import AuthProvider from './Components/Provider/authProvider'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import RoomDetail from './Components/Home/RoomDetail'
import RoomsPage from './Components/RoomsPage/RoomsPage'
import MyBookings from './Components/MyBookings/MyBookings'
import AboutUs from './Components/AboutUs/AboutUs'
import AllReview from './Components/AllReview/AllReview'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "login", element: <Login></Login> },
      { path: "register", element: <Register></Register> },
      { path: "room/:id", element: <RoomDetail></RoomDetail> },
      { path: "aboutus", element: <AboutUs></AboutUs> },
      { path: "myreviews", element: <AllReview></AllReview> },

      {
        path: "roomspage",
        element: <RoomsPage></RoomsPage>
      },
      {
        path: "mybookings",
        element: <MyBookings></MyBookings>
      }
    ]
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
