import KanbanColumn from "./KanbanColumn";

const KanbanBoard = ({ tasks, onTaskClick }) => {
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
        onTaskClick={onTaskClick}
      />

      <KanbanColumn
        title="In Progress"
        tasks={progressTasks}
        onTaskClick={onTaskClick}
      />

      <KanbanColumn
        title="Done"
        tasks={doneTasks}
        onTaskClick={onTaskClick}
      />

    </div>
  );
};

export default KanbanBoard;