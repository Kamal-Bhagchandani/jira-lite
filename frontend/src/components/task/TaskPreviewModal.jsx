import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";


import { getPriorityColor, getStatusColor } from "../../utils/taskStyles";

const TaskPreviewModal = ({ show, task, onClose }) => {
  const navigate = useNavigate();

  if (!show || !task) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden shadow-xl">
        {/* Header */}
        <div className="border-b px-8 py-6 flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold break-words">{task.title}</h2>

            <p className="text-gray-500 mt-2">
              Created by {task.createdBy?.name}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700"
          >
            <MdClose />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto max-h-[65vh]">
          {/* Description */}

          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-3">Description</h3>

            <div className="bg-gray-50 rounded-xl p-4 whitespace-pre-wrap text-gray-700">
              {task.description || "No description"}
            </div>
          </div>

          {/* Details */}

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Status</p>

              <span
                className={`
                  inline-block
                  mt-2
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  font-medium
                  ${getStatusColor(task.status)}
                `}
              >
                {task.status}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500">Priority</p>

              <span
                className={`
                  inline-block
                  mt-2
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  font-medium
                  ${getPriorityColor(task.priority)}
                `}
              >
                {task.priority}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500">Assignee</p>

              <p className="mt-2 font-medium">
                {task.assignedTo?.name || "Unassigned"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Project</p>

              <p className="mt-2 font-medium">{task.project?.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Due Date</p>

              <p className="mt-2">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "No due date"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Updated At</p>

              <p className="mt-2">
                {new Date(task.updatedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-8 py-1 flex justify-end gap-4">
          <button onClick={onClose} className="border px-5 py-2 rounded-xl">
            Close
          </button>

          <button
            onClick={() => navigate(`/projects/${task.project._id}`)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl"
          >
            Open Project →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskPreviewModal;
