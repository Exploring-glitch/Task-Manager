import { LuLayoutDashboard, LuSquarePlus, LuUsers, LuClipboardCheck, LuLogOut } from "react-icons/lu";



export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/tasks/dashboard"
    },
    {
        id: "02",
        label: "Manage Task",
        icon: LuClipboardCheck,
        path: "/tasks"
    },
    {
        id: "03",
        label: "Create Task",
        icon: LuSquarePlus,
        path: "/tasks/create-task"
    },
    {
        id: "04",
        label: "Team Members",
        icon: LuUsers,
        path: "/users/"
    },
    {
        id: "05",
        label: "Logout",
        icon: LuLogOut,
        path: "/auth/logout"
    }
]


export const SIDE_MENU_USER_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/tasks/dashboard-user-data"
    },
    {
        id: "02",
        label: "My Tasks",
        icon: LuClipboardCheck,
        path: "/tasks/"
    },
    {
        id: "05",
        label: "Logout",
        icon: LuLogOut,
        path: "/auth/logout"
    },
];


export const PRIORITY_DATA = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
];



export const STATUS_DATA = [
    { label: "Pending", value: "Pending" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
];

