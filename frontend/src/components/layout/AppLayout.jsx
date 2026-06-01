import { NavLink } from "react-router-dom";

function AppLayout({ children }) {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-white text-blue-900 shadow-md"
        : "text-white hover:bg-blue-800"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-blue-100">
      
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          
          {/* Logo Section */}
          <div>
            <h1 className="text-3xl font-bold text-white">
              Mini Business Operations
            </h1>

            <p className="text-blue-100 text-sm mt-1">
              Products • Customers • Sales Orders
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
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}

export default AppLayout;