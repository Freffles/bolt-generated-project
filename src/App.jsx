import { useState } from 'react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Trash2, CheckCircle2 } from 'lucide-react'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: newTask, 
        completed: false 
      }])
      setNewTask('')
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="container mx-auto max-w-md py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Tasking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <Input 
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              placeholder="Enter a new task"
              className="mr-2"
            />
            <Button onClick={addTask}>Add Task</Button>
          </div>

          <div className="space-y-2">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className="flex items-center justify-between p-2 border rounded-md"
              >
                <div 
                  className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.text}
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => toggleTask(task.id)}
                  >
                    <CheckCircle2 className={`h-5 w-5 ${task.completed ? 'text-green-500' : 'text-gray-400'}`} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
