import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiOutlineArrowUpTray } from "react-icons/hi2";
import AuthLayout from "../../components/layouts/AuthLayout";
import { TextInput } from "../../components/inputs/Inputs";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { EMAIL_PATTERN } from "../../utils/helper";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onTouched", defaultValues: { role: "member" } });

  const role = watch("role");

  const chooseImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setProgress(1);
      const url = await uploadImage(file, (e) => setProgress(Math.round((e.loaded * 100) / e.total)));
      setProfileImageUrl(url);
      toast.success("Profile image uploaded");
    } catch {
      toast.error("Image upload failed");
      setProgress(0);
    }
  };

  const submit = async (formValues) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(API_PATHS.auth.register, {
        ...formValues,
        profileImageUrl,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Account created");
      navigate(data.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Unable to create account";
      if (message.toLowerCase().includes("email")) {
        setError("email", { type: "manual", message });
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold">Create an Account</h1>
      <p className="mt-2 text-slate-500">Join us today by entering your details below.</p>
      <form onSubmit={handleSubmit(submit)} noValidate className="mt-7">
        <label className="mx-auto mb-6 flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-blue-50 text-blue-600">
          <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={chooseImage} />
          {profileImageUrl ? (
            <img src={profileImageUrl} className="h-full w-full object-cover" alt="Profile" />
          ) : (
            <HiOutlineArrowUpTray className="text-3xl" />
          )}
        </label>
        {progress > 0 && progress < 100 && (
          <p className="mb-3 text-center text-xs text-blue-600">Uploading {progress}%</p>
        )}

        {/* Sign up as Admin or Member */}
        <div className="mb-5">
          <span className="mb-2 block text-sm font-medium text-slate-700">I am signing up as</span>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setValue("role", "member", { shouldValidate: true })}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                role === "member"
                  ? "border-blue-600 bg-blue-50 text-blue-600"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              Member
            </button>
            <button
              type="button"
              onClick={() => setValue("role", "admin", { shouldValidate: true })}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                role === "admin"
                  ? "border-blue-600 bg-blue-50 text-blue-600"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              Admin
            </button>
          </div>
          <input type="hidden" {...register("role", { required: true })} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextInput
            label="Full Name"
            placeholder="John"
            error={errors.name?.message}
            {...register("name", {
              required: "Full name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" },
            })}
          />
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
          <TextInput
            label="Password"
            type="password"
            placeholder="Min 8 Characters"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
            })}
          />
          <TextInput
            label="Confirm Password"
            type="password"
            placeholder="Re-enter password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === getValues("password") || "Passwords do not match",
            })}
          />
        </div>
        <button
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 disabled:opacity-60"
        >
          {loading ? "CREATING..." : "SIGN UP"}
        </button>
      </form>
      <p className="mt-6 text-sm">
        Already have an account?{" "}
        <Link className="font-semibold text-blue-600" to="/login">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};
export default Signup;
