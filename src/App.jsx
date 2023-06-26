import React, {useEffect, useState} from "react";
import { Toaster } from "react-hot-toast";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import CreateTask from "./components/CreateTask";
import { ListTasks } from "./components/ListTasks";

const App = () => {
    const [tasks,setTasks] = useState([])
    useEffect(()=>{
        setTasks(JSON.parse(localStorage.getItem("tasks")))
    },[])
    console.log(tasks)
    return (
        <div >
            <DndProvider backend={HTML5Backend}>
            <Toaster/>
            <div className="flex flex-col w-screen h-screen items-center pt-32 gap-16">
                <CreateTask tasks ={tasks} setTasks={setTasks} />
                <ListTasks tasks ={tasks} setTasks={setTasks} />
            </div>
            </DndProvider>
        </div>
    )
}

export default App