import { Form, Link } from '@adonisjs/inertia/react'
import { Head } from '@inertiajs/react'

export default function Signup() {
  return (
    <>
      <Head title="Sign Up" />

      <main className="flex flex-1 items-center">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
          <section className="flex flex-col justify-center gap-6">
            <div className="badge badge-primary badge-outline w-fit">Get started</div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Create an account for a more intentional AI writing workflow.
              </h1>
              <p className="max-w-xl text-base leading-8 text-base-content/70">
                Start with a product surface that explains itself clearly today and can evolve into
                a more capable completion experience as the AI backend matures.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card border border-base-300 bg-base-100 shadow-sm">
                <div className="card-body gap-2">
                  <h2 className="card-title text-lg">Clear first-run experience</h2>
                  <p className="text-sm leading-6 text-base-content/70">
                    The landing page, auth flow, and product framing now tell a coherent story.
                  </p>
                </div>
              </div>
              <div className="card border border-base-300 bg-base-100 shadow-sm">
                <div className="card-body gap-2">
                  <h2 className="card-title text-lg">Room to grow</h2>
                  <p className="text-sm leading-6 text-base-content/70">
                    The UI already has a place for demos, features, and future completion actions.
                  </p>
                </div>
              </div>
            </div>

            <Link href="/api/auth/login" className="link link-hover w-fit text-sm font-medium">
              Already have an account? Log in instead.
            </Link>
          </section>

          <section className="flex items-center justify-center">
            <div className="card w-full max-w-lg border border-base-300 bg-base-100 shadow-xl">
              <div className="card-body gap-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Create your account</h2>
                  <p className="text-sm leading-6 text-base-content/70">
                    Sign up to access all current Completio features and future completion flows.
                  </p>
                </div>

                <Form route="new_account.store" className="flex flex-col gap-4">
                  {({ errors, processing }) => (
                    <>
                      <label className="form-control gap-2">
                        <span className="label-text font-medium">Full name</span>
                        <input
                          type="text"
                          name="fullName"
                          id="fullName"
                          className={`input w-full ${errors.fullName ? 'input-error' : ''}`}
                          data-invalid={errors.fullName ? 'true' : undefined}
                        />
                        {errors.fullName ? (
                          <span className="text-sm text-error">{errors.fullName}</span>
                        ) : null}
                      </label>

                      <label className="form-control gap-2">
                        <span className="label-text font-medium">Email</span>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className={`input w-full ${errors.email ? 'input-error' : ''}`}
                          autoComplete="email"
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
                          className={`input w-full ${errors.password ? 'input-error' : ''}`}
                          autoComplete="new-password"
                          data-invalid={errors.password ? 'true' : undefined}
                        />
                        {errors.password ? (
                          <span className="text-sm text-error">{errors.password}</span>
                        ) : null}
                      </label>

                      <label className="form-control gap-2">
                        <span className="label-text font-medium">Confirm password</span>
                        <input
                          type="password"
                          name="passwordConfirmation"
                          id="passwordConfirmation"
                          className={`input w-full ${errors.passwordConfirmation ? 'input-error' : ''}`}
                          autoComplete="new-password"
                          data-invalid={errors.passwordConfirmation ? 'true' : undefined}
                        />
                        {errors.passwordConfirmation ? (
                          <span className="text-sm text-error">{errors.passwordConfirmation}</span>
                        ) : null}
                      </label>

                      <div className="mt-2 flex flex-col gap-3">
                        <button type="submit" className="btn btn-primary" disabled={processing}>
                          {processing ? 'Creating account...' : 'Sign up'}
                        </button>
                        <Link href="/" className="btn btn-ghost">
                          Cancel
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
