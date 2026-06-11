const tasks = [
  {
    id: 1,
    title: "Design landing page",
    completed: false,
  },
  {
    id: 2,
    title: "Fix login bug",
    completed: true,
  },
  {
    id: 3,
    title: "Implement Kanban board",
    completed: false,
  },
  {
    id: 4,
    title: "Write API docs",
    completed: false,
  },
];

const RecentTasks = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-6">
        Recent Tasks
      </h2>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3"
          >
            <div
              className={`w-3 h-3 rounded-full ${
                task.completed
                  ? "bg-green-500"
                  : "bg-yellow-500"
              }`}
            />

            <span
              className={`${
                task.completed
                  ? "line-through text-gray-400"
                  : ""
              }`}
            >
              {task.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTasks;