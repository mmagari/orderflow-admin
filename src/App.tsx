function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[240px_1fr]">
        <aside className="border-r border-slate-200 bg-white p-6">
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Admin Panel
            </p>
            <h1 className="mt-2 text-2xl font-bold">OrderFlow</h1>
          </div>

          <nav className="flex flex-col gap-2">
            <button className="rounded-xl bg-slate-900 px-4 py-3 text-left text-sm font-medium text-white">
              Dashboard
            </button>
            <button className="rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
              Orders
            </button>
            <button className="rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
              Customers
            </button>
          </nav>
        </aside>

        <main className="p-4 sm:p-6 lg:p-8">
          <header className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="mt-1 text-sm text-slate-500">
              Overview of orders and store activity.
            </p>
          </header>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Total Orders</p>
              <p className="mt-3 text-3xl font-semibold">124</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Pending</p>
              <p className="mt-3 text-3xl font-semibold">18</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Shipped</p>
              <p className="mt-3 text-3xl font-semibold">42</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Revenue</p>
              <p className="mt-3 text-3xl font-semibold">$12,480</p>
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold">Recent Orders</h3>
            <p className="mt-2 text-sm text-slate-500">
              Orders table will go here in the next step.
            </p>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App