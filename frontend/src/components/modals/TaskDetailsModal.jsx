import { useEffect, useState } from "react";

const TaskDetailsModal = ({
  show,
  task,
  project,
  onClose,
  onSave,
  onDelete,
}) => {
  if (!show || !task) return null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [editingStatus, setEditingStatus] = useState(false);
  const [editingPriority, setEditingPriority] = useState(false);
  const [editingDueDate, setEditingDueDate] = useState(false);
  const [editingAssignee, setEditingAssignee] = useState(false);

  const allMembers = [project.createdBy, ...project.members];

  const selectedAssignee = allMembers.find(
    (member) => member._id === assignedTo,
  );

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || "Todo");
      setPriority(task.priority || "Medium");
      setAssignedTo(task.assignedTo?._id || "");
      setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : "");
    }
  }, [task]);

  const priorityClasses = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[92vh] overflow-hidden shadow-xl">
        {/* Header */}
        <div className="border-b px-8 py-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              <div className="group flex items-center gap-3">
                {!editingTitle ? (
                  <>
                    <h2 className="text-3xl font-bold flex-1 text-gray-900">
                      {title}
                    </h2>

                    <button
                      onClick={() => setEditingTitle(true)}
                      className="
                        opacity-0
                        group-hover:opacity-100
                        transition
                        text-gray-400
                      "
                    >
                      ✏️
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className=" flex-1 text-3xl font-bold border-b outline-none"
                    />

                    <button
                      onClick={() => setEditingTitle(false)}
                      className="text-green-600"
                    >
                      ✔
                    </button>
                  </>
                )}
              </div>
            </h2>

            <p className="text-gray-500 mt-2">
              Created by {task.createdBy?.name}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="grid md:grid-cols-3 overflow-y-auto max-h-[70vh]">
          {/* Left */}
          <div className="md:col-span-2 p-8 border-r">
            {/* Description */}
            <h3 className="font-semibold text-lg mb-4">Description</h3>
            <div className="group bg-gray-50 rounded-xl p-5">
              {!editingDescription ? (
                <div className="flex gap-3">
                  <div className="flex-1 whitespace-pre-wrap text-gray-700">
                    {description || "No Description"}
                  </div>

                  <button
                    onClick={() => setEditingDescription(true)}
                    className="opacity-0 group-hover:opacity-100 transition text-gray-400"
                  >
                    ✏️
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <textarea
                    rows={Math.max(description.split("\n").length, 1)}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="flex-1 bg-transparent outline-none resize-none"
                  />

                  <button
                    onClick={() => setEditingDescription(false)}
                    className="text-green-600"
                  >
                    ✔
                  </button>
                </div>
              )}
            </div>

            {/* Activity */}
            <div className="mb-10">
              <h3 className="font-semibold text-lg my-4">Activity</h3>

              <div className="space-y-4">
                <div className="border rounded-xl p-4">
                  <div className="font-medium">{task.createdBy?.name}</div>

                  <div className="text-sm text-gray-500">Created this task</div>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Comments</h3>

              <textarea
                rows={4}
                placeholder="Write a comment..."
                className="w-full border rounded-xl p-4 outline-none"
              />

              <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl">
                Send
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="p-8 bg-gray-50">
            {/* Status */}
            <div className="group">
              <p className="text-sm text-gray-500 mb-2">Status</p>

              {!editingStatus ? (
                <div className="flex items-center gap-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {status}
                  </span>

                  <button
                    onClick={() => setEditingStatus(true)}
                    className="
                      opacity-0
                      group-hover:opacity-100
                      transition
                      text-gray-400
                    "
                  >
                    ✏️
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border rounded-xl px-3 py-2"
                  >
                    <option>Todo</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>

                  <button
                    onClick={() => setEditingStatus(false)}
                    className="text-green-600"
                  >
                    ✔
                  </button>
                </div>
              )}
            </div>

            {/* Priority */}
            <div className="group">
              <p className="text-sm text-gray-500 mt-6 mb-2">Priority</p>

              {!editingPriority ? (
                <div className="flex items-center gap-3">
                  <span
                    className={`
                      px-3 py-1 rounded-full text-sm
                      ${priorityClasses[priority]}
                    `}
                  >
                    {priority}
                  </span>

                  <button
                    onClick={() => setEditingPriority(true)}
                    className="
                      opacity-0
                      group-hover:opacity-100
                      transition
                      text-gray-400
                    "
                  >
                    ✏️
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="border rounded-xl px-3 py-2"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>

                  <button
                    onClick={() => setEditingPriority(false)}
                    className="text-green-600"
                  >
                    ✔
                  </button>
                </div>
              )}
            </div>

            {/* Assignee */}
            <div className="mb-8 group">
              <p className="text-sm text-gray-500 mt-6 mb-2">Assignee</p>

              {!editingAssignee ? (
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="font-medium">
                      {selectedAssignee?.name || "Unassigned"}
                    </div>

                    <div className="text-sm text-gray-500">
                      {selectedAssignee?.email}
                    </div>
                  </div>

                  <button
                    onClick={() => setEditingAssignee(true)}
                    className="opacity-0 group-hover:opacity-100 transition text-gray-400"
                  >
                    ✏️
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="border rounded-xl px-3 py-2 flex-1"
                  >
                    <option value="">Unassigned</option>

                    <option value={project.createdBy._id}>
                      {project.createdBy.name}
                    </option>

                    {project.members.map((member) => (
                      <option key={member._id} value={member._id}>
                        {member.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => setEditingAssignee(false)}
                    className="text-green-600"
                  >
                    ✔
                  </button>
                </div>
              )}
            </div>

            {/* Due Date */}
            <div className="mb-6 group">
              <p className="text-sm text-gray-500 mb-2">Due Date</p>

              {!editingDueDate ? (
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    {dueDate
                      ? new Date(dueDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "No due date"}
                  </div>

                  <button
                    onClick={() => setEditingDueDate(true)}
                    className="
                      opacity-0
                      group-hover:opacity-100
                      transition
                      text-gray-400
                    "
                  >
                    ✏️
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="
                      border
                      rounded-xl
                      px-3
                      py-2
                      flex-1
                    "
                  />

                  <button
                    onClick={() => setEditingDueDate(false)}
                    className="text-green-600"
                  >
                    ✔
                  </button>
                </div>
              )}
            </div>

            {/* Created At */}
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Created At</p>

              <div>
                {new Date(task.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>

            {/* Updated At */}
            <div>
              <p className="text-sm text-gray-500 mb-2">Updated At</p>

              <div>
                {new Date(task.updatedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-8 py-1 flex justify-between bg-white sticky bottom-0 z-10">
          <button
            onClick={onDelete}
            className="
              text-red-600
              hover:text-red-700
              font-medium
            "
          >
            Delete Task
          </button>

          <div className="space-x-4">
            <button
              onClick={onClose}
              className="
                border
                px-5 py-2
                rounded-xl
              "
            >
              Cancel
            </button>

            <button
              onClick={() =>
                onSave({
                  _id: task._id,
                  title,
                  description,
                  status,
                  priority,
                  assignedTo,
                  dueDate,
                })
              }
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
