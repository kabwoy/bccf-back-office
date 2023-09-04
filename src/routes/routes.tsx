import {createBrowserRouter , } from 'react-router-dom'
import Login from '../components/LogIn'
import Dashboard from '../components/admin/Dashboard'
import Events from '../components/admin/events/Events.js'
import AddEvent from '../components/admin/events/AddEvent.js'
const router = createBrowserRouter([
    {
        path:"/",
        element:<Dashboard/>,
        children:[
            {
                path:"events",
                element:<Events/>
            },
            {
                path:"events/new",
                element:<AddEvent/>
            }
        ]
    },
    {
        path:"/auth/login",
        element:<Login/>
    }
])

export default router