import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import DashboardLayout from "../layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { emptyDashboard } from "../../utils/data";
import { formatDate } from "../../utils/helper";

const colors = ["#7c3aed", "#06b6d4", "#84cc16"];
const DashboardView = ({ admin = false }) => { const [data, setData] = useState(emptyDashboard); const user = JSON.parse(localStorage.getItem("user") || "{}");
  useEffect(() => { axiosInstance.get(`${API_PATHS.tasks}/${admin ? "dashboard-data" : "user-dashboard-data"}`).then((res) => setData(res.data)).catch(() => {}); }, [admin]);
  const pie = [{ name: "Pending", value: data.charts.taskDistribution.Pending || 0 }, { name: "In Progress", value: data.charts.taskDistribution.InProgress || 0 }, { name: "Completed", value: data.charts.taskDistribution.Completed || 0 }];
  const bars = Object.entries(data.charts.taskPriorityLevels).map(([name, value]) => ({ name, value }));
  const stats = [["Total Tasks", data.statistics.totalTasks, "bg-blue-600"], ["Pending Tasks", data.statistics.pendingTasks, "bg-violet-600"], ["In Progress", (data.charts.taskDistribution.InProgress || 0), "bg-cyan-500"], ["Completed Tasks", data.statistics.completedTasks, "bg-lime-500"]];
  return <DashboardLayout><section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"><h1 className="text-3xl font-bold">Good Morning! {user.name || "User"}</h1><p className="mt-1 text-slate-500">{formatDate(new Date())}</p><div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{stats.map(([label, value, color]) => <div key={label} className="flex items-center gap-3"><span className={`h-7 w-2 rounded-full ${color}`} /><p><b className="mr-1 text-xl">{value}</b><span className="text-slate-500">{label}</span></p></div>)}</div></section>
  <section className="mt-7 grid gap-7 xl:grid-cols-2"><ChartCard title="Task Distribution"><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={pie} dataKey="value" innerRadius={76} outerRadius={112} paddingAngle={2}>{pie.map((entry, index) => <Cell key={entry.name} fill={colors[index]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer><Legend items={pie} /></ChartCard><ChartCard title="Task Priority Levels"><ResponsiveContainer width="100%" height={300}><BarChart data={bars}><XAxis dataKey="name" /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="value" radius={[10, 10, 0, 0]}>{bars.map((bar, index) => <Cell key={bar.name} fill={["#10b981", "#f59e0b", "#f43f5e"][index]} />)}</Bar></BarChart></ResponsiveContainer></ChartCard></section>
  <section className="mt-7 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">Recent Tasks</h2><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[560px] text-left text-sm"><thead className="border-b text-slate-400"><tr><th className="pb-3">Name</th><th className="pb-3">Status</th><th className="pb-3">Priority</th><th className="pb-3">Created On</th></tr></thead><tbody>{data.recentTasks.length ? data.recentTasks.map((task) => <tr key={task._id} className="border-b border-slate-50"><td className="py-4 font-medium">{task.title}</td><td className="py-4">{task.status}</td><td className="py-4">{task.priority}</td><td className="py-4">{formatDate(task.createdAt)}</td></tr>) : <tr><td colSpan="4" className="py-10 text-center text-slate-400">No tasks yet.</td></tr>}</tbody></table></div></section>
  </DashboardLayout>; };
const ChartCard = ({ title, children }) => <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">{title}</h2>{children}</div>;
const Legend = ({ items }) => <div className="flex justify-center gap-6 text-sm text-slate-500">{items.map((item, index) => <span key={item.name} className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full" style={{ background: colors[index] }} />{item.name}</span>)}</div>;
export default DashboardView;
