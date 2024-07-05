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

  
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
