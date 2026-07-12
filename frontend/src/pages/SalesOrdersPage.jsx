import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../components/ui/Card";
import { getSalesOrders } from "../api/salesOrderApi";

function formatCurrency(value) {
  return `₹${Number(value || 0).toFixed(2)}`;
}

function formatDate(value) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleDateString();
}

function SalesOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadSalesOrders() {
    try {
      setLoading(true);
      setError("");

      const data = await getSalesOrders();
      setOrders(data);
    } catch (err) {
      setError(
        err.message || "Failed to load sales orders"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSalesOrders();
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
            Sales Orders
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            View customer orders and track their status.
          </p>

        </div>

        <Link
          to="/sales-orders/new"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-black"
        >
          Create Sales Order
        </Link>
      </div>

      {/* Sales Orders Table */}

      <Card>

        {loading ? (
          <p className="text-sm text-gray-500">
            Loading sales orders...
          </p>
        ) : error ? (
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-md border border-dashed p-6 text-center">

            <p className="text-sm font-medium text-gray-900">
              No sales orders found
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Create your first sales order.
            </p>

          </div>
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full border-collapse text-left">

              <thead>

                <tr className="border-b bg-violet-50">

                  <th className="px-4 py-4 text-sm font-extrabold text-black uppercase">
                    Order No
                  </th>

                  <th className="px-4 py-4 text-sm font-extrabold text-black uppercase">
                    Customer
                  </th>

                  <th className="px-4 py-4 text-sm font-extrabold text-black uppercase">
                    Status
                  </th>

                  <th className="px-4 py-4 text-sm font-extrabold text-black uppercase">
                    Items
                  </th>

                  <th className="px-4 py-4 text-sm font-extrabold text-black uppercase">
                    Total
                  </th>

                  <th className="px-4 py-4 text-sm font-extrabold text-black uppercase">
                    Created
                  </th>

                  <th className="px-4 py-4 text-sm font-extrabold text-black uppercase">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr
                    key={order.id}
                    className="border-b transition hover:bg-violet-50"
                  >

                    <td className="px-4 py-4 font-semibold text-gray-900">
                      {order.orderNo}
                    </td>

                    <td className="px-4 py-4 text-gray-800">
                      {order.customer?.name || "-"}
                    </td>

                    <td className="px-4 py-4">

                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        {order.status}
                      </span>

                    </td>

                    <td className="px-4 py-4 text-gray-700">
                      {order.itemCount}
                    </td>

                    <td className="px-4 py-4 text-gray-700">
                      {formatCurrency(order.totalAmount)}
                    </td>

                    <td className="px-4 py-4 text-gray-700">
                      {formatDate(order.createdAt)}
                    </td>

                    <td className="px-4 py-4">

                      <Link
                        to={`/sales-orders/${order.id}`}
                        className="font-semibold text-violet-700 hover:text-violet-900 hover:underline"
                      >
                        View
                      </Link>

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

export default SalesOrdersPage;