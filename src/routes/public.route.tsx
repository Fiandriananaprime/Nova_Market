import PublicLayout from '../layouts/PublicLayout';
import LandingPage from '../pages/public/LandingPage';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import Received from '../pages/public/Received';
import { HowItWorks, CategoriesPage, SellersPage, About } from '../pages/public/SimplePages';

export const publicRoutes = [
  {
    path: '/',
    Component: PublicLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: 'how-it-works', Component: HowItWorks },
      { path: 'categories', Component: CategoriesPage },
      { path: 'sellers', Component: SellersPage },
      { path: 'about', Component: About },
    ],
  },
  { path: '/login', Component: Login },
  { path: '/register', Component: Register },
  { path: '/received', Component: Received },
];