import { useRef, useEffect, useState } from "react";

const ProjectHeader = ({ project, onNewTask, onDeleteProject, onAddMembers }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div className="flex justify-between items-start mb-8">

      {/* Left */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">
            {project.name}
          </h1>

          <button
            onClick={onAddMembers}
            className="
              border
              mx-1
              px-2
              py-1
              rounded-xl
              hover:bg-gray-200
            "
          >
            👤+
          </button>
        </div>
        
        <p className="mt-2 text-gray-500">
          {project.description}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        <button
          onClick={onNewTask}
          className="
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            px-5
            py-3
            rounded-xl
            font-medium
            shadow
            transition
          "
        >
          + New Task
        </button>

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="
              border
              px-4
              py-3
              rounded-xl
              hover:bg-gray-200
            "
          >
            ⋯
          </button>

          {showMenu && (
            <div
              className="
                absolute
                right-0
                mt-2
                bg-white
                shadow-lg
                rounded-xl
                border
                w-48
                z-10
              "
            >
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Delete this project permanently?"
                    )
                  ) {
                    onDeleteProject();
                  }
                }}
                className="
                  w-full
                  text-left
                  px-4
                  py-3
                  text-red-600
                  hover:bg-red-100
                  hover:text-red-700
                  transition-colors
                  rounded-xl
                "
              >
                Delete Project
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default ProjectHeader;