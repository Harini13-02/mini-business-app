export default function DashboardPage() {
  const stats = [
    {
      title: "Products",
      value: "3",
      icon: "📦",
      color: "bg-blue-500",
    },
    {
      title: "Customers",
      value: "25",
      icon: "👥",
      color: "bg-emerald-500",
    },
    {
      title: "Sales Orders",
      value: "18",
      icon: "🛒",
      color: "bg-purple-500",
    },
    {
      title: "Stock Available",
      value: "620",
      icon: "📊",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-blue-500 p-8 text-white shadow-xl">
        <h2 className="text-4xl font-bold">
          Business Dashboard
        </h2>

        <p className="mt-2 text-blue-100">
          Manage products, customers and sales efficiently.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl"
          >
            <div
              className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-2xl`}
            >
              {item.icon}
            </div>

            <h3 className="mt-4 text-slate-500">
              {item.title}
            </h3>

            <p className="mt-2 text-4xl font-bold text-slate-800">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Products */}
      <div className="rounded-3xl bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-semibold text-slate-800">
          Recent Products
        </h3>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border p-4">
            <h4 className="font-semibold">Notebook</h4>
            <p className="text-slate-500">₹50</p>
          </div>

          <div className="rounded-2xl border p-4">
            <h4 className="font-semibold">Pen</h4>
            <p className="text-slate-500">₹10</p>
          </div>

          <div className="rounded-2xl border p-4">
            <h4 className="font-semibold">Marker</h4>
            <p className="text-slate-500">₹30</p>
          </div>
        </div>
      </div>
    </div>
  );
}