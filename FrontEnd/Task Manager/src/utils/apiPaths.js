export const API_PATHS = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    profile: "/api/auth/profile",
    uploadImage: "/api/auth/upload-image",
    forgotPassword: "/api/auth/forgot-password",
    verifyOtp: "/api/auth/verify-otp",
    resetPassword: "/api/auth/reset-password",
  },
  users: "/api/users",
  tasks: "/api/tasks",
  reports: {
    tasks: "/api/reports/export/tasks",
    users: "/api/reports/export/users",
  },
};
