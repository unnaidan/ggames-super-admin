import { createBrowserRouter } from 'react-router-dom';
import { Dashboard } from './layouts/Dashboard';
import { ChallengeScoreboard } from './pages/ChallengeScoreboard';
import { Challenges } from './pages/Challenges';
import { Error } from './pages/Error';
import { Games } from './pages/Games';
import { Home } from './pages/Home';
import { Orders } from './pages/Orders';
import { Packs } from './pages/Packs';
import { Reports } from './pages/Reports';
import { Signin } from './pages/Signin';
import { Users } from './pages/Users';

export const Router = createBrowserRouter([
    {
        path: '/signin',
        element: <Signin />
    },
    {
        path: '/',
        element: <Dashboard />,
        errorElement: <Error />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'challenges',
                element: <Challenges />
            },
            {
                path: 'challenges/:id/scoreboard',
                element: <ChallengeScoreboard />
            },
            {
                path: 'games',
                element: <Games />
            },
            {
                path: 'orders',
                element: <Orders />
            },
            {
                path: 'packs',
                element: <Packs />
            },
            {
                path: 'reports',
                element: <Reports />
            },
            {
                path: 'users',
                element: <Users />
            }
        ]
    }
], {
    basename: '/ggames-super-admin'
});
