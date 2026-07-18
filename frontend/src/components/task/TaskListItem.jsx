import { Link } from "react-router-dom";
import { getPriorityColor, getStatusColor } from "../../utils/taskStyles";

const TaskListItem = ({ task, onClick }) => {
  return (
    <div
      onClick={() => onClick(task)}
      className="
        bg-white
        shadow-sm
        mb-3
        flex
        justify-between
        items-center
        p-4
        rounded-lg
        hover:bg-gray-100
        transition
        cursor-pointer
      "
    >
      {/* Left */}
      <div>
        <h3 className="font-semibold text-gray-900">{task.title}</h3>

        <p className="text-sm text-gray-500 mt-1">
          <Link
            to={`/projects/${task.project._id}`}
            onClick={(e) => e.stopPropagation()}
            className="text-gray-500 hover:text-indigo-600 hover:underline"
          >
            {task.project.name}
          </Link>
        </p>
      </div>

      {/* Right */}
      <div className="flex gap-2">
        <span
          className={`
            px-2
            py-1
            rounded-full
            text-xs
            font-medium
            ${getPriorityColor(task.priority)}
          `}
        >
          {task.priority}
        </span>

        <span
          className={`
            px-2
            py-1
            rounded-full
            text-xs
            font-medium
            ${getStatusColor(task.status)}
          `}
        >
          {task.status}
        </span>
      </div>
    </div>
  );
};

export default TaskListItem;
