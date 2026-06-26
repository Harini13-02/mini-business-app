import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "../components/ui/Card";

import {
  getCustomers,
  deleteCustomer,
} from "../api/customerApi";

function CustomersPage() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  async function loadCustomers() {
    try {
      setLoading(true);
      setError("");

      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      setError(
        err.message ||
          "Failed to load customers"
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
      await deleteCustomer(id);

      setCustomers((current) =>
        current.filter(
          (customer) =>
            customer.id !== id
        )
      );

      setSelectedCustomer(null);
    } catch (err) {
      setError(
        err.message ||
          "Failed to delete customer"
      );
    }
  }

  useEffect(() => {
    loadCustomers();
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
            Manage Customers
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            View, update and manage customers.
          </p>
        </div>

        <Link
          to="/customers/new"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black transition"
        >
          Add Customer
        </Link>
      </div>

      {/* Table */}
      <Card>
        {loading ? (
          <p className="text-sm text-gray-500">
            Loading customers...
          </p>
        ) : error ? (
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        ) : customers.length === 0 ? (
          <div className="rounded-md border border-dashed p-6 text-center">
            <p className="text-sm font-medium text-gray-900">
              No customers found
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Create your first customer.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b bg-violet-50">
                  <th className="px-4 py-4 text-sm font-extrabold text-black uppercase">
                    Code
                  </th>

                  <th className="px-4 py-4 text-sm font-extrabold text-black uppercase">
                    Customer Name
                  </th>

                  <th className="px-4 py-4 text-sm font-extrabold text-black uppercase">
                    Phone
                  </th>

                  <th className="px-4 py-4 text-sm font-extrabold text-black uppercase">
                    Email
                  </th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr
                    key={customer.id}
                    onClick={() =>
                      setSelectedCustomer(
                        selectedCustomer ===
                          customer.id
                          ? null
                          : customer.id
                      )
                    }
                    className="relative cursor-pointer border-b transition hover:bg-violet-50"
                  >
                    <td className="px-4 py-4 font-semibold text-gray-900">
                      {customer.code}
                    </td>

                    <td className="relative px-4 py-4 text-gray-800">
                      {customer.name}

                      {selectedCustomer ===
                        customer.id && (
                        <div className="absolute left-0 top-12 z-50 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();

                              navigate(
                                `/customers/${customer.id}/edit`
                              );
                            }}
                            className="w-full px-4 py-3 text-left text-sm font-medium text-black hover:bg-gray-100"
                          >
                            ✏️ Update Customer
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();

                              handleDelete(
                                customer.id,
                                customer.name
                              );
                            }}
                            className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                          >
                            🗑 Delete Customer
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-4 text-gray-700">
                      {customer.phone || "-"}
                    </td>

                    <td className="px-4 py-4 text-gray-700">
                      {customer.email || "-"}
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

export default CustomersPage;