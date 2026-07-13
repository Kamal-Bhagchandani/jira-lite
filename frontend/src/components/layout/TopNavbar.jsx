import { useAuth } from "../../context/AuthContext";

const TopNavbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;