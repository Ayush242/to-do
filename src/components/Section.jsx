import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { toast } from 'react-hot-toast'

export const Section = ({ tasks, setTasks, status, todos, inprogress, completed }) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept:"task",
        drop : (item) => addItemToSection(item.id),
        collect: (monitor) => ({
          isOver: !!monitor.isOver()
        })
    }))

    const addItemToSection =(id) =>{
        setTasks(prev =>{
            const fTasks = prev.map(t =>{
                if(t.id === id){
                    return {...t, status:status}
                }
                return t
            })
            return fTasks
        })   
    }
    let text = 'To-do', bg = 'bg-slate-500', tasksToMap = todos
    if(status === 'inprogress'){
        text = 'In Progress',
        bg = 'bg-purple-500'
        tasksToMap = inprogress
    }
    if(status === 'completed'){
        text = 'Completed',
        bg = 'bg-green-500'
        tasksToMap = completed
    }


  return ( 
    <div ref ={drop} className={`${isOver ? "bg-slate-200": "" } rounded-md p-2 w-64`}>
        <Header text = {text} bg={bg} count={tasksToMap.length} />
        {tasksToMap.length > 0 && tasksToMap.map(task => <Task key ={task.id} task={task} tasks ={tasks} status={status} setTasks={setTasks}/> )}
    
    </div>
    
  )
}

const Header =({ text, count,bg})=>{
    return(
        <div className={`${bg} text-white text-sm flex items-center pl-3 uppercase h-12 rounded-md`}>
            {text}
            <div className='m-auto bg-white text-black w-5 h-5 flex items-center justify-center rounded-full' >{count}</div>
        </div>
    )
}

const Task =({ status,task, tasks, setTasks }) =>{

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item:{ id : task.id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))
    
    const handleDelete = (id) =>{
        const newTask = tasks.filter(t => t.id !== id)
        localStorage.setItem("tasks",JSON.stringify(newTask))
        setTasks(newTask)
        
        toast.success("Task removed",{icon : "❌" })
    }
    const changeToComplete = (id)=>{
        setTasks(prev =>{
            const mTasks = prev.map(t =>{
                if(t.id === id){
                    return {...t,status:'completed'}
                }
                return t
            })
            return mTasks
        })
        // e.stopPropagation();
    }

    const editTask =(e,id,name) =>{
        e.stopPropagation();
        return(
            <form>
                <input />
            </form>
        )
    }

   return (
        <div ref ={drag} className={`${isDragging ? " opacity-40 " : "opacity-100" } ${status ==='completed'?" opacity-50 line-through": "" } relative p-4 mt-4 bg-slate-50 flex items-center rounded-md shadow-md cursor-grab`} onClick={(e)=>changeToComplete(task.id)}>
           {task.name}
           <div className=' text-slate-400 absolute right-1'>
           <button onClick={(e) => editTask(e,task.id,task.name)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
           </button>
           <button className='p-3' onClick={() => handleDelete(task.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
           </button>
           </div>
        </div>
    )
}