import React, { useState } from "react";
import { MoreVertical, Plus, ChevronDown } from "lucide-react";
import "./Tasks.css";

const Tasks = () => {
  const statusOptions = ["TO DO", "IN PROGRESS", "COMPLETE"];
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", status: "COMPLETE" },
    { id: 2, title: "Task 2", status: "IN PROGRESS" },
    { id: 3, title: "Task 3", status: "TO DO" },
    { id: 4, title: "Task 4", status: "TO DO" },
  ]);

  const [toDoTasks, setToDoTasks] = useState([
    { id: 1, title: "Creating Wireframe", status: "COMPLETE" },
    { id: 2, title: "Research Development", status: "TO DO" },
  ]);

  const [showInput, setShowInput] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Toggle Dropdown
  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  // Update Task Status
  const updateTaskStatus = (taskList, setTaskList, id, newStatus) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
    setOpenDropdownId(null);
  };

  // Handle Add Task
  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    setToDoTasks([
      ...toDoTasks,
      { id: toDoTasks.length + 1, title: newTask, status: "TO DO" },
    ]);
    setNewTask("");
    setShowInput(false);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "TO DO":
        return "#E8E8E8";
      case "IN PROGRESS":
        return "#FFD700";
      case "COMPLETE":
        return "#4CAF50";
      default:
        return "#E8E8E8";
    }
  };

  return (
    <div className="tasks-container">
      {/* Tasks Assigned */}
      <div className="task-section">
        <div className="task-header">
          <h3>Tasks Assigned</h3>
          <MoreVertical className="icon" />
        </div>
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <span>{task.title}</span>
            <div className="status-dropdown">
              <div
                className="status-display"
                onClick={() => toggleDropdown(task.id)}
              >
                <div
                  className="status-icon"
                  style={{ backgroundColor: getStatusColor(task.status) }}
                >
                  {task.status === "COMPLETE" ? (
                    <span className="status-check">✔</span>
                  ) : (
                    <div className="status-dot"></div>
                  )}
                </div>
                <span className="status-text">{task.status}</span>
              </div>
              {openDropdownId === task.id && (
                <div className="dropdown-menu">
                  {statusOptions.map((status) => (
                    <div
                      key={status}
                      className="dropdown-item"
                      onClick={() =>
                        updateTaskStatus(tasks, setTasks, task.id, status)
                      }
                    >
                      <div
                        className="status-icon"
                        style={{ backgroundColor: getStatusColor(status) }}
                      >
                        {status === "COMPLETE" ? (
                          <span className="status-check">✔</span>
                        ) : (
                          <div className="status-dot"></div>
                        )}
                      </div>
                      <span>{status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <button className="view-all">View All</button>
      </div>

      {/* To-Do Section */}
      <div className="task-section">
        <div className="task-header">
          <h3>To Do</h3>
          <MoreVertical className="icon" />
        </div>
        {toDoTasks.map((task) => (
          <div key={task.id} className="task-item">
            <span>{task.title}</span>
            <div className="status-dropdown">
              <div
                className="status-display"
                onClick={() => toggleDropdown(`todo-${task.id}`)}
              >
                <div
                  className="status-icon"
                  style={{ backgroundColor: getStatusColor(task.status) }}
                >
                  {task.status === "COMPLETE" ? (
                    <span className="status-check">✔</span>
                  ) : (
                    <div className="status-dot"></div>
                  )}
                </div>
                <span className="status-text">{task.status}</span>
              </div>
              {openDropdownId === `todo-${task.id}` && (
                <div className="dropdown-menu">
                  {statusOptions.map((status) => (
                    <div
                      key={status}
                      className="dropdown-item"
                      onClick={() =>
                        updateTaskStatus(
                          toDoTasks,
                          setToDoTasks,
                          task.id,
                          status
                        )
                      }
                    >
                      <div
                        className="status-icon"
                        style={{ backgroundColor: getStatusColor(status) }}
                      >
                        {status === "COMPLETE" ? (
                          <span className="status-check">✔</span>
                        ) : (
                          <div className="status-dot"></div>
                        )}
                      </div>
                      <span>{status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {showInput ? (
          <div className="add-task">
            <input
              type="text"
              placeholder="Enter new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={handleAddTask}>Add</button>
          </div>
        ) : (
          <button className="add-btn" onClick={() => setShowInput(true)}>
            <Plus /> Add
          </button>
        )}
      </div>
    </div>
  );
};

export default Tasks;