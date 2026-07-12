import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import DashboardPage from "../pages/DashboardPage";
import ProductsPage from "../pages/ProductsPage";
import ProductFormPage from "../pages/ProductFormPage";
import CustomersPage from "../pages/CustomersPage";
import CustomerFormPage from "../pages/CustomerFormPage";
import SalesOrdersPage from "../pages/SalesOrdersPage";
import SalesOrderCreatePage from "../pages/SalesOrderCreatePage";
import SalesOrderDetailPage from "../pages/SalesOrderDetailPage";
import LoginPage from "../pages/LoginPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products/new"
        element={
          <ProtectedRoute>
            <ProductFormPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products/edit/:id"
        element={
          <ProtectedRoute>
            <ProductFormPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <CustomersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customers/new"
        element={
          <ProtectedRoute>
            <CustomerFormPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customers/edit/:id"
        element={
          <ProtectedRoute>
            <CustomerFormPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sales-orders"
        element={
          <ProtectedRoute>
            <SalesOrdersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sales-orders/new"
        element={
          <ProtectedRoute>
            <SalesOrderCreatePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sales-orders/:id"
        element={
          <ProtectedRoute>
            <SalesOrderDetailPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;