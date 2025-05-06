import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary"; // You'll need to create this component

// Lazy load components for better performance
const Login = lazy(() => import("./Login"));
const Browse = lazy(() => import("./Browse"));
const MovieInfo = lazy(() => import("./MovieInfo"));
const MovieDemo = lazy(() => import("./MovieDemo"));
const NotFound = lazy(() => import("./NotFound"));

// Loading component
const LoadingFallback = () => (
  <div className="h-screen w-full flex items-center justify-center bg-black">
    <div className="animate-pulse text-red-600 text-2xl font-bold">
      Loading...
    </div>
  </div>
);

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/browse",
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <Browse />
        </Suspense>
      ),
    },
    {
      path: "/movieinfo/:id",
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <ErrorBoundary fallback={<Navigate to="/browse" />}>
            <MovieInfo />
          </ErrorBoundary>
        </Suspense>
      ),
    },
    {
      path: "/moviedemo",
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <MovieDemo />
        </Suspense>
      ),
    },
    // Redirect legacy paths if you have any
    {
      path: "/movie/:id",
      element: <Navigate to="/movieinfo/:id" replace />,
    },
    // 404 page for any unmatched routes
    {
      path: "*",
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <NotFound />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Body;
