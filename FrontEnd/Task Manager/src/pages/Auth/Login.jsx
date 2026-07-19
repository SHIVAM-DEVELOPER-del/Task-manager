import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthLayout from "../../components/layouts/AuthLayout";
import { TextInput } from "../../components/inputs/Inputs";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { EMAIL_PATTERN } from "../../utils/helper";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const submit = async (formValues) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(API_PATHS.auth.login, formValues);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Welcome back!");
      navigate(data.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Unable to sign in";
      // Show the error inline on both fields (we don't know which one is
      // wrong, and telling the user which one exists is a security risk)
      // as well as a toast for visibility.
      setError("email", { type: "manual", message: " " });
      setError("password", { type: "manual", message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold">Welcome Back</h1>
      <p className="mt-2 text-slate-500">Please enter your details to log in.</p>
      <form onSubmit={handleSubmit(submit)} noValidate className="mt-10 space-y-5">
        <TextInput
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: { value: EMAIL_PATTERN, message: "Enter a valid email address" },
          })}
        />
        <div>
          <TextInput
            label="Password"
            type="password"
            placeholder="Min 8 characters"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
            })}
          />
          <div className="mt-2 text-right">
            <Link className="text-sm font-semibold text-blue-600" to="/forgot-password">
              Forgot password?
            </Link>
          </div>
        </div>
        <button
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "LOGGING IN..." : "LOGIN"}
        </button>
      </form>
      <p className="mt-6 text-sm">
        Don't have an account?{" "}
        <Link className="font-semibold text-blue-600" to="/signup">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
};
export default Login;
