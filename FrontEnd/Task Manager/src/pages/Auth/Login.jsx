import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthLayout from "../../components/layouts/AuthLayout";
import { TextInput } from "../../components/inputs/Inputs";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Login = () => { const [form, setForm] = useState({ email: "", password: "" }); const [loading, setLoading] = useState(false); const navigate = useNavigate();
  const submit = async (event) => { event.preventDefault(); setLoading(true); try { const { data } = await axiosInstance.post(API_PATHS.auth.login, form); localStorage.setItem("token", data.token); localStorage.setItem("user", JSON.stringify(data)); toast.success("Welcome back!"); navigate(data.role === "admin" ? "/admin/dashboard" : "/user/dashboard"); } catch (error) { toast.error(error.response?.data?.message || "Unable to sign in"); } finally { setLoading(false); } };
  return <AuthLayout><h1 className="text-3xl font-bold">Welcome Back</h1><p className="mt-2 text-slate-500">Please enter your details to log in.</p><form onSubmit={submit} className="mt-10 space-y-5"><TextInput label="Email Address" type="email" placeholder="john@example.com" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><TextInput label="Password" type="password" minLength="8" placeholder="Min 8 characters" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /><button disabled={loading} className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-60">{loading ? "LOGGING IN..." : "LOGIN"}</button></form><p className="mt-6 text-sm">Don't have an account? <Link className="font-semibold text-blue-600" to="/signup">Sign Up</Link></p></AuthLayout>; };
export default Login;
