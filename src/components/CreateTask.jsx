import React, { useState } from 'react'
import { v4 } from 'uuid'
import Toast from 'react-hot-toast'

const CreateTask = ({ tasks,setTasks }) => {
    const [value, setValue] = useState({
        id:"",
        name:"",
        status: "todo"
    })
    const handleSubmit =(e)=>{
        e.preventDefault();
        if(value.name.length < 4){
            Toast.error("enter more characters")
            return
        }
        if(value.name.length > 100 ){
            Toast.error("Too many characters")
            return
        }
        setTasks((prev) => {
            // const list = [...prev, value];
            const list = Array.isArray(prev) ? [...prev, value] : [value];
            localStorage.setItem("tasks", JSON.stringify(list));
            return list;
        }
        );

        Toast.success("Task created")

        setValue({
            id:"",
            name:"",
            status:"todo"
        })
    }
  return (
    <form  onSubmit={handleSubmit} >
        <input type ="text" className="border-2 px-2 bg-slate-100 rounded-lg h-12 placeholder-gray border-slate-400 mr-2 w-80" 
            onChange={ e => setValue({...value, id : v4(), name: e.target.value}) }
            value={value.name}
        />
        <button className='border-2 border-slate-200 bg-cyan-400 h-12 text-white px-1 rounded-md'> 
        Add Task
        </button>
    </form>
  )
}

export default CreateTask