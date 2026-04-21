import { Link } from '@adonisjs/inertia/react'
import { Head } from '@inertiajs/react'

export default function NotFound() {
  return (
    <>
      <Head title="Page Not Found" />

      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="card w-full max-w-xl border border-base-300 bg-base-100 shadow-xl">
          <div className="card-body items-start gap-5 text-left">
            <div className="badge badge-outline">404</div>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold">Page not found</h1>
              <p className="text-base leading-7 text-base-content/70">
                The page you requested is not available. Head back to the main Completio experience
                and continue from there.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/" className="btn btn-primary">
                Go home
              </Link>
              <Link href="/api/auth/login" className="btn btn-outline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
