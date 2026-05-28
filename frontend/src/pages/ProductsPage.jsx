import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const products = [
  { id: 1, sku: "P001", name: "Notebook", price: 50, stockQty: 100 },
  { id: 2, sku: "P002", name: "Pen", price: 10, stockQty: 500 },
  { id: 3, sku: "P003", name: "Marker", price: 25, stockQty: 40 },
];

function ProductsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="relative flex items-center">
        <div className="w-full text-center">
          <h2
        style={{
          color: "#000000",
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Products
      </h2>

          <p className="mt-1 text-sm text-slate-600">
            Manage inventory, pricing, and stock levels.
          </p>
        </div>

        <div className="absolute right-0">
          <Button>
            + Add Product
          </Button>
        </div>
      </div>

      {/* Product Table Card */}
      <Card>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-900">
            Product Inventory
          </h3>

          <p className="text-sm text-slate-500">
            Current products available in stock
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  SKU
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Product Name
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Price
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Stock Quantity
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {product.sku}
                  </td>

                  <td className="px-4 py-3 text-slate-700">
                    {product.name}
                  </td>

                  <td className="px-4 py-3 text-slate-700">
                    ₹{product.price}
                  </td>

                  <td className="px-4 py-3">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      {product.stockQty}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default ProductsPage;