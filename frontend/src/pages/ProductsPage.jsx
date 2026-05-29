const products = [
  {
    sku: "P001",
    name: "Notebook",
    price: 50,
    stock: 100,
  },
  {
    sku: "P002",
    name: "Pen",
    price: 10,
    stock: 500,
  },
  {
    sku: "P003",
    name: "Marker",
    price: 30,
    stock: 20,
  },
];

export default function ProductsPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Products
      </h2>

      <div className="overflow-hidden rounded-2xl shadow-lg bg-white">
        <table className="w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-6 py-4 text-left">SKU</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.sku}
                className="border-b hover:bg-blue-50"
              >
                <td className="px-6 py-4">{product.sku}</td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">₹{product.price}</td>
                <td className="px-6 py-4">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}