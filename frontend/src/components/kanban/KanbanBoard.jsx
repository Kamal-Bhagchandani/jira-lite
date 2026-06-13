import KanbanColumn from "./KanbanColumn";

const KanbanBoard = ({ tasks }) => {
  const todoTasks = tasks.filter(
    (task) => task.status === "Todo"
  );

  const progressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  );

  const doneTasks = tasks.filter(
    (task) => task.status === "Done"
  );

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