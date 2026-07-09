import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../schemas/authSchema";
import { useAuth } from "../context/AuthContext";

import AuthLayout from "../layouts/AuthLayout";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setServerError("");

    try {
      await login(data.email, data.password);

      navigate("/dashboard");
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Invalid email or password",
      );
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Manage your projects efficiently."
      footerText="Don't have an account?"
      footerLinkText="Create one"
      footerLink="/register"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {serverError && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
            {serverError}
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>

          <input
            type="email"
            {...register("email")}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>

          <input
            type="password"
            {...register("password")}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-indigo-600 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
