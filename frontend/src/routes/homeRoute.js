export const ADMIN_HOME = "/admin/dashboard";
export const MEMBER_HOME = "/member/dashboard-user-data";

export const getHomeRoute = (role) => (role === "admin" ? ADMIN_HOME : MEMBER_HOME);
