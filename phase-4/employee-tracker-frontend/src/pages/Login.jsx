// src/pages/Login.jsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(result));
        toast.success(result.greeting || `Welcome ${result.name}!`);
        navigate(result.role === "admin" ? "/dashboard" : "/employee-home");
      } else {
        toast.error(result.error || "Login failed");
      }
    } catch (error) {
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 max-w-sm mx-auto flex flex-col gap-4"
    >
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        required
        className="input border border-gray-300 p-2 rounded"
      />
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        required
        className="input border border-gray-300 p-2 rounded"
      />
      <button
        type="submit"
        className="btn bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
      >
        Login
      </button>
    </form>
  );
}
