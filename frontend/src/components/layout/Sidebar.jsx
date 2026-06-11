import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Projects",
      path: "/projects",
    },
    {
      label: "Tasks",
      path: "/tasks",
    },
    {
      label: "Settings",
      path: "/settings",
    },
  ];

  return (
    <aside className="h-screen w-64 bg-slate-100 fixed left-0 top-0 flex flex-col p-6">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-indigo-600">
          Jira Lite
        </h1>

        <p className="text-sm text-gray-500">
          Workspace
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-4 py-3 rounded-lg font-medium transition ${
                isActive
                  ? "bg-white text-indigo-600 shadow"
                  : "text-gray-600 hover:bg-gray-200"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="border-t pt-4">
        <button
          onClick={logout}
          className="w-full text-left px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-200"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;