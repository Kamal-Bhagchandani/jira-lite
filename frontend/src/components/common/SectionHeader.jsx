import { Link } from "react-router-dom";

const SectionHeader = ({ title, buttonText, to }) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

      <Link
        to={to}
        className="text-indigo-600 hover:text-indigo-700 font-medium transition"
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default SectionHeader;
