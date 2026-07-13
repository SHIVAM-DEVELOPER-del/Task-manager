import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineChartPie, HiOutlineClipboardDocumentList, HiOutlinePlusCircle, HiOutlineUsers, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { initials } from "../../utils/helper";

const navItems = {
  admin: [
    ["Dashboard", "/admin/dashboard", HiOutlineChartPie], ["Manage Tasks", "/admin/tasks", HiOutlineClipboardDocumentList],
    ["Create Task", "/admin/create-task", HiOutlinePlusCircle], ["Team Members", "/admin/users", HiOutlineUsers],
  ],
  member: [["Dashboard", "/user/dashboard", HiOutlineChartPie], ["My Tasks", "/user/tasks", HiOutlineClipboardDocumentList]],
};

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role === "admin" ? "admin" : "member";
  const logout = () => { localStorage.clear(); navigate("/login"); };
  return <div className="min-h-screen bg-slate-50 text-slate-900">
    <header className="sticky top-0 z-20 border-b border-slate-100 bg-white px-6 py-5"><span className="text-xl font-bold tracking-tight">Task Manager</span></header>
    <div className="flex">
      <aside className="sticky top-[77px] hidden h-[calc(100vh-77px)] w-72 shrink-0 border-r border-slate-100 bg-white p-6 lg:block">
        <div className="mb-9 text-center"><div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-2xl font-bold text-white">{initials(user.name)}</div><span className="mt-3 inline-block rounded-md bg-blue-600 px-3 py-1 text-xs font-semibold capitalize text-white">{role}</span><h2 className="mt-3 font-semibold">{user.name || "Guest User"}</h2><p className="truncate text-sm text-slate-500">{user.email || "Sign in to continue"}</p></div>
        <nav className="space-y-2">{navItems[role].map(([label, to, Icon]) => <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"}`}><Icon className="text-xl" />{label}</NavLink>)}</nav>
        <button onClick={logout} className="mt-8 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600"><HiOutlineArrowRightOnRectangle className="text-xl" />Logout</button>
      </aside>
      <main className="min-w-0 flex-1 p-5 sm:p-8">{children}</main>
    </div>
  </div>;
};
export default DashboardLayout;
