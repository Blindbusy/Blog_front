import { createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Loading from '@/components/Loading/Loading'

const Index = lazy(() => import('@/pages/Index/index.jsx'))
const A = lazy(() => import('@/pages/A/index.jsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <Index />
      </Suspense>
    ),
  },
  // {
  //   path: '/loading',
  //   element: <Loading />,
  // },
  {
    path: '/A',
    element: (
      <Suspense fallback={<Loading />}>
        <A />
      </Suspense>
    ),
  },
])

export default router
