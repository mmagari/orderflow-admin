import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-3 text-slate-500">Page not found.</p>
      <Link
        to="/"
        className="mt-6 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
      >
        Go back home
      </Link>
    </div>
  )
}