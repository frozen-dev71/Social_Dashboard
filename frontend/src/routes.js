import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import EditPage from './pages/EditPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';

export default function Router() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const routes = useRoutes([
    {
      path: '/',
      element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'edit', element: <EditPage />},
        { path: 'profile', element: <ProfilePage />},
        { path: 'editprofile', element: <EditProfilePage />},
      ],
    },
    {
      path: 'login',
      element: isAuthenticated ? <Navigate to="/" /> : <LoginPage />,
    },
    {
      path: 'register',
      element: isAuthenticated ? <Navigate to="/" /> : <RegisterPage />,
    },
    {
      element: isAuthenticated ? <SimpleLayout /> : <Navigate to="/login" />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
