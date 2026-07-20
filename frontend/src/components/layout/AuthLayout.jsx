import { Link } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";

const AuthLayout = ({ title, subtitle, children, footerText, footerLinkText, footerLink }) => {
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Logo / Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">
            Jira Lite
          </h1>

          <p className="text-gray-500 mt-2">
            {subtitle}
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          {title}
        </h2>

        {children}

        <div className="mt-4 rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-sm">
          <p className="font-semibold text-indigo-700">
            Recruiter Demo Access
          </p>

          <p className="mt-1 text-gray-700">
            Welcome! This demo account allows you to explore the application and review its features without creating an account.
          </p>

          <div className="mt-3 flex items-center justify-between">
            <p className="font-mono text-sm">
              <span className="text-gray-500">Email:</span>{" "}
              guest@example.com
            </p>

            <button
              type="button"
              onClick={() => copyToClipboard("guest@example.com")}
              className="rounded-md p-2 text-gray-600 transition hover:bg-indigo-100 hover:text-indigo-600"
              title="Copy email"
            >
              <FaRegCopy size={16} />
            </button>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <p className="font-mono text-sm">
              <span className="text-gray-500">Password:</span>{" "}
              guest
            </p>

            <button
              type="button"
              onClick={() => copyToClipboard("guest")}
              className="rounded-md p-2 text-gray-600 transition hover:bg-indigo-100 hover:text-indigo-600"
              title="Copy password"
            >
              <FaRegCopy size={16} />
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          {footerText}{" "}
            <div className="group relative inline-block">
              <Link
                to={footerLink}
                className="text-indigo-600 hover:underline font-medium"
              >
                {footerLinkText}
              </Link>
              <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2
                      rounded bg-gray-900 px-2 py-1 text-xs text-white
                      opacity-0 transition-opacity duration-200
                      group-hover:opacity-100
                      pointer-events-none whitespace-nowrap">
                Coming Soon...
              </span>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;