const TaskCard = ({ task }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow">

      <div className="flex justify-between mb-3">

        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
          {task.type}
        </span>

        <span className="text-sm text-red-500">
          {task.priority}
        </span>
      </div>

      <h3 className="font-semibold mb-4">
        {task.title}
      </h3>

      <div className="flex justify-between text-sm text-gray-500">
        <span>{task.assignee}</span>

        <span>{task.dueDate}</span>
      </div>
    </div>
  );
};

export default TaskCard;