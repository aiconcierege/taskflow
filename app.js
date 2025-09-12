const { useState, useEffect } = React;

function TaskFlowApp() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('taskflow-data');
      return saved ? JSON.parse(saved) : [
        {
          id: 1,
          title: "Welcome to TaskFlow!",
          completed: false,
          priority: "High",
          notes: "This is your first task - try adding more!"
        },
        {
          id: 2,
          title: "Review quarterly budget",
          completed: false,
          priority: "Medium",
          notes: "Focus on marketing allocations"
        }
      ];
    } catch {
      return [];
    }
  });
  
  const [newTask, setNewTask] = useState("");
  const [isDark, setIsDark] = useState(false);

  // Save tasks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('taskflow-data', JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  function addTask() {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        title: newTask,
        completed: false,
        priority: "Medium",
        notes: ""
      }]);
      setNewTask("");
    }
  }

  function toggleTask(id) {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return React.createElement("div", {
    className: `min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900'
    } p-4`
  },
    React.createElement("div", { className: "max-w-4xl mx-auto" },
      // Header
      React.createElement("header", { className: "mb-8 text-center" },
        React.createElement("div", { 
          className: "w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-600 flex items-center justify-center relative shadow-lg"
        },
          React.createElement("span", { className: "text-white font-bold text-xl" }, "Ai"),
          React.createElement("div", { className: "absolute -bottom-1 left-3 w-3 h-3 bg-blue-600 transform rotate-45" })
        ),
        React.createElement("h1", { className: "text-3xl font-bold mb-2" },
          "TaskFlow ",
          React.createElement("span", { className: "text-slate-600" }, "by"),
          " ",
          React.createElement("span", { className: "text-blue-600" }, "Ai Concierge")
        ),
        React.createElement("p", { className: isDark ? "text-slate-300" : "text-slate-600" }, 
          "Professional task management platform"
        ),
        React.createElement("button", {
          onClick: () => setIsDark(!isDark),
          className: `mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            isDark 
              ? 'bg-slate-700 text-white hover:bg-slate-600' 
              : 'bg-white text-slate-700 hover:bg-slate-50'
          } shadow-md`
        }, isDark ? "☀️ Light Mode" : "🌙 Dark Mode")
      ),
      
      // Stats
      React.createElement("div", { className: "grid sm:grid-cols-2 gap-4 mb-6" },
        React.createElement("div", { 
          className: `rounded-2xl p-6 shadow-lg ${isDark ? 'bg-slate-800' : 'bg-white'}`
        },
          React.createElement("h3", { className: "font-semibold mb-2" }, "Active Tasks"),
          React.createElement("p", { className: "text-3xl font-bold text-blue-600" }, activeTasks.length)
        ),
        React.createElement("div", { 
          className: `rounded-2xl p-6 shadow-lg ${isDark ? 'bg-slate-800' : 'bg-white'}`
        },
          React.createElement("h3", { className: "font-semibold mb-2" }, "Completed"),
          React.createElement("p", { className: "text-3xl font-bold text-emerald-600" }, completedTasks.length)
        )
      ),
      
      // Add Task
      React.createElement("div", { 
        className: `rounded-2xl shadow-xl p-6 mb-6 ${isDark ? 'bg-slate-800' : 'bg-white'}`
      },
        React.createElement("h3", { className: "text-lg font-semibold mb-4" }, "Add New Task"),
        React.createElement("div", { className: "flex gap-3" },
          React.createElement("input", {
            type: "text",
            placeholder: "Enter a new task...",
            className: `flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
              isDark 
                ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                : 'bg-white border-slate-300 text-slate-900'
            }`,
            value: newTask,
            onChange: (e) => setNewTask(e.target.value),
            onKeyPress: (e) => e.key === 'Enter' && addTask()
          }),
          React.createElement("button", {
            onClick: addTask,
            className: "px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg"
          }, "Add Task")
        )
      ),

      // Active Tasks
      React.createElement("div", { 
        className: `rounded-2xl shadow-xl p-6 mb-6 ${isDark ? 'bg-slate-800' : 'bg-white'}`
      },
        React.createElement("h2", { className: "text-xl font-semibold mb-4" }, 
          `Active Tasks (${activeTasks.length})`
        ),
        React.createElement("div", { className: "space-y-3" },
          activeTasks.length === 0 
            ? React.createElement("p", { 
                className: `text-center py-8 ${isDark ? 'text-slate-400' : 'text-slate-500'}`
              }, "No active tasks. Add one above!")
            : activeTasks.map(task => 
                React.createElement("div", {
                  key: task.id,
                  className: `flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-[1.01] ${
                    isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-50 hover:bg-slate-100'
                  }`
                },
                  React.createElement("button", {
                    onClick: () => toggleTask(task.id),
                    className: "w-6 h-6 rounded-full border-2 border-slate-300 hover:border-blue-400 transition-colors flex items-center justify-center text-xs"
                  }, "○"),
                  React.createElement("div", { className: "flex-1" },
                    React.createElement("span", { className: "font-medium" }, task.title),
                    task.notes && React.createElement("p", { 
                      className: `text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`
                    }, task.notes)
                  ),
                  React.createElement("span", {
                    className: `text-xs px-3 py-1 rounded-full font-medium ${
                      task.priority === 'High' ? 'bg-red-100 text-red-700' :
                      task.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-green-100 text-green-700'
                    }`
                  }, task.priority),
                  React.createElement("button", {
                    onClick: () => deleteTask(task.id),
                    className: `ml-2 text-red-600 hover:text-red-700 transition-colors p-1 rounded`
                  }, "✕")
                )
              )
        )
      ),

      // Completed Tasks
      completedTasks.length > 0 && React.createElement("div", { 
        className: `rounded-2xl shadow-xl p-6 ${isDark ? 'bg-slate-800' : 'bg-white'}`
      },
        React.createElement("h2", { className: "text-xl font-semibold mb-4" }, 
          `Completed Tasks (${completedTasks.length})`
        ),
        React.createElement("div", { className: "space-y-3" },
          completedTasks.map(task => 
            React.createElement("div", {
              key: task.id,
              className: `flex items-center gap-3 p-4 rounded-xl opacity-75 ${
                isDark ? 'bg-slate-700' : 'bg-slate-50'
              }`
            },
              React.createElement("button", {
                onClick: () => toggleTask(task.id),
                className: "w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs"
              }, "✓"),
              React.createElement("div", { className: "flex-1" },
                React.createElement("span", { className: "font-medium line-through" }, task.title)
              ),
              React.createElement("button", {
                onClick: () => deleteTask(task.id),
                className: "text-red-600 hover:text-red-700 transition-colors p-1 rounded"
              }, "✕")
            )
          )
        )
      ),

      // Footer
      React.createElement("footer", { className: "mt-12 text-center" },
        React.createElement("div", { 
          className: `inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-sm ${
            isDark ? 'bg-slate-800' : 'bg-white'
          }`
        },
          React.createElement("div", { className: "w-6 h-6 rounded bg-blue-600 flex items-center justify-center" },
            React.createElement("span", { className: "text-white font-bold text-xs" }, "Ai")
          ),
          React.createElement("span", { 
            className: `text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`
          },
            "Powered by ",
            React.createElement("span", { className: "font-medium text-blue-600" }, "Ai Concierge")
          )
        )
      )
    )
  );
}

ReactDOM.render(React.createElement(TaskFlowApp), document.getElementById('root'));
