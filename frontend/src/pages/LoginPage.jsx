import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await loginUser(form);

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      {error && (
        <div className="text-red-600 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            className="w-full border rounded p-2"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            className="w-full border rounded p-2"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-violet-700 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;