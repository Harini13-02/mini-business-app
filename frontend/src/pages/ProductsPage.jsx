import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import {
  getProducts,
  deleteProduct,
} from "../api/productApi";

function formatPrice(price) {
  return `₹${Number(price).toFixed(2)}`;
}

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] =
    useState(null);

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(
        err.message || "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id, name) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(id);

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.id !== id
        )
      );

      setSelectedProduct(null);
    } catch (err) {
      alert(
        err.message || "Failed to delete product"
      );
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            style={{
              color: "#000000",
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            Manage Products
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            View, update and manage products.
          </p>
        </div>

        <Link
          to="/products/new"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black transition"
        >
          Add Product
        </Link>
      </div>

      {/* Products Table */}
      <Card>
        {loading ? (
          <p className="text-sm text-gray-500">
            Loading products...
          </p>
        ) : error ? (
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-md border border-dashed p-6 text-center">
            <p className="text-sm font-medium text-gray-900">
              No products found
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Create your first product.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b bg-violet-50">
                  <th className="px-4 py-4 text-sm font-extrabold text-black uppercase">
                    SKU
                  </th>

                  <th className="px-4 py-4 text-sm font-extrabold text-black uppercase">
                    Product Name
                  </th>

                  <th className="px-4 py-4 text-sm font-extrabold text-black uppercase">
                    Price
                  </th>

                  <th className="px-4 py-4 text-sm font-extrabold text-black uppercase">
                    Stock
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    onClick={() =>
                      setSelectedProduct(
                        selectedProduct === product.id
                          ? null
                          : product.id
                      )
                    }
                    className="relative cursor-pointer border-b transition hover:bg-violet-50"
                  >
                    <td className="px-4 py-4 font-semibold text-gray-900">
                      {product.sku}
                    </td>

                    <td className="relative px-4 py-4 text-gray-800">
                      {product.name}

                      {selectedProduct ===
                        product.id && (
                        <div className="absolute left-0 top-12 z-50 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                          <button
  onClick={(e) => {
    e.stopPropagation();

    navigate(
      `/products/edit/${product.id}`
    );
  }}
  className="w-full px-4 py-3 text-left text-sm font-medium text-black hover:bg-gray-100"
>
  ✏️ Update Product
</button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();

                              handleDelete(
                                product.id,
                                product.name
                              );
                            }}
                            className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                          >
                            🗑 Delete Product
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-4 text-gray-700">
                      {formatPrice(product.price)}
                    </td>

                    <td className="px-4 py-4 text-gray-700">
                      {product.stockQty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

export default ProductsPage;