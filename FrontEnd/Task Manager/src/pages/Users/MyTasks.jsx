import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TaskCard from "../../components/tasks/TaskCard";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { taskStatuses } from "../../utils/data";

const MyTasks = () => { const [tasks, setTasks] = useState([]); const [active, setActive] = useState("All"); const navigate = useNavigate(); useEffect(() => { axiosInstance.get(API_PATHS.tasks).then((res) => setTasks(res.data.tasks || [])).catch(() => setTasks([])); }, []); const filtered = useMemo(() => active === "All" ? tasks : tasks.filter((task) => task.status === active), [tasks, active]); return <DashboardLayout><div className="flex flex-wrap items-center justify-between gap-4"><h1 className="text-3xl font-bold">All Tasks</h1><div className="flex flex-wrap gap-4">{taskStatuses.map((status) => <button key={status} onClick={() => setActive(status)} className={`border-b-2 pb-2 text-sm font-semibold ${active === status ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500"}`}>{status} <span className="ml-1 rounded-full bg-slate-100 px-2 py-1 text-xs">{status === "All" ? tasks.length : tasks.filter((task) => task.status === status).length}</span></button>)}</div></div><div className="mt-7 grid gap-6 md:grid-cols-2 2xl:grid-cols-3">{filtered.map((task) => <TaskCard key={task._id} task={task} onClick={() => navigate(`/user/tasks-details/${task._id}`)} />)}</div>{!filtered.length && <p className="py-16 text-center text-slate-400">No tasks found.</p>}</DashboardLayout>; };
export default MyTasks;
