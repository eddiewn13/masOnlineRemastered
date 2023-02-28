import {createBrowserRouter, Navigate} from 'react-router-dom';
import Login from './views/Login.jsx';
import Signup from './views/Signup.jsx';
import Users from './views/Users.jsx';
import NotFound from './views/NotFound.jsx';
import Dashboard from './views/Dashboard.jsx';
import UserForm from './views/UserForm.jsx';
import Main from './views/Main.jsx';
import Guide from './views/Guide.jsx';
import Profile from './views/Profile.jsx';
import Store from './views/Store.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import UserLayout from './components/UserLayout.jsx';
import ProfileForm from './views/ProfileForm.jsx';
import Navbar from './components/Navbar.jsx'
import Game from './components/Game.jsx'

const router = createBrowserRouter( [
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/users" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <UserForm key={'userCreate'} />
            },
            {
                path: '/users/:id',
                element: <UserForm key={'userUpdate'}/>
            },
            {
                path:'/play',
                element: <Game />
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },
    {
        path: '/',
        element: <UserLayout />,
        children: [
            {
                path: '/main',
                element: <Main />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/guide',
                element: <Guide />
            },
            {
                path: '/store',
                element: <Store />
            },
            {
                path: '/profile/:id',
                element: <ProfileForm key={'profileUpdate'}/>
            }
        ]
    },
])

export default router;
