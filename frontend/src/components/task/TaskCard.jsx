const TaskCard = ({ task, onClick, type }) => {
  return (
    <div
      onClick={() => onClick(task)}
      className="bg-white rounded-xl p-4 shadow cursor-pointer hover:shadow-lg transition"
    >
      <div className="flex justify-between mb-3">

        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
          {task.type}
        </span>

        <span
          className={`text-sm ${
            task.priority === "Low"
              ? "text-green-500"
              : task.priority === "Medium"
                ? "text-orange-500"
                : "text-red-500"
          }`}
        >
          {task.priority}
        </span>
      </div>

      <h3 className="font-semibold mb-4">{task.title}</h3>

      <div className="flex justify-between text-sm text-gray-500">
        <span>{task.assignee}</span>

        <span>
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "No due date"}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
