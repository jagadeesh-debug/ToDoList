"use client";

import { useEffect, useState } from "react";


export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const addTask = (e: React.FormEvent): void => {
    e.preventDefault();
    const a = document.getElementById("tasks") as HTMLInputElement;
    const taskvalue = a?.value.trim();
    if (!taskvalue) {
      console.error("Please enter the task");
      alert("Task cannot be empty!");
      return;
    }

    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, taskvalue];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    a.value = "";
  };


  const deleteTask=(index:number)=>{
    setTasks((prevTasks)=>{
      const updatedTasks = prevTasks.filter((_,i:number)=>i!==index)
        localStorage.setItem("tasks",JSON.stringify(updatedTasks));
        return updatedTasks;
      
    });
    }
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);


  return (
    <div className="contaier h-screen w-auto border  flex flex-col ">
      <h1 className="text-3xl font-bold text-center mt-2">ToDo-List</h1>
      <div className="flex  flex-col  items-center w-full gap-y-6 overflow-scroll h-screen mt-3">
        <div className="flex w-1/2 flex-col gap-x-6  mt-12">
          <h2 className="text-xl font-semibold text-center">Add a Task</h2>
          <form className="flex gap-x-4 justify-center" onSubmit={addTask}>
            <input type="text" placeholder="Enter a task" className="border border-black w-1/2 rounded-md h-9" id="tasks" />
            <button className="border border-black w-1/6 rounded-md bg-green-400" >Add</button>
          </form>
        </div>
        <div className=" flex flex-col  w-1/2 "> 
          <h2 className="text-xl font-semibold text-center">Tasks</h2>
          <ul id="lists" className="list-disc pl-5 ">
            {tasks.map((task, index) => (
              <li key={index} className="flex justify-between items-center  border border-black rounded-md m-2 h-1/4 hover:cursor-pointer ">
                <span className="ml-12 "> {task}</span>
                <button
                  onClick={() => deleteTask(index)}
                  className="mr-4  rounded-md w-1/6 bg-red-300"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
      </div>
      </div>
    </div>
  );
}
