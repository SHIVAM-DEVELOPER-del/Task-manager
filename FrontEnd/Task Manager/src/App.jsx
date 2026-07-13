import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Admin/Dashboard";
import ManageTasks from "./pages/Admin/ManageTasks";
import CreateTask from "./pages/Admin/CreateTask";
import ManageUsers from "./pages/Admin/ManageUsers";
import MyTasks from "./pages/Users/MyTasks";
import UserDashboard from "./pages/Users/UserDashboard";
import ViewTaskDetails from "./pages/Users/ViewTaskDetails";
import PrivateRoutes from "./routes/PrivateRoutes";

const App = () => <Router><Toaster position="top-right" /><Routes><Route path="/login" element={<Login />} /><Route path="/signup" element={<Signup />} /><Route element={<PrivateRoutes allowedRoles={["admin"]} />}><Route path="/admin/dashboard" element={<Dashboard />} /><Route path="/admin/tasks" element={<ManageTasks />} /><Route path="/admin/create-task" element={<CreateTask />} /><Route path="/admin/users" element={<ManageUsers />} /></Route><Route element={<PrivateRoutes allowedRoles={["member"]} />}><Route path="/user/dashboard" element={<UserDashboard />} /><Route path="/user/tasks" element={<MyTasks />} /><Route path="/user/tasks-details/:id" element={<ViewTaskDetails />} /></Route><Route path="*" element={<Navigate to="/login" replace />} /></Routes></Router>;
export default App;
