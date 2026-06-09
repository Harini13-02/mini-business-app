import { NavLink } from "react-router-dom";

function AppLayout({ children }) {
 const linkClass = ({ isActive }) =>
  `px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
    isActive
      ? "bg-white text-violet-900 shadow-lg"
      : "text-white hover:bg-white/15 hover:text-white"
  }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f4ff] via-[#faf7ff] to-[#efe5ff]">
      
      {/* Header */}
      <header className="sticky top-0 z-50">
        <div
          className="
            bg-gradient-to-r
            from-violet-900
            via-violet-800
            to-purple-800
            shadow-2xl
            rounded-b-[40px]
            border-b border-violet-700
          "
        >
          <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
            
            {/* Logo */}
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Mini Business Operations
              </h1>

              <p className="mt-1 text-violet-200 text-sm">
                Product & Customer Management System
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex gap-3">
              <NavLink to="/" className={linkClass}>
                Dashboard
              </NavLink>

              <NavLink to="/products" className={linkClass}>
                Products
              </NavLink>
              <NavLink to="/customers" className={linkClass}>
               Customers
              </NavLink>
              <NavLink to="/sales-orders" className={linkClass}>
                Sales Orders
              </NavLink>

            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-10">
        {children}
      </main>
    </div>
  );
}

export default AppLayout;