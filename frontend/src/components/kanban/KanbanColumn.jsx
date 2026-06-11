import TaskCard from "./TaskCard";

const KanbanColumn = ({ title, tasks }) => {
  return (
    <div className="bg-gray-100 rounded-2xl p-4 min-h-[500px]">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg text-gray-800">
          {title}
        </h2>

        <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-500">
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;