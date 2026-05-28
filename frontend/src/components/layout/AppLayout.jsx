function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b bg-blue-600 px-6 py-4 shadow-md">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-xl font-bold text-white">
            Mini Business Operations
          </h1>

          <p className="text-sm text-blue-100">
            Products, customers, sales orders, and stock
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-6">
        {children}
      </main>
    </div>
  );
}

export default AppLayout;