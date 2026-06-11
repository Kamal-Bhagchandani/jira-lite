const TaskCard = ({ task }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition cursor-pointer">

      {/* Priority + Type */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
          {task.type}
        </span>

        <span
          className={`text-xs font-semibold ${
            task.priority === "High"
              ? "text-red-500"
              : task.priority === "Medium"
              ? "text-yellow-500"
              : "text-green-500"
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-800 mb-4">
        {task.title}
      </h3>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-gray-500">

        <div>
          {task.assignee}
        </div>

        <div>
          {task.dueDate}
        </div>

      </div>
    </div>
  );
};

export default TaskCard;