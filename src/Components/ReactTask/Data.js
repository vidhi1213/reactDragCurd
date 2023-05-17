const taskCount = 10;

const getTaskIds = taskCount => {
  const taskIds = [];
  for (let i = 0; i < taskCount; i++) {
    taskIds.push({ id: `task${i}`, index: i });
  }
  return taskIds;
};

const getTasks = taskCount => {
  let taskIds = {};
  for (let i = 0; i < taskCount; i++) {
    taskIds[`task${i}`] = { id: `task${i}`, content: `Task ${i}` };
  }
  return taskIds;
};

const taskIds = getTaskIds(taskCount);
const tasks = getTasks(taskCount);

const initialData = {
  tasks,
  columns: {
    "column-1": {
      id: "column-1",
      title: "TODO",
      taskIds // : ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: []
    },
    "column-3": {
      id: "column-3",
      title: "Completed",
      taskIds: []
    }
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3"]
};

export default initialData;
