import {createBrowserRouter , } from 'react-router-dom'
import Login from '../components/LogIn'
import Dashboard from '../components/admin/Dashboard'
import Events from '../components/admin/events/Events.js'
import AddEvent from '../components/admin/events/AddEvent.js'
import Announcements from '../components/admin/announcements/Index.js'
import AddAnnouncements from '../components/admin/announcements/New.js'
import Profile from '../components/admin/auth/Profile.tsx'
import Home from '../components/admin/Home.tsx'
const router = createBrowserRouter([
    {
        path:"/",
        element:<Dashboard/>,
        children:[
            {
                path:"home",
                element:<Home/>
            },
            {
                path:"events",
                element:<Events/>
            },
            {
                path:"events/new",
                element:<AddEvent/>
            },
            {
                path:"announcements",
                element:<Announcements/>
            },
            {
                path:"announcements/new",
                element:<AddAnnouncements/>
            },

            {
                path:"/user/profile",
                element:<Profile/>
            }
        ]
    },
    {
        path:"/auth/login",
        element:<Login/>
    }
])

export default router