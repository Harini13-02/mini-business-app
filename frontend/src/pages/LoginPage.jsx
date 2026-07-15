import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { login } from "../api/authApi";

function LoginPage() {
  const navigate = useNavigate();

  // Prevent logged-in users from seeing the login page
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" replace />;
  }

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    try {
      setSaving(true);

      const result = await login(form);

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto mt-20 max-w-md rounded-lg bg-white p-8 shadow-lg">
       <h1
            style={{
              color: "#000000",
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
        Login
      </h1>

      <p className="mt-2 text-center text-gray-500">
        Sign in to access the Mini Business Operations App
      </p>

      {error && (
        <div className="mt-4 rounded-md bg-red-100 border border-red-300 p-3 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 p-2 focus:border-violet-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 p-2 focus:border-violet-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-md bg-violet-700 py-2 font-semibold text-white hover:bg-violet-800 disabled:opacity-50"
        >
          {saving ? "Signing In..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;