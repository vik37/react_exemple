//import React from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import {useState, useEffect}  from 'react'

function App() {
  const [showAddTask, setShowAddTask] = useState
  (false)
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
      
    }
    getTasks()
  }, [])
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    console.log(data)
    return data;
  }
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data;
  }
 
    // {
    //     id: 1,
    //     text: "Doctors Apointment",
    //     day: "Feb 5th at 2:30pm",
    //     remainder: true
    // },
    // {
    //     id: 2,
    //     text: "Meeting at school",
    //     day: "Feb 6th at 1:30pm",
    //     remainder: true
    // },
    // {
    //     id: 3,
    //     text: "Food Shoping",
    //     day: "Feb 5th at 2:30pm",
    //     remainder: false
    // }

const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks',{
      method: "POST",
      headers:{
        'content-type': 'aplication/json',
      },
      body: JSON.stringify(task),
    })
    //console.log(task)
    const data = await res.json();
    console.log(data)
    setTasks([...tasks, data]);
    //console.log(task)
    //const id = Math.floor(Math.random() * 10000) + 1;
    //console.log(id)
    //const newTask = { id, ...task }
    //setTasks([...tasks, newTask])
}
// Delete Task
const deleteTask = async (id) =>{
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method: 'DELETE',
  })
    setTasks(tasks.filter((t) => t.id !== id));

}
// Toogle Remainder
const toggleRemainder = async (id) =>{
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, remainder:!taskToToggle.remainder}
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method:"PUT",
      headers:{
        'Content-type':'aplication/json'
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()

  //  console.log(id);
    setTasks(tasks.map((t) => t.id ===id ? {...t,remainder:!data.remainder} : t))
}
  return (
    <div className="container">
      <Header  onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask}  />}
      {tasks.length > 0 ? <Tasks tasks = {tasks} onDelete=
        {deleteTask} 
        onToggle={toggleRemainder}
        /> : 'No Tasks to show'}
    </div>
  );
 }
// class App extends React.Component{
//   render(){
//     return <h1> Hallo from class</h1>
//   }
// }
export default App;
