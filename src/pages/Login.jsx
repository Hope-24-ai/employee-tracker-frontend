import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";

function Login({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const fields = [
    {
      name: "email",
      type: "email",
      placeholder: "Email address",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/auth/login", { email, password });
      const { access_token, user } = res.data;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("user", JSON.stringify(user));
      if (setUser) setUser(user);

      const roleType = user.user_type?.name || user.user_type_name;

      if (roleType === "Manager") {
        navigate("/manager");
      } else if (roleType === "Employee") {
        navigate("/employee");
      } else if (roleType === "HR") {
        navigate("/humanResource");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/cubes.png")',
        }}
      ></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-gray-800 rounded-lg shadow-2xl p-8 sm:p-10 w-full max-w-md border border-gray-700"
      >
        <h1 className="text-3xl font-extrabold text-white text-center mb-3">
          Welcome
        </h1>
        <p className="text-center mb-8 text-gray-400">
          Sign in to your account
        </p>

        {fields.map((field) => (
          <div key={field.name} className="mb-5">
            <label htmlFor={field.name} className="sr-only">
              {field.placeholder}
            </label>
            <input
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
            />
          </div>
        ))}

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md transition duration-150 ease-in-out text-lg"
        >
          Login
        </button>

        <div className="text-center mt-6 text-sm text-gray-500">
          <a
            href="#"
            className="text-indigo-400 hover:text-indigo-300 hover:underline font-medium"
          >
            Forgot your password?
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
