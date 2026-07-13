export const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700";

    case "Medium":
      return "bg-yellow-100 text-yellow-700";

    case "Low":
      return "bg-green-100 text-green-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case "Todo":
      return "bg-gray-100 text-gray-700";

    case "In Progress":
      return "bg-blue-100 text-blue-700";

    case "Done":
      return "bg-green-100 text-green-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};