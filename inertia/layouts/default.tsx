import { Form, Link } from '@adonisjs/inertia/react'
import { Data } from '@generated/data'
import { usePage } from '@inertiajs/react'
import { ReactElement, useEffect } from 'react'
import { toast, Toaster } from 'sonner'

const publicLinks = [
  { href: '/#demo', label: 'Demo' },
  { href: '/#features', label: 'Features' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#testimonials', label: 'Reviews' },
]

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  const page = usePage<Data.SharedProps>()
  const user = page.props.user

  useEffect(() => {
    toast.dismiss()
  }, [page.url])

  useEffect(() => {
    if (page.props.flash.error) {
      toast.error(page.props.flash.error)
    }
  }, [page.props.flash.error, page.url])

  return (
    <>
      <div className="min-h-dvh bg-base-200/40">
        <header className="sticky top-0 z-30 border-b border-base-300 bg-base-100/90 backdrop-blur">
          <div className="navbar mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="navbar-start gap-2">
              <div className="dropdown md:hidden">
                <label tabIndex={0} className="btn btn-ghost btn-circle" aria-label="Open navigation">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5" />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-20 mt-3 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow"
                >
                  {publicLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/" className="btn btn-ghost px-0 text-xl font-semibold normal-case">
                Completio
              </Link>
            </div>

            <div className="navbar-center hidden md:flex">
              <ul className="menu menu-horizontal gap-2 px-1 text-sm">
                {publicLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="navbar-end gap-2">
              {user ? (
                <>
                  <div className="hidden items-center gap-3 rounded-box bg-base-200 px-3 py-2 sm:flex">
                    <div className="avatar avatar-placeholder">
                      <div className="bg-primary text-primary-content w-10 rounded-full">
                        <span className="text-sm font-semibold">{user.initials}</span>
                      </div>
                    </div>

                    <div className="leading-tight">
                      <p className="text-sm font-medium">{user.fullName}</p>
                      <p className="text-xs text-base-content/60">{user.email}</p>
                    </div>
                  </div>

                  <Form route="session.destroy" className="contents">
                    {() => (
                      <button type="submit" className="btn btn-primary btn-sm sm:btn-md">
                        Sign out
                      </button>
                    )}
                  </Form>
                </>
              ) : (
                <>
                  <Link href="/api/auth/login" className="btn btn-ghost btn-sm sm:btn-md">
                    Login
                  </Link>
                  <Link href="/api/auth/signup" className="btn btn-primary btn-sm sm:btn-md">
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="flex min-h-[calc(100dvh-4.5rem)] flex-col">{children}</div>
      </div>
      <Toaster position="top-right" richColors />
    </>
  )
}
