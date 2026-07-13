import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { SelectInput, TextInput } from "../../components/inputs/Inputs";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateTask = () => {
  const [users, setUsers] = useState([]);
  const [todo, setTodo] = useState("");
  const [attachment, setAttachment] = useState("");
  const [form, setForm] = useState({ title: "", description: "", priority: "Medium", dueDate: "", assignedTo: [], todoChecklist: [], attachments: [] });
  const navigate = useNavigate();

  useEffect(() => { axiosInstance.get(API_PATHS.users).then((res) => setUsers(res.data)).catch(() => {}); }, []);
  const addItem = (key, value) => {
    if (!value.trim()) return;
    setForm((current) => ({ ...current, [key]: [...current[key], key === "todoChecklist" ? { text: value, completed: false } : value] }));
  };
  const removeItem = (key, index) => setForm((current) => ({ ...current, [key]: current[key].filter((_, itemIndex) => itemIndex !== index) }));
  const submit = async (event) => {
    event.preventDefault();
    try { await axiosInstance.post(API_PATHS.tasks, form); toast.success("Task created successfully"); navigate("/admin/tasks"); }
    catch (error) { toast.error(error.response?.data?.message || "Unable to create task"); }
  };

  return <DashboardLayout><form onSubmit={submit} className="mx-auto max-w-6xl rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-9"><h1 className="text-3xl font-bold">Create Task</h1><div className="mt-7 space-y-6"><TextInput label="Task Title" placeholder="Create App UI" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /><label className="block"><span className="mb-2 block text-sm font-medium text-slate-700">Description</span><textarea className="min-h-32 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-blue-500" placeholder="Describe task" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label><div className="grid gap-5 md:grid-cols-3"><SelectInput label="Priority" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>{["Low", "Medium", "High"].map((item) => <option key={item}>{item}</option>)}</SelectInput><TextInput label="Due Date" type="date" required value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} /><SelectInput multiple label="Assign To (select members)" value={form.assignedTo} onChange={(e) => setForm({ ...form, assignedTo: [...e.target.selectedOptions].map((option) => option.value) })}>{users.map((user) => <option key={user._id} value={user._id}>{user.name}</option>)}</SelectInput></div><ListAdder label="TODO Checklist" value={todo} setValue={setTodo} onAdd={() => { addItem("todoChecklist", todo); setTodo(""); }} items={form.todoChecklist.map((item) => item.text)} onDelete={(index) => removeItem("todoChecklist", index)} /><ListAdder label="Add Attachments" value={attachment} setValue={setAttachment} onAdd={() => { addItem("attachments", attachment); setAttachment(""); }} items={form.attachments} onDelete={(index) => removeItem("attachments", index)} /><button className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white transition hover:bg-blue-700">CREATE TASK</button></div></form></DashboardLayout>;
};

const ListAdder = ({ label, value, setValue, onAdd, items, onDelete }) => <div><span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>{items.map((item, index) => <div key={`${item}-${index}`} className="mb-2 flex justify-between rounded-lg bg-slate-50 px-4 py-3 text-sm"><span>{String(index + 1).padStart(2, "0")} &nbsp; {item}</span><button type="button" onClick={() => onDelete(index)} className="text-rose-500">Remove</button></div>)}<div className="flex gap-3"><input value={value} onChange={(e) => setValue(e.target.value)} className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500" placeholder={label === "TODO Checklist" ? "Enter Task" : "Add File Link"} /><button type="button" onClick={onAdd} className="rounded-xl bg-slate-100 px-5 text-sm font-semibold">+ Add</button></div></div>;
export default CreateTask;
