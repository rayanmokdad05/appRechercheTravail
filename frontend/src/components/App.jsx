import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { useState, useCallback } from 'react';
import Users from '../Containers/Users';
import UserTasks from '../Containers/UserTasks';
import RootLayout from '../Containers/Roots';
import ErrorPage from '../Containers/ErrorPage';
import NewTask from '../Containers/NewTask';
import Auth from '../Containers/Auth';
import Subscribe from '../Containers/Subscribe';
import UpdateTask from '../Containers/UpdateTask';
import { AuthContext } from '../context/auth-context';
const routerLogin = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/auth', element: <Navigate to="/users" replace /> },
      { path: '/subscribe', element: <Navigate to="/users" replace /> },
      { index: true, element: <Users /> },
      { path: 'users', element: <Users /> },
      { path: ':userId/tasks', element: <UserTasks /> },
      { path: '/tasks/new', element: <NewTask /> },
      { path: '/tasks/:taskId', element: <UpdateTask /> },
      { path: '/auth', element: <Navigate to="/users" replace /> },
      { path: '/subscribe', element: <Navigate to="/users" replace /> },
    ],
  },
]);
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Users /> },
      { path: 'users', element: <Users /> },
      { path: ':userId/tasks', element: <UserTasks /> },
      { path: '/auth', element: <Auth /> },
      { path: '/subscribe', element: <Subscribe /> },
    ],
  },
]);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback((uid, token) => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  if (isLoggedIn) {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          login: login,
          logout: logout,
        }}
      >
        <RouterProvider router={routerLogin} />
      </AuthContext.Provider>
    );
  } else {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,

          login: login,
          logout: logout,
        }}
      >
        <RouterProvider router={router} />
      </AuthContext.Provider>
    );
  }
};

export default App;
