import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TaskCard from "../../components/tasks/TaskCard";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const ManageTasks = () => { const [tasks, setTasks] = useState([]); useEffect(() => { axiosInstance.get(API_PATHS.tasks).then((res) => setTasks(res.data.tasks || [])).catch(() => {}); }, []); return <DashboardLayout><div className="flex items-center justify-between"><div><h1 className="text-3xl font-bold">Manage Tasks</h1><p className="mt-1 text-slate-500">Create, review and manage your team’s work.</p></div><Link to="/admin/create-task" className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white">Create Task</Link></div><div className="mt-7 grid gap-6 md:grid-cols-2 2xl:grid-cols-3">{tasks.map((task) => <TaskCard key={task._id} task={task} />)}</div>{!tasks.length && <p className="py-16 text-center text-slate-400">No tasks have been created yet.</p>}</DashboardLayout>; };
export default ManageTasks;
