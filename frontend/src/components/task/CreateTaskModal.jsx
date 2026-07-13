import { useState } from "react";

const CreateTaskModal = ({ show, onClose, onCreate, project }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Todo");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate({
      title,
      description,
      priority,
      status,
      dueDate,
      assignedTo,
    });

    onClose();
  };

  return (
    <div
      className="
				fixed inset-0
				bg-black/50
				flex items-center justify-center
				p-4
				overflow-y-auto
				z-50
      "
    >
      <div
        className="
					bg-white
					rounded-2xl
					w-full
					max-w-lg max-h-[92vh] overflow-y-auto
					p-6
					shadow-xl
				"
      >
        <h2 className="text-2xl font-bold mb-6">Create Task</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">Title</label>

            <input
              type="text"
              className="w-full border rounded-xl px-4 py-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">Description</label>

            <textarea
              className="w-full border rounded-xl px-4 py-3"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block mb-2 font-medium">Priority</label>

            <select
              className="w-full border rounded-xl px-4 py-3"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block mb-2 font-medium">Status</label>

            <select
              className="w-full border rounded-xl px-4 py-3"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Todo</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block mb-2 font-medium">Due Date</label>

            <input
              type="date"
              className="w-full border rounded-xl px-4 py-3"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Assignee */}
          <div>
            <label className="block mb-2 font-medium">Assign To</label>

            <select
              className="w-full border rounded-xl px-4 py-3"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
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
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-3 rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                px-5
                py-3
                rounded-xl
              "
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
