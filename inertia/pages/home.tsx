export default function Home() {
  return (
    <>
      <header className="navbar bg-base-100 shadow-sm px-80">
        <div className="navbar-start">
          <a className="text-3xl" href="/">
            <b>Completio</b>
          </a>
        </div>
        <div className="flex flex-row gap-4 navbar-end">
          <a href="/login">Login</a>
          <a href="/signup" className="btn btn-accent">
            Get Started
          </a>
        </div>
      </header>
      <main>
        <div className="h-150 hero bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hello there</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
              </p>
              <a className="btn btn-primary" href="/signup">
                Get Started &gt;
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
