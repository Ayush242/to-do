import React, { useEffect, useState } from 'react'
import { Section } from './Section'
export const ListTasks = ({ tasks, setTasks}) => {
    const [todos,setTodos] = useState([])
    const [inprogress,setInprogress] = useState([])
    const [completed,setCompleted] = useState([])

    useEffect(()=>{
        
        const fTodos = tasks?.filter(t => t.status === 'todo') ??[]
        const fInprogress = tasks?.filter(t => t.status === 'inprogress') ??[]
        const fCompleted = tasks?.filter(t => t.status === 'completed')  ??[]

        setTodos(fTodos)
        setInprogress(fInprogress)
        setCompleted(fCompleted)
        
    },[tasks])

    const statuses = ["todo","inprogress","completed"];
  return (
    <div className='flex gap-16 justify-center'>
        {statuses.map((status,index) =>{
            return <Section key={index} status={status} tasks = {tasks} setTasks={setTasks} todos ={todos} inprogress={inprogress} completed={completed} />
        })}
        
    </div>
  )
}
