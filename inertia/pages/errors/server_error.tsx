import { Link } from '@adonisjs/inertia/react'
import { Head } from '@inertiajs/react'

export default function ServerError() {
  return (
    <>
      <Head title="Server Error" />

      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="card w-full max-w-xl border border-base-300 bg-base-100 shadow-xl">
          <div className="card-body items-start gap-5 text-left">
            <div className="badge badge-error badge-outline">500</div>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold">Something went wrong</h1>
              <p className="text-base leading-7 text-base-content/70">
                The app hit an unexpected error. Try returning home or signing in again once the
                issue is resolved.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/" className="btn btn-primary">
                Return home
              </Link>
              <Link href="/api/auth/signup" className="btn btn-outline">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
