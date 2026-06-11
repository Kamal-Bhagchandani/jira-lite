import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 ml-64">
        <TopNavbar />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;