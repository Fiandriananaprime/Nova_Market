import PublicLayout from '../layouts/PublicLayout';
import LandingPage from '../pages/public/LandingPage';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import Received from '../pages/public/Received';

export const publicRoutes = [
  {
    path: '/',
    Component: PublicLayout,
    children: [
      { index: true, Component: LandingPage },
    ],
  },
  { path: '/login', Component: Login },
  { path: '/register', Component: Register },
  { path: '/received', Component: Received },
];