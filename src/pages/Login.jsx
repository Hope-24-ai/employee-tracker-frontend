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
      placeholder: "Email",
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
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Invalid email or password.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded shadow"
      >
        {fields.map((field) => (
          <input
            key={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={field.value}
            onChange={field.onChange}
            className="mb-4 w-full border p-2 rounded"
          />
        ))}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
