import { HiOutlinePaperClip } from "react-icons/hi2";
import { formatDate, priorityClass, statusClass, taskProgress } from "../../utils/helper";

const TaskCard = ({ task, onClick }) => { const progress = taskProgress(task); return <button onClick={onClick} className="group w-full rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
  <div className="mb-4 flex gap-2"><span className={`rounded-md px-3 py-1 text-xs font-semibold ${statusClass(task.status)}`}>{task.status}</span><span className={`rounded-md px-3 py-1 text-xs font-semibold ${priorityClass(task.priority)}`}>{task.priority} Priority</span></div>
  <h3 className="truncate text-lg font-semibold">{task.title}</h3><p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">{task.description || "No description provided."}</p>
  <p className="mt-4 text-sm font-semibold">Task Done: {task.todoChecklist?.filter((item) => item.completed).length || 0} / {task.todoChecklist?.length || 0}</p><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-500" style={{ width: `${progress}%` }} /></div>
  <div className="mt-4 flex items-end justify-between text-sm"><span><span className="block text-xs text-slate-400">Due Date</span><b>{formatDate(task.dueDate)}</b></span>{task.attachments?.length > 0 && <span className="flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-blue-600"><HiOutlinePaperClip />{task.attachments.length}</span>}</div>
</button>; };
export default TaskCard;
