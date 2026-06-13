import TaskCard from "./TaskCard";

const KanbanColumn = ({ title, tasks }) => {
  return (
    <div className="bg-gray-100 rounded-2xl p-4">
      <div className="flex justify-between mb-4">
        <h2 className="font-bold text-lg">
          {title}
        </h2>

        <span className="bg-white px-2 py-1 rounded-full text-sm">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;