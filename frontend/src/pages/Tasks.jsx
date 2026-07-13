import MainLayout from "../components/layout/MainLayout";

const Tasks = () => {

  return (
    <MainLayout>
      <div className="pb-4">
        <h1 className="text-3xl font-bold">Tasks</h1>

        <p className="mt-2 text-gray-500">
          View all your tasks across projects.
        </p>
      </div>
    </MainLayout>
  );
};

export default Tasks;
