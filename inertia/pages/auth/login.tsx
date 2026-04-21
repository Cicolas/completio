import { Form, Link } from '@adonisjs/inertia/react'
import { Head } from '@inertiajs/react'

export default function Login() {
  return (
    <>
      <Head title="Login" />

      <main className="flex flex-1 items-center">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
          <section className="flex flex-col justify-center gap-6">
            <div className="badge badge-outline w-fit">Welcome back</div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Log in to keep refining drafts with less friction.
              </h1>
              <p className="max-w-xl text-base leading-8 text-base-content/70">
                Completio is designed to make text completion feel structured and useful. Sign in to
                continue where your workflow left off.
              </p>
            </div>

            <div className="stats stats-vertical border border-base-300 bg-base-100 shadow-sm sm:stats-horizontal">
              <div className="stat">
                <div className="stat-title">Workflow</div>
                <div className="stat-value text-2xl">Prompt</div>
                <div className="stat-desc">Start from a clear instruction</div>
              </div>
              <div className="stat">
                <div className="stat-title">Output</div>
                <div className="stat-value text-2xl">Draft</div>
                <div className="stat-desc">Refine text without jumping tools</div>
              </div>
            </div>

            <Link href="/api/auth/signup" className="link link-hover w-fit text-sm font-medium">
              Need an account? Create one now.
            </Link>
          </section>

          <section className="flex items-center justify-center">
            <div className="card w-full max-w-lg border border-base-300 bg-base-100 shadow-xl">
              <div className="card-body gap-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Login</h2>
                  <p className="text-sm leading-6 text-base-content/70">
                    Enter your account details to access the current Completio experience.
                  </p>
                </div>

                <Form route="session.store" className="flex flex-col gap-4">
                  {({ errors, processing }) => (
                    <>
                      <label className="form-control gap-2">
                        <span className="label-text font-medium">Email</span>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          autoComplete="username"
                          className={`input w-full ${errors.email ? 'input-error' : ''}`}
                          data-invalid={errors.email ? 'true' : undefined}
                        />
                        {errors.email ? <span className="text-sm text-error">{errors.email}</span> : null}
                      </label>

                      <label className="form-control gap-2">
                        <span className="label-text font-medium">Password</span>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          autoComplete="current-password"
                          className={`input w-full ${errors.password ? 'input-error' : ''}`}
                          data-invalid={errors.password ? 'true' : undefined}
                        />
                        {errors.password ? (
                          <span className="text-sm text-error">{errors.password}</span>
                        ) : null}
                      </label>

                      <div className="mt-2 flex flex-col gap-3">
                        <button type="submit" className="btn btn-primary" disabled={processing}>
                          {processing ? 'Logging in...' : 'Login'}
                        </button>
                        <Link href="/" className="btn btn-ghost">
                          Back to home
                        </Link>
                      </div>
                    </>
                  )}
                </Form>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
