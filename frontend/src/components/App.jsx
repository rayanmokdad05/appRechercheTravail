import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "../Containers/Users";
import UserTasks from "../Containers/UserTasks";
import RootLayout from "../Containers/Roots";
import ErrorPage from "../Containers/ErrorPage";
import NewTask from "../Containers/NewTask";
import Auth from "../Containers/Auth";
import Subscribe from "../Containers/Subscribe";
import UpdateTask from "../Containers/UpdateTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Users /> },
      { path: "users", element: <Users /> },
      { path: ":userId/tasks", element: <UserTasks /> },
      { path: "/tasks/new", element: <NewTask /> },
      { path: "/tasks/:taskId", element: <UpdateTask /> },
      { path: "/auth", element: <Auth /> },
      { path: "/subscribe", element: <Subscribe /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
