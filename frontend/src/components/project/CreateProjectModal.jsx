import { useState } from "react";

const CreateProjectModal = ({ show, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState("");
  const [error, setError] = useState("");

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const result = await onCreate({
      name,
      description,
      members: members
        .split(",")
        .map((email) => email.trim())
        .filter(Boolean),
    });

    if (result.success) {
      onClose();

      setName("");
      setDescription("");
      setMembers([]);
    } else {
      setError(result.message);
    }
  };

  return (
    <div
      className="
        fixed inset-0
        bg-black/50
        flex items-center justify-center
        p-4
        z-50
      "
    >
      <div
        className="
          bg-white
          rounded-2xl
          w-full
          max-w-lg
          max-h-[92vh]
          overflow-y-auto
          p-6
          shadow-xl
        "
      >
        <h2 className="text-2xl font-bold mb-6">Create Project</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Project Name</label>

            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full
                border
                rounded-xl
                p-3
              "
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Description</label>

            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="
                w-full
                border
                rounded-xl
                p-3
              "
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Members (comma separated emails)
            </label>

            <textarea
              rows="3"
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              placeholder="abc@example.com, xyz@example.com"
              className="
                w-full
                border
                rounded-xl
                p-3
              "
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="
                px-5 py-3
                border
                rounded-xl
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                px-5 py-3
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

export default CreateProjectModal;
