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
import ProfileForm from './views/ProfileForm.jsx';
import PhaseOne from './views/PhaseOne.jsx'
import PhaseTwo from './views/PhaseTwo.jsx'
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import UserLayout from './components/UserLayout.jsx';
import Game from './components/Game.jsx'
import UserSearch from './views/UserSearch.jsx';
import Reset from './views/Reset.jsx';
import Resetcode from './views/Resetcode.jsx';

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
            {
                path: '/reset',
                element: <Reset />
            },
            {
                path: '/resetcode',
                element: <Resetcode />
            }
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
                path:'/play',
                element: <Game />
            },
            {
                path: '/main',
                element: <Main />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/profile/:id',
                element: <Profile />
            },
            {
                path: '/guide',
                element: <Guide />
            },
            {
                path:'/phaseOne',
                element: <PhaseOne />
            },
            {
                path:'/phaseTwo',
                element: <PhaseTwo />
            },
            {
                path: '/store',
                element: <Store />
            },
            {
                path: '/profile/edit/:id',
                element: <ProfileForm key={'profileUpdate'}/>
            },
            {
                path: 'search',
                element: <UserSearch />
            }
        ]
    },
])

export default router;
