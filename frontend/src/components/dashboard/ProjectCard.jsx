import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
	
  const navigate = useNavigate();

	return (
    <div
      onClick={() => navigate(`/projects/${project._id}`)}
      className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition cursor-pointer"
			>
      {/* Status */}
      <div className="flex justify-between items-center mb-4">
        <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold">
          Active
        </span>
      </div>

      {/* Project Name */}
      <h3 className="text-xl font-bold mb-2">
        {project.name}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-6">
        {project.description}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>
          Members: {project.members?.length || 0}
        </span>

        <span>
          Created by {project.createdBy.name}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;