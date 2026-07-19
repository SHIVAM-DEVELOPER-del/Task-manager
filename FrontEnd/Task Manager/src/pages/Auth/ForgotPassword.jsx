import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthLayout from "../../components/layouts/AuthLayout";
import { TextInput } from "../../components/inputs/Inputs";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { EMAIL_PATTERN } from "../../utils/helper";

// A 3-step flow:
// 1. Enter email -> request an OTP
// 2. Enter the 6-digit OTP that was emailed -> verify it
// 3. Enter a new password -> reset it, using the short-lived token from step 2
const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const navigate = useNavigate();

  const emailForm = useForm({ mode: "onTouched" });
  const otpForm = useForm({ mode: "onTouched" });
  const passwordForm = useForm({ mode: "onTouched" });

  const requestOtp = async ({ email: enteredEmail }) => {
    setLoading(true);
    try {
      await axiosInstance.post(API_PATHS.auth.forgotPassword, { email: enteredEmail });
      setEmail(enteredEmail);
      toast.success("If that email is registered, a code has been sent to it");
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to send code");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async ({ otp }) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(API_PATHS.auth.verifyOtp, { email, otp });
      setResetToken(data.resetToken);
      toast.success("Code verified");
      setStep(3);
    } catch (error) {
      const message = error.response?.data?.message || "Invalid code";
      otpForm.setError("otp", { type: "manual", message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async ({ password }) => {
    setLoading(true);
    try {
      await axiosInstance.post(API_PATHS.auth.resetPassword, { resetToken, newPassword: password });
      toast.success("Password reset successfully. Please log in");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold">Forgot Password</h1>

      {step === 1 && (
        <>
          <p className="mt-2 text-slate-500">Enter your account's email and we'll send you a 6-digit code.</p>
          <form onSubmit={emailForm.handleSubmit(requestOtp)} noValidate className="mt-10 space-y-5">
            <TextInput
              label="Email Address"
              type="email"
              placeholder="john@example.com"
              error={emailForm.formState.errors.email?.message}
              {...emailForm.register("email", {
                required: "Email is required",
                pattern: { value: EMAIL_PATTERN, message: "Enter a valid email address" },
              })}
            />
            <button
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "SENDING CODE..." : "SEND CODE"}
            </button>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <p className="mt-2 text-slate-500">
            Enter the 6-digit code we sent to <span className="font-semibold text-slate-700">{email}</span>.
          </p>
          <form onSubmit={otpForm.handleSubmit(verifyOtp)} noValidate className="mt-10 space-y-5">
            <TextInput
              label="6-Digit Code"
              inputMode="numeric"
              maxLength={6}
              placeholder="123456"
              error={otpForm.formState.errors.otp?.message}
              {...otpForm.register("otp", {
                required: "Code is required",
                pattern: { value: /^\d{6}$/, message: "Enter the 6-digit code" },
              })}
            />
            <button
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "VERIFYING..." : "VERIFY CODE"}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-center text-sm font-semibold text-blue-600"
            >
              Use a different email
            </button>
          </form>
        </>
      )}

      {step === 3 && (
        <>
          <p className="mt-2 text-slate-500">Choose a new password for your account.</p>
          <form onSubmit={passwordForm.handleSubmit(resetPassword)} noValidate className="mt-10 space-y-5">
            <TextInput
              label="New Password"
              type="password"
              placeholder="Min 8 characters"
              error={passwordForm.formState.errors.password?.message}
              {...passwordForm.register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
            />
            <TextInput
              label="Confirm New Password"
              type="password"
              placeholder="Re-enter password"
              error={passwordForm.formState.errors.confirmPassword?.message}
              {...passwordForm.register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === passwordForm.getValues("password") || "Passwords do not match",
              })}
            />
            <button
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "RESETTING..." : "RESET PASSWORD"}
            </button>
          </form>
        </>
      )}

      <p className="mt-6 text-sm">
        Remembered your password?{" "}
        <Link className="font-semibold text-blue-600" to="/login">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};
export default ForgotPassword;
