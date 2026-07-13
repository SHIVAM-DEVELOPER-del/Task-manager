export const TextInput = ({ label, className = "", ...props }) => (
  <label className={`block ${className}`}>
    {label && <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>}
    <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" {...props} />
  </label>
);

export const SelectInput = ({ label, children, ...props }) => (
  <label className="block">
    {label && <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>}
    <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" {...props}>{children}</select>
  </label>
);
