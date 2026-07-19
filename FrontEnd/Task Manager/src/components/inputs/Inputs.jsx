import { forwardRef } from "react";

export const TextInput = forwardRef(
  ({ label, className = "", error, ...props }, ref) => (
    <label className={`block ${className}`}>
      {label && (
        <span className="mb-2 block text-sm font-medium text-slate-700">
          {label}
        </span>
      )}
      <input
        ref={ref}
        className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm outline-none transition focus:bg-white focus:ring-4 ${
          error
            ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
            : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
        }`}
        {...props}
      />
      {error && error.trim() && (
        <span className="mt-1.5 block text-xs font-medium text-rose-600">{error}</span>
      )}
    </label>
  )
);
TextInput.displayName = "TextInput";

export const SelectInput = forwardRef(({ label, children, error, ...props }, ref) => (
  <label className="block">
    {label && (
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
    )}
    <select
      ref={ref}
      className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm outline-none transition focus:bg-white focus:ring-4 ${
        error
          ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
          : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
      }`}
      {...props}
    >
      {children}
    </select>
    {error && <span className="mt-1.5 block text-xs font-medium text-rose-600">{error}</span>}
  </label>
));
SelectInput.displayName = "SelectInput";
