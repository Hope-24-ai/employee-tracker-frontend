import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
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
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/assets/photo-1508615039623-a25605d2b022.avif')",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-md w-full text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-1">WELCOME</h2>
        <p className="text-center mb-6">Sign in by entering the information below</p>

        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 mb-4 bg-white bg-opacity-20 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          required
          className="w-full px-4 py-2 mb-4 bg-white bg-opacity-20 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
        type="submit"
        className="w-full bg-blue-300 hover:bg-blue-400 focus:ring-2 focus:ring-blue-500 text-gray-900 font-bold py-2 rounded-full mb-4 transition">
          SIGN IN
        </button>


        <div className="flex justify-between text-sm mb-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span>Remember Me</span>
          </label>
          <button type="button" className="hover:underline">
            Forgot Password?
          </button>
        </div>

        <div className="text-center mb-2">— Visit us on: —</div>
       
        <div className="flex justify-center gap-4">
          <button className="bg-white text-gray-700 px-4 py-1 rounded shadow hover:bg-gray-100">
            Facebook
          </button>
          <button className="bg-white text-gray-700 px-4 py-1 rounded shadow hover:bg-gray-100">
            Twitter
          </button>
        </div>
      </form>
    </div>
  );
}
