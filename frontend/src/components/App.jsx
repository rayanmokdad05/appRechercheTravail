import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../Containers/Roots";
import ErrorPage from "../Containers/ErrorPage";
import NewTask from "../Containers/NewTask";
import Auth from "../Containers/Auth";
import UpdateTask from "../Containers/UpdateTask";
import { useState, useCallback, useEffect } from "react";
import { AuthContext } from "../Context/auth-context";

const routerLoginUser = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <NewTask /> },
      { path: "/tasks/:taskId", element: <UpdateTask /> },
    ],
  },
]);

const routerLoginEnterprise = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <NewTask /> },
      { path: "/tasks/:taskId", element: <UpdateTask /> },
      { path: "/auth", element: <Auth /> },
    ],
  },
]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "" },
      { path: "/tasks/:taskId", element: <UpdateTask /> },
      { path: "/auth", element: <Auth /> },
    ],
  },
]);

const App = () => {
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "travail/"
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout, logout }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
