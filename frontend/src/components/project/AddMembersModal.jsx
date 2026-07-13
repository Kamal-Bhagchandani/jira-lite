import { useState } from "react";

const AddMembersModal = ({ show, onClose, onAdd }) => {
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!show) return null;

  const handleSubmit = async () => {
    setError("");

    const members = emails
      .split("\n")
      .map((email) => email.trim())
      .filter(Boolean);

    if (members.length === 0) {
      setError("Please enter at least one email");
      return;
    }

    const invalidEmails = members.filter((email) => !emailRegex.test(email));

    if (invalidEmails.length > 0) {
      setError(`Invalid email(s): ${invalidEmails.join(", ")}`);
      return;
    }

    try {
      await onAdd(members);

      setSuccess(
        `${members.length} member${
          members.length > 1 ? "s" : ""
        } added successfully`,
      );

      setTimeout(() => {
        setEmails("");
        setSuccess("");
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
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
          p-6
          shadow-xl
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add Members</h2>

          <button
            onClick={() => {
              setEmails("");
              onClose();
            }}
            className="
              text-gray-500
              hover:text-gray-700
              text-2xl
            "
          >
            ×
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-500 mb-4">Enter one email address per line.</p>

        {/* Textarea */}
        <textarea
          rows={6}
          value={emails}
          onChange={(e) => {
            setEmails(e.target.value);
            setError("");
          }}
          placeholder={`john@gmail.com
abc@gmail.com
xyz@gmail.com`}
          className="
            w-full
            border
            rounded-xl
            p-4
            outline-none
            resize-none
          "
        />

        {success && <p className="text-green-600 text-sm mt-4">✓ {success}</p>}
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        {/* Footer */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => {
              setEmails("");
              onClose();
            }}
            className="
              border
              px-5
              py-2
              rounded-xl
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
							bg-indigo-600
							hover:bg-indigo-700
							disabled:bg-indigo-400
							text-white
							px-5
							py-2
							rounded-xl
						"
          >
            {loading ? "Adding..." : "Add Members"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMembersModal;
