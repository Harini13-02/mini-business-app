import {
  useState,
  useEffect,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  createCustomer,
  updateCustomer,
  getCustomerById,
} from "../api/customerApi";

import Card from "../components/ui/Card";

const initialForm = {
  code: "",
  name: "",
  phone: "",
  email: "",
};

function validateCustomerForm(form) {
  const errors = {};

  if (!form.code.trim()) {
    errors.code =
      "Customer code is required";
  }

  if (!form.name.trim()) {
    errors.name =
      "Customer name is required";
  }

  if (
    form.phone &&
    !/^[0-9]{10}$/.test(form.phone)
  ) {
    errors.phone =
      "Phone must contain 10 digits";
  }

  if (
    form.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      form.email
    )
  ) {
    errors.email =
      "Enter a valid email";
  }

  return errors;
}

function CustomerFormPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [form, setForm] =
    useState(initialForm);

  const [fieldErrors, setFieldErrors] =
    useState({});

  const [submitError, setSubmitError] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [loading, setLoading] =
    useState(isEditMode);

  useEffect(() => {
    if (!isEditMode) return;

    async function loadCustomer() {
      try {
        const customer =
          await getCustomerById(id);

        setForm({
          code: customer.code || "",
          name: customer.name || "",
          phone:
            customer.phone || "",
          email:
            customer.email || "",
        });
      } catch (err) {
        setSubmitError(
          err.message ||
            "Failed to load customer"
        );
      } finally {
        setLoading(false);
      }
    }

    loadCustomer();
  }, [id, isEditMode]);

  function handleChange(event) {
    const { name, value } =
      event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    const errors =
      validateCustomerForm(form);

    setFieldErrors(errors);

    if (
      Object.keys(errors).length > 0
    ) {
      return;
    }

    try {
      setSaving(true);
      setSubmitError("");

      const payload = {
        code: form.code.trim(),
        name: form.name.trim(),
        phone:
          form.phone.trim() || null,
        email:
          form.email.trim() || null,
      };

      if (isEditMode) {
        await updateCustomer(
          id,
          payload
        );
      } else {
        await createCustomer(
          payload
        );
      }

      navigate("/customers");
    } catch (err) {
      setSubmitError(
        err.message ||
          "Failed to save customer"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <p>Loading customer...</p>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1  style={{
              color: "#000000",
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            {isEditMode
              ? "Edit Customer"
              : "Add Customer"}
          </h1>
           

          <p className="text-sm text-gray-500">
            Customer master data
          </p>
        </div>

        <Link
          to="/customers"
           className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
         Back to Customers
        </Link>
      </div>

      <Card>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {submitError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Customer Code
            </label>

           <input
  name="code"
  value={form.code}
  onChange={handleChange}
  disabled={isEditMode}
  placeholder="Example: C001"
  className={`w-full rounded-md border px-3 py-2 ${
    isEditMode
      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
      : ""
  }`}
/>

            {fieldErrors.code && (
              <p className="text-sm text-red-600">
                {
                  fieldErrors.code
                }
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Customer Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={
                handleChange
              }
              placeholder="Example: ABC Stores"
              className="w-full rounded-md border px-3 py-2"
            />

            {fieldErrors.name && (
              <p className="text-sm text-red-600">
                {
                  fieldErrors.name
                }
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Phone</label>

            <input
              name="phone"
              value={form.phone}
              onChange={
                handleChange
              }
              placeholder="Example: 9876543210"
              className="w-full rounded-md border px-3 py-2"
            />

            {fieldErrors.phone && (
              <p className="text-sm text-red-600">
                {
                  fieldErrors.phone
                }
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Email</label>

            <input
              name="email"
              value={form.email}
              onChange={
                handleChange
              }
              placeholder="Example: abc@gmail.com"
              className="w-full rounded-md border px-3 py-2"
            />

            {fieldErrors.email && (
              <p className="text-sm text-red-600">
                {
                  fieldErrors.email
                }
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t pt-4">

            <Link
              to="/customers"
              className="rounded-md border px-4 py-2"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-gray-900 px-4 py-2 text-white"
            >
              {saving
                ? "Saving..."
                : isEditMode
                ? "Update Customer"
                : "Save Customer"}
            </button>

          </div>
        </form>
      </Card>
    </div>
  );
}

export default CustomerFormPage;