import { Link } from '@adonisjs/inertia/react'
import { Data } from '@generated/data'
import { Head, usePage } from '@inertiajs/react'

const features = [
  {
    title: 'Prompt-first workflow',
    description:
      'Keep the main action obvious: describe the text you need, refine the prompt, and iterate without leaving the page.',
  },
  {
    title: 'Fast team onboarding',
    description:
      'A focused entry point helps new users understand what Completio does before they ever sign in.',
  },
  {
    title: 'Reusable completion patterns',
    description:
      'Position the product around repeatable writing jobs like rewrites, summaries, outlines, and message drafts.',
  },
  {
    title: 'Provider-ready foundation',
    description:
      'The UI can ship now while the backend stays provider-agnostic and evolves from stub responses to real AI.',
  },
  {
    title: 'Clean review experience',
    description:
      'Separate prompt, result, and next steps so the interface feels structured instead of chatty or cluttered.',
  },
  {
    title: 'Built for product clarity',
    description:
      'Every section explains the value quickly, making the landing page useful as both marketing and onboarding.',
  },
]

const testimonials = [
  {
    name: 'Maya Chen',
    role: 'Content Lead',
    quote:
      'Completio feels like a calm drafting workspace instead of another noisy AI tool. It helps the team start from a better first version.',
  },
  {
    name: 'Jordan Ellis',
    role: 'Growth Marketer',
    quote:
      'The landing experience made the product immediately understandable. I knew what it did and why I would use it in under a minute.',
  },
  {
    name: 'Priya Nair',
    role: 'Customer Ops Manager',
    quote:
      'We need concise responses, rewrites, and polished drafts. This kind of interface makes those jobs feel approachable.',
  },
]

const pricingPlans = [
  {
    name: 'Starter',
    price: '$0',
    description: 'Best for testing the workflow and exploring the product direction.',
    features: ['Basic completions', 'Single-user access', 'Shared prompt presets'],
    cta: 'Create free account',
    highlighted: false,
  },
  {
    name: 'Team',
    price: '$24',
    description: 'A placeholder plan for teams who want a collaborative completion workspace.',
    features: ['Faster completions', 'Shared team workspace', 'Usage visibility'],
    cta: 'Start team trial',
    highlighted: true,
  },
  {
    name: 'Scale',
    price: 'Custom',
    description:
      'For companies that want provider flexibility, controls, and internal rollout support.',
    features: ['Custom limits', 'Provider options', 'Priority support'],
    cta: 'Talk to sales',
    highlighted: false,
  },
]

export default function Home() {
  const page = usePage<Data.SharedProps>()
  const isAuthenticated = Boolean(page.props.user)
  const primaryHref = isAuthenticated ? '/#demo' : '/api/auth/signup'
  const primaryLabel = isAuthenticated ? 'Explore the demo' : 'Get started'

  return (
    <>
      <Head title="Completio" />

      <main className="flex-1">
        <section className="border-b border-base-300 bg-base-100">
          <div className="hero mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
            <div className="hero-content grid w-full grid-cols-1 gap-10 px-0 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div className="space-y-8 text-left">
                <div className="badge badge-primary badge-outline">
                  AI-powered message completion
                </div>

                <div className="space-y-4">
                  <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                    Turn rough prompts into useful writing without the usual AI clutter.
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-base-content/70 sm:text-lg">
                    Completio gives teams a focused place to draft, rewrite, and refine text. The
                    interface is built to explain the product clearly now and scale into a real
                    completion workflow as the backend grows.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href={primaryHref} className="btn btn-primary btn-wide sm:btn-lg">
                    {primaryLabel}
                  </Link>
                  <a href="#features" className="btn btn-outline sm:btn-lg">
                    See feature overview
                  </a>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="stat rounded-box border border-base-300 bg-base-200/60 px-5 py-4">
                    <div className="stat-title">Use cases</div>
                    <div className="stat-value text-3xl">4</div>
                    <div className="stat-desc">Rewrite, summarize, brainstorm, draft</div>
                  </div>
                  <div className="stat rounded-box border border-base-300 bg-base-200/60 px-5 py-4">
                    <div className="stat-title">Product stage</div>
                    <div className="stat-value text-3xl">Early</div>
                    <div className="stat-desc">UI moving ahead of a stub-backed provider</div>
                  </div>
                  <div className="stat rounded-box border border-base-300 bg-base-200/60 px-5 py-4">
                    <div className="stat-title">Design focus</div>
                    <div className="stat-value text-3xl">Clear</div>
                    <div className="stat-desc">Less noise, more guidance, faster onboarding</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="card w-full max-w-xl border border-base-300 bg-base-100 shadow-xl">
                  <div className="card-body gap-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-base-content/70">Draft preview</p>
                        <h2 className="text-2xl font-semibold">A cleaner completion workspace</h2>
                      </div>
                      <div className="badge badge-outline">Preview</div>
                    </div>

                    <div className="space-y-3 rounded-box border border-base-300 bg-base-200/60 p-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Prompt</span>
                        <span className="text-base-content/60">UI-only demo</span>
                      </div>
                      <textarea
                        className="textarea textarea-bordered h-32 w-full resize-none"
                        value="Write a warm follow-up email after a product demo, thank the attendee, recap the main benefit, and suggest two next steps."
                        readOnly
                      />
                    </div>

                    <div className="space-y-3 rounded-box border border-base-300 bg-base-100 p-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Generated draft</span>
                        <span className="badge badge-secondary badge-outline">Coming next</span>
                      </div>

                      <div className="space-y-3">
                        <div className="skeleton h-4 w-full" />
                        <div className="skeleton h-4 w-11/12" />
                        <div className="skeleton h-4 w-4/5" />
                        <div className="skeleton h-4 w-full" />
                        <div className="skeleton h-4 w-3/4" />
                      </div>
                    </div>

                    <div className="alert border border-info/20 bg-info/10 text-sm text-base-content">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5 shrink-0"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 9h1.5m-.75 3.75h.008v.008H12v-.008ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <span>
                        The interface is ready for a real completion flow, but this landing-page
                        preview stays intentionally non-functional until the provider work lands.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="demo" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="space-y-4">
              <div className="badge badge-outline">Demo section</div>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Show the workflow before the backend is fully ready.
              </h2>
              <p className="text-base leading-8 text-base-content/70">
                This section gives visitors a concrete mental model: prompt goes in, structured
                result comes out, and the product helps shape messy ideas into usable text.
              </p>
              <ul className="list rounded-box border border-base-300 bg-base-100 shadow-sm">
                <li className="list-row">
                  <span className="badge badge-primary badge-sm" />
                  <div>
                    <div className="font-medium">Prompt presets</div>
                    <div className="text-sm text-base-content/60">
                      Useful starting points for common writing tasks.
                    </div>
                  </div>
                </li>
                <li className="list-row">
                  <span className="badge badge-secondary badge-sm" />
                  <div>
                    <div className="font-medium">Draft output area</div>
                    <div className="text-sm text-base-content/60">
                      Room for completion text, actions, and revision steps.
                    </div>
                  </div>
                </li>
                <li className="list-row">
                  <span className="badge badge-accent badge-sm" />
                  <div>
                    <div className="font-medium">Trust-building state</div>
                    <div className="text-sm text-base-content/60">
                      A clear preview that does not pretend the feature is live yet.
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="card border border-base-300 bg-base-100 shadow-xl">
              <div className="card-body gap-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold">Example completion panel</h3>
                    <p className="text-sm text-base-content/60">
                      Designed for clarity, not fake interactivity.
                    </p>
                  </div>
                  <div className="join">
                    <button type="button" className="btn btn-sm join-item btn-active">
                      Draft
                    </button>
                    <button type="button" className="btn btn-sm join-item">
                      Rewrite
                    </button>
                    <button type="button" className="btn btn-sm join-item">
                      Summary
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="form-control gap-2">
                    <span className="label-text font-medium">Input brief</span>
                    <textarea
                      className="textarea textarea-bordered h-48 resize-none"
                      value="Summarize the meeting notes into three decisions, two risks, and one action list for leadership. Keep the tone direct and concise."
                      readOnly
                    />
                  </label>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="label-text font-medium">Output preview</span>
                      <span className="text-xs text-base-content/60">Placeholder state</span>
                    </div>
                    <div className="mockup-code min-h-48 bg-neutral text-neutral-content">
                      <pre data-prefix="1">
                        <code>Decision 1: ...</code>
                      </pre>
                      <pre data-prefix="2">
                        <code>Decision 2: ...</code>
                      </pre>
                      <pre data-prefix="3">
                        <code>Risk 1: ...</code>
                      </pre>
                      <pre data-prefix="4">
                        <code>Action: ...</code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-outline">Email drafts</span>
                  <span className="badge badge-outline">Meeting notes</span>
                  <span className="badge badge-outline">Product copy</span>
                  <span className="badge badge-outline">Support replies</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="border-y border-base-300 bg-base-100">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <div className="badge badge-outline">Features</div>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Built to explain value fast and grow into a real product.
              </h2>
              <p className="mt-4 text-base leading-8 text-base-content/70">
                The remodel keeps the page lightweight while making the product legible to new
                visitors, testers, and future customers.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="card border border-base-300 bg-base-100 shadow-sm"
                >
                  <div className="card-body gap-3">
                    <div className="badge badge-primary badge-outline w-fit">Included</div>
                    <h3 className="card-title text-xl">{feature.title}</h3>
                    <p className="text-base-content/70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        >
          <div className="flex flex-col gap-4 text-center">
            <div className="badge badge-outline mx-auto">Testimonials</div>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Placeholder proof points for the future marketing surface.
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-8 text-base-content/70">
              These are intentionally temporary, but the section is ready for real quotes once you
              have customer feedback or internal pilot results.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="card border border-base-300 bg-base-100 shadow-sm"
              >
                <div className="card-body gap-4">
                  <div className="rating rating-sm">
                    <input
                      type="radio"
                      name={testimonial.name}
                      className="mask mask-star-2 bg-primary"
                      defaultChecked
                    />
                    <input
                      type="radio"
                      name={testimonial.name}
                      className="mask mask-star-2 bg-primary"
                      defaultChecked
                    />
                    <input
                      type="radio"
                      name={testimonial.name}
                      className="mask mask-star-2 bg-primary"
                      defaultChecked
                    />
                    <input
                      type="radio"
                      name={testimonial.name}
                      className="mask mask-star-2 bg-primary"
                      defaultChecked
                    />
                    <input
                      type="radio"
                      name={testimonial.name}
                      className="mask mask-star-2 bg-primary"
                      defaultChecked
                    />
                  </div>
                  <p className="text-base leading-7 text-base-content/80">“{testimonial.quote}”</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-base-content/60">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="border-y border-base-300 bg-base-100">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <div className="badge badge-outline">Pricing</div>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Placeholder plans with a real SaaS structure.
              </h2>
              <p className="mt-4 text-base leading-8 text-base-content/70">
                The plan cards are ready for real packaging later, but they already establish how
                the public site can guide different kinds of buyers.
              </p>
            </div>

            <div className="mt-10 grid gap-6 xl:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`card border bg-base-100 shadow-sm ${plan.highlighted ? 'border-primary shadow-lg' : 'border-base-300'}`}
                >
                  <div className="card-body gap-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-semibold">{plan.name}</h3>
                        <p className="mt-2 text-base-content/70">{plan.description}</p>
                      </div>
                      {plan.highlighted ? <div className="badge badge-primary">Popular</div> : null}
                    </div>

                    <div>
                      <span className="text-4xl font-semibold">{plan.price}</span>
                      {plan.price !== 'Custom' ? (
                        <span className="ml-1 text-base-content/60">/ month</span>
                      ) : null}
                    </div>

                    <ul className="space-y-3 text-sm text-base-content/80">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <span className="badge badge-primary badge-xs" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="card-actions mt-auto">
                      <Link
                        href={plan.name === 'Scale' ? '/#pricing' : '/api/auth/signup'}
                        className={`btn w-full ${plan.highlighted ? 'btn-primary' : 'btn-outline'}`}
                      >
                        {plan.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="hero rounded-box border border-base-300 bg-base-100 px-6 py-10 shadow-sm sm:px-10">
            <div className="hero-content flex-col gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  Ship a stronger first impression now, then plug in real AI later.
                </h2>
                <p className="mt-4 text-base leading-8 text-base-content/70">
                  The new public-facing UI gives Completio a product story, a demo shape, and an
                  auth flow that already feels intentional.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/api/auth/signup" className="btn btn-primary btn-wide">
                  Create account
                </Link>
                <a href="#demo" className="btn btn-outline">
                  Review demo section
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-base-300 bg-base-100">
        <div className="footer mx-auto max-w-7xl gap-10 px-4 py-10 text-base-content sm:px-6 lg:px-8">
          <aside className="max-w-sm gap-3">
            <p className="text-lg font-semibold">Completio</p>
            <p className="text-sm leading-7 text-base-content/70">
              A lightweight AI completion product in progress, now with a public-facing surface that
              matches the ambition better than the original placeholder page.
            </p>
          </aside>

          <nav>
            <h3 className="footer-title">Product</h3>
            <a href="/#demo" className="link link-hover">
              Demo
            </a>
            <a href="/#features" className="link link-hover">
              Features
            </a>
            <a href="/#pricing" className="link link-hover">
              Pricing
            </a>
          </nav>

          <nav>
            <h3 className="footer-title">Account</h3>
            <Link href="/api/auth/login" className="link link-hover">
              Login
            </Link>
            <Link href="/api/auth/signup" className="link link-hover">
              Sign up
            </Link>
          </nav>
        </div>
      </footer>
    </>
  )
}
