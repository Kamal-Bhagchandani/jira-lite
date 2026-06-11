import KanbanColumn from "./KanbanColumn";

const tasks = [
  {
    id: 1,
    title: "Design login page",
    type: "UI",
    priority: "High",
    assignee: "Kamal",
    dueDate: "Jun 20",
    status: "Todo",
  },
  {
    id: 2,
    title: "Connect backend APIs",
    type: "Backend",
    priority: "Medium",
    assignee: "Kamal",
    dueDate: "Jun 23",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Create navbar component",
    type: "Frontend",
    priority: "Low",
    assignee: "Kamal",
    dueDate: "Jun 25",
    status: "Done",
  },
];

const KanbanBoard = () => {
  const todoTasks = tasks.filter((t) => t.status === "Todo");
  const progressTasks = tasks.filter((t) => t.status === "In Progress");
  const doneTasks = tasks.filter((t) => t.status === "Done");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <KanbanColumn
        title="Todo"
        tasks={todoTasks}
      />

      <KanbanColumn
        title="In Progress"
        tasks={progressTasks}
      />

      <KanbanColumn
        title="Done"
        tasks={doneTasks}
      />

    </div>
  );
};

export default KanbanBoard;