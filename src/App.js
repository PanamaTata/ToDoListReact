import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
    let [tasks, setTasks] = useState([]);

    let [taskTitle, setTaskTitle] = useState('');

    const addTaskHandler = () =>{
        if (taskTitle.trim().length > 0 && taskTitle.trim().length <= 15) {
            let newTask = {
                id: Date.now(),
                title: taskTitle.trim(),
                completed: false,
                createdAt: new Date().toLocaleString()
            };
            setTasks([newTask, ...tasks]);
            setTaskTitle('');
        } else if (taskTitle.trim().length > 15) {
            alert('Task title cannot exceed 15 characters!');
        } else {
            alert('Task title cannot be empty!');
        }
    }
    const onChangeHandler = (e) => {
        let taskTitle = e.target.value;
        setTaskTitle(taskTitle);
    }

    const deleteAllTasksHandler = () => {
        setTasks([]);
    }

    const deleteTaskHandler = (id) => {
        let taskFiltered = tasks.filter((task) => task.id !== id );
        setTasks(taskFiltered);
    }

    const changeTaskStateHandler = (id) => {
        let newTasks= tasks.map(task => task.id === id
        ? {...task,completed: !task.completed} : task
        )
        setTasks(newTasks);
    }

    const filterTasksHandler = () => {
        let sortedTasks = [...tasks].sort((a, b) => b.completed - a.completed);
        setTasks(sortedTasks);
    }

    const filterNotCompletedTasksHandler = () => {
        let sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);
        setTasks(sortedTasks);
    }

  return (
      <div className="App">
        <h1>ToDo List</h1>
          <div className='Navigation'>
              <input type="text" onChange={(e) => onChangeHandler(e)} value={taskTitle}/>
             <div className='div-button' >
              <button className='button' onClick={addTaskHandler}>Add Task</button>
              <button className='button' onClick={deleteAllTasksHandler}>Delete all Tasks</button>
              <button className='button' onClick={filterTasksHandler}>Completed Tasks</button>
              <button className='button' onClick={filterNotCompletedTasksHandler}> Not completed Tasks</button>
             </div>
          </div>
          <div className='Tasks'>
              {
                  tasks.length > 0
                      ? tasks.map(task => <div key={task.id} className={ task.completed ? 'Task Completed' : 'Task'}>
                        <input className='task-left-part' type="checkbox"  defaultChecked={task.completed} onClick={() => changeTaskStateHandler(task.id)} value={task.completed}/>
                        <h1 className='task-center-part' >{task.title}</h1>
                          <div className='task-right-part' >
                              <button onClick={() => deleteTaskHandler(task.id)}>Delete task</button>
                              <p>Added on: {task.createdAt}</p>
                          </div>
                      </div>)
                      : <h2>Add Tasks</h2>
              }
            </div>

      </div>
  );
}

export default App;
