import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Landing } from './pages/landing';
import { AddRecipe, Home, MyRecipes, More } from './pages/dashboard/index';
import { DashboardLayout } from './layouts/index';
import { UILoader } from './components/loaders/index';
import { ErrorPage } from './pages/error/index';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />,
      errorElement: <ErrorPage />
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/dashboard',
          element: <Home />
        },
        {
          path: '/dashboard/addrecipe',
          element: <AddRecipe />
        },
        {
          path: '/dashboard/myrecipes',
          element: <MyRecipes />
        },
        {
          path: '/dashboard/recipe/:id',
          element: <More />
        }
      ]
    }
  ]);

  return (
    <div className='w-[100vw] h-[100vh]'>
    <Suspense fallback={<UILoader />}>
    <RouterProvider router={router} />
    </Suspense>
    </div>
  )
}

export default App;
