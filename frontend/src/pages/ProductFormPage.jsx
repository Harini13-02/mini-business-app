import { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  createProduct,
  updateProduct,
  getProductById,
} from "../api/productApi";

import Card from "../components/ui/Card";

const initialForm = {
  sku: "",
  name: "",
  price: "",
  stockQty: "",
};

function validateProductForm(form) {
  const errors = {};

  if (!form.sku.trim()) {
    errors.sku = "SKU is required";
  }

  if (!form.name.trim()) {
    errors.name = "Name is required";
  }

  if (Number(form.price) <= 0) {
    errors.price = "Price must be greater than zero";
  }

  if (Number(form.stockQty) < 0) {
    errors.stockQty = "Opening stock cannot be negative";
  }

  return errors;
}

function ProductFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEditMode);

  useEffect(() => {
    if (!isEditMode) return;

    async function loadProduct() {
      try {
        const product = await getProductById(id);

        setForm({
          sku: product.sku || "",
          name: product.name || "",
          price: product.price?.toString() || "",
          stockQty: product.stockQty?.toString() || "",
        });
      } catch (error) {
        setSubmitError(
          error.message || "Failed to load product"
        );
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id, isEditMode]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitError("");

    const errors = validateProductForm(form);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const payload = {
      sku: form.sku.trim(),
      name: form.name.trim(),
      price: Number(form.price),
      stockQty: Number(form.stockQty),
    };

    try {
      setSaving(true);

      if (isEditMode) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }

      navigate("/products");
    } catch (error) {
      setSubmitError(
        error.message || "Failed to save product"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center text-gray-600 py-10">
        Loading product...
      </div>
    );
  }

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
            {isEditMode
              ? "Update Product"
              : "Add Product"}
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            {isEditMode
              ? "Update product information."
              : "Create a new product."}
          </p>
        </div>

        <Link
          to="/products"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          Back
        </Link>
      </div>

      <Card>
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {submitError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          {/* SKU */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              SKU
            </label>

            <input
              name="sku"
              value={form.sku}
              onChange={handleChange}
              disabled={isEditMode}
              placeholder="Example: P001"
              className={`w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 ${
                isEditMode
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : ""
              }`}
            />

            {fieldErrors.sku && (
              <p className="mt-1 text-sm text-red-600">
                {fieldErrors.sku}
              </p>
            )}
          </div>

          {/* Product Name */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Product Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Product Name"
              className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
            />

            {fieldErrors.name && (
              <p className="mt-1 text-sm text-red-600">
                {fieldErrors.name}
              </p>
            )}
          </div>

          {/* Price & Stock */}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              />

              {fieldErrors.price && (
                <p className="mt-1 text-sm text-red-600">
                  {fieldErrors.price}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Opening Stock
              </label>

              <input
                type="number"
                name="stockQty"
                value={form.stockQty}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              />

              {fieldErrors.stockQty && (
                <p className="mt-1 text-sm text-red-600">
                  {fieldErrors.stockQty}
                </p>
              )}
            </div>

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 border-t pt-5">

            <Link
              to="/products"
              className="rounded-md border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-violet-700 px-5 py-2 text-sm font-medium text-white hover:bg-violet-800 transition"
            >
              {saving
                ? "Saving..."
                : isEditMode
                ? "Update Product"
                : "Save Product"}
            </button>

          </div>

        </form>
      </Card>
    </div>
  );
}

export default ProductFormPage;