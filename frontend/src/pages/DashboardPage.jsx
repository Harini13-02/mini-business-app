export default function DashboardPage() {
  const stats = [
    {
      title: "Products",
      value: "03",
    },
    {
      title: "Customers",
      value: "25",
    },
    {
      title: "Sales Orders",
      value: "18",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Dashboard Heading */}
      <div>
        <h2 
          style={{
            color: "#000000",
            fontSize: "32px",
            fontWeight: "bold",
            }}
          >
            Dashboard
        </h2>

        <p className="mt-3 text-lg text-slate-600">
          Elegant overview of your business performance.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-8 md:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.title}
            className="
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-violet-200
              bg-gradient-to-br
              from-white
              via-[#faf7ff]
              to-[#f2e8ff]
              p-8
              min-h-[280px]
              flex
              flex-col
              justify-between
              shadow-xl
              hover:shadow-2xl
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >
            {/* Soft Glow */}
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-violet-300/20 blur-3xl"></div>

            <div>
              <h3 className="text-xl font-bold text-slate-800 tracking-wide">
                {item.title}
              </h3>
            </div>

            <div>
              <p className="text-7xl font-bold text-slate-900">
                {item.value}
              </p>

              <p className="mt-3 text-sm text-slate-500">
                Active records
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}