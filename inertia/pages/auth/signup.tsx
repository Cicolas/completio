import { Form } from '@adonisjs/inertia/react'

export default function Signup() {
  return (
    <div className="flex justify-center items-center grow">
      <fieldset className="fieldset gap-y-8 bg-base-200 border-base-300 rounded-box w-md border px-4 py-4">
        <div>
          <h1 className="fieldset-legend text-2xl">Sign up</h1>
          <span className="label">Sign up to access all completio features</span>
        </div>
        <Form route="new_account.store" className="flex flex-col gap-4">
          {({ errors }) => (
            <>
              <div className="flex flex-col gap-2">
                <label className="label" htmlFor="fullName">
                  Full name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="input w-full"
                  data-invalid={errors.fullName ? 'true' : undefined}
                />
                {errors.fullName && (
                  <span className="text-error">
                    <b>{errors.fullName}</b>
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="input w-full"
                  autoComplete="email"
                  data-invalid={errors.email ? 'true' : undefined}
                />
                {errors.email && (
                  <span className="text-error">
                    <b>{errors.email}</b>
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="input w-full"
                  autoComplete="new-password"
                  data-invalid={errors.password ? 'true' : undefined}
                />
                {errors.password && (
                  <div className="text-error">
                    <b>{errors.password}</b>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="label" htmlFor="passwordConfirmation">
                  Confirm password
                </label>
                <input
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  className="input w-full"
                  autoComplete="new-password"
                  data-invalid={errors.passwordConfirmation ? 'true' : undefined}
                />
                {errors.passwordConfirmation && (
                  <div className="text-error">
                    <b>{errors.passwordConfirmation}</b>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 pt-4">
                <button type="submit" className="btn btn-accent">
                  Sign up
                </button>
                <a className="btn" href="/">
                  Cancel
                </a>
              </div>
            </>
          )}
        </Form>
      </fieldset>
    </div>
  )
}
