import moment from "moment";

export const formatDate = (date) => (date ? moment(date).format("Do MMM YYYY") : "—");
export const initials = (name = "User") => name.split(" ").map((word) => word[0]).slice(0, 2).join("").toUpperCase();
export const taskProgress = (task) => {
  const items = task.todoChecklist || [];
  return items.length ? Math.round((items.filter((item) => item.completed).length / items.length) * 100) : task.progress || 0;
};
export const statusClass = (status) => ({ Pending: "bg-violet-50 text-violet-700", "In Progress": "bg-cyan-50 text-cyan-700", Completed: "bg-lime-50 text-lime-700" }[status] || "bg-slate-100 text-slate-600");
export const priorityClass = (priority) => ({ Low: "bg-emerald-50 text-emerald-700", Medium: "bg-amber-50 text-amber-700", High: "bg-rose-50 text-rose-700" }[priority] || "bg-slate-100 text-slate-600");
