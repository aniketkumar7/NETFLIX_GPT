import Browse from "./Browse";
import Login from "./Login";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";


const Body = () => {
  
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  // useEffect is used to check if user is signed in or not

  
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
