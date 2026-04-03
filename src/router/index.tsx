import { createBrowserRouter } from 'react-router-dom'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { DashboardPage } from '../pages/DashboardPage'
import { OrderDetailsPage } from '../pages/OrderDetailsPage'
import { OrdersPage } from '../pages/OrdersPage'
import { NotFoundPage } from '../pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
      {
        path: 'orders/:id',
        element: <OrderDetailsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])