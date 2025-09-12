const { useState, useEffect } = React;

function TaskFlowApp() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Welcome to TaskFlow!",
      completed: false,
      priority: "High",
      notes: "This is your first task"
    }
  ]);
  
  const [newTask, setNewTask] = useState("");

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-600 flex items-center justify-center relative shadow-lg">
            <span className="text-white font-bold text-xl">Ai</span>
            <div className="absolute -bottom-1 left-3 w-3 h-3 bg-blue-600 transform rotate-45"></div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            TaskFlow <span className="text-slate-600">by</span> <span className="text-blue-600">Ai Concierge</span>
          </h1>
          <p className="text-slate-600">Professional task management platform</p>
        </header>
        
        {/* Add Task */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
          <div className="flex gap-3">
            <input 
              type="text" 
              placeholder="Enter a new task..."
              className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <button 
              onClick={addTask}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Your Tasks ({tasks.length})</h2>
          <div className="space-y-3">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    task.completed 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'border-slate-300 hover:border-blue-400'
                  }`}
                >
                  {task.completed && '✓'}
                </button>
                <div className="flex-1">
                  <span className={`font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                    {task.title}
                  </span>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  task.priority === 'High' ? 'bg-red-100 text-red-700' :
                  task.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">Ai</span>
            </div>
            <span className="text-xs text-slate-600">
              Powered by <span className="font-medium text-blue-600">Ai Concierge</span>
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

ReactDOM.render(<TaskFlowApp />, document.getElementById('root'));
