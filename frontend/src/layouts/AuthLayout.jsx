import { Link } from "react-router-dom";

const AuthLayout = ({ title, subtitle, children, footerText, footerLinkText, footerLink }) => {
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

        <div className="mt-6 text-center text-sm text-gray-600">
          {footerText}{" "}
          <Link
            to={footerLink}
            className="text-indigo-600 hover:underline font-medium"
          >
            {footerLinkText}
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;