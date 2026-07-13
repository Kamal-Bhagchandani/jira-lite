import MainLayout from "../components/layout/MainLayout";

const Settings = () => {
  return (
    <MainLayout>
      <div className="pb-4">
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your account preferences.
        </p>
      </div>
    </MainLayout>
  );
};

export default Settings;