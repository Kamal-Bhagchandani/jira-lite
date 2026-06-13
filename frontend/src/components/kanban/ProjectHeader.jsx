const ProjectHeader = ({ project, onNewTask }) => {
  return (
    <div className="flex items-center justify-between mb-8">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {project.name}
        </h1>

        <p className="mt-2 text-gray-500">
          {project.description}
        </p>
      </div>

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

    </div>
  );
};

export default ProjectHeader;