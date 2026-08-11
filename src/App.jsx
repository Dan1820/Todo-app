
import Form from "./Components/Form"
import { useState } from "react"
import { nanoid } from "nanoid"

import FilterButton from "./Components/FilterButton"
import Todo from "./Components/Todo"

const FILTER_MAP={
  All:()=>true,
  Active:(task) =>!task.completed,
  Completed: (task) =>task.completed,
}

const FILTER_NAMES= Object.keys(FILTER_MAP)


const App=(props)=>{
  const [tasks,setTasks]=useState(props.tasks)
  const[filter,setFilter]= useState("All")

  const addTask=(name)=>{
    const newTask={id:`todo-${nanoid()}`, name,completed:false};
    setTasks([...tasks, newTask])
  }
  const toggleTaskCompleted=(id)=>{
    const updatedTask= tasks.map((task)=>{
      if(id===task.id){
        return{...task,completed:!task.completed}

      }
      return task
    })
    setTasks(updatedTasks)
  }

  const filterList= FILTER_NAMES.map((name)=>(
    <FilterButton 
    key={name} 
    name={name} 
    isPressed={name===filter}
    setFilter={setFilter} />

  ))

  const deleteTask=(id)=>{
    const remainingTasks= tasks.filter((task) => id !==task.id)
    setTasks(remainingTasks)
  }


  const taskList= tasks
  .filter(FILTER_MAP[filter])
  .map((task)=>(
<Todo 
id={task.id} 
name={task.name} 
completed={task.completed} 
key={task.id}
toggleTaskCompleted={toggleTaskCompleted}
deleteTask={deleteTask}
editTask={editTask}
/>))
function editTask(id, newName) {
  const editedTaskList = tasks.map((task) => {
    // if this task has the same ID as the edited task
    if (id === task.id) {
      // Copy the task and update its name
      return { ...task, name: newName };
    }
    // Return the original task if it's not the edited task
    return task;
  });
  setTasks(editedTaskList);
}
// const editTask=(id,newName)=>{
//   const editedTaskList=tasks.map((task)=>{
//     //if this task has the same id as edited task,
//     //coppy task and update its name
//     if(id=== task.id){
//       return{...task, name:newName}
//     }else{
//       return task //return the original name 
//     }
//   })
//   setTasks(editedTaskList)
// }

const tasksNoun= taskList.length !==1 ? 'tasks': 'task'
const headingText=`${taskList.length} ${tasksNoun} remaining`

  return(
    <div className="todoapp stack-large" >
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      
        <div className="filters btn-group stack-exception" >
          {filterList}
        </div>
        
        
        
      <h2 id="list-heading" >{headingText}</h2>
      <ul  role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
          {taskList}
      
      </ul>
    </div>
  )
}

export default App