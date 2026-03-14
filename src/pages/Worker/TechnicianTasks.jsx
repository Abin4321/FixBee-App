import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getWorkerBookings, updateBookingStatus } from "../../services/workerService.js";
import { getCurrentUser } from "../../services/auth.js";
export default function TechnicianTasks(){

const [tasks,setTasks] = useState([])
const [filtered,setFiltered] = useState([])
const [search,setSearch] = useState("")
const [status,setStatus] = useState("all")
const [selected,setSelected] = useState(null)



useEffect(()=>{

loadTasks()

},[])



useEffect(()=>{

let temp = tasks

if(status !== "all"){

temp = temp.filter(t=>t.status===status)

}

if(search){

temp = temp.filter(t=>

t.service.toLowerCase().includes(search.toLowerCase())

)

}

setFiltered(temp)

},[search,status,tasks])



async function loadTasks(){

const user = await getCurrentUser()

const data = await getWorkerBookings(user.id)

if(data){

setTasks(data)
setFiltered(data)

}

}



function updateStatus(id,newStatus){

const updated = tasks.map(t=>

t.id===id ? {...t,status:newStatus} : t

)

setTasks(updated)

}



/* TASK COUNTS */

const stats = {

pending:tasks.filter(t=>t.status==="pending").length,
assigned:tasks.filter(t=>t.status==="assigned").length,
completed:tasks.filter(t=>t.status==="completed").length

}



return(

<div className="space-y-10">

{/* PAGE HEADER */}

<div>

<h1 className="text-3xl font-bold text-gray-800">

Technician Tasks

</h1>

<p className="text-gray-500 mt-2">

Manage and complete your assigned service jobs

</p>

</div>



{/* STATS */}

<div className="grid md:grid-cols-3 gap-6">

<div className="bg-white border rounded-xl p-6 shadow-sm">

<p className="text-gray-500 text-sm">Pending</p>

<p className="text-3xl font-bold mt-2">

{stats.pending}

</p>

</div>



<div className="bg-white border rounded-xl p-6 shadow-sm">

<p className="text-gray-500 text-sm">Assigned</p>

<p className="text-3xl font-bold mt-2">

{stats.assigned}

</p>

</div>



<div className="bg-white border rounded-xl p-6 shadow-sm">

<p className="text-gray-500 text-sm">Completed</p>

<p className="text-3xl font-bold mt-2">

{stats.completed}

</p>

</div>

</div>



{/* SEARCH + FILTER */}

<div className="flex flex-wrap gap-4">

<input
type="text"
placeholder="Search service..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="border px-4 py-2 rounded-lg"
/>



<select
value={status}
onChange={(e)=>setStatus(e.target.value)}
className="border px-4 py-2 rounded-lg"
>

<option value="all">All</option>
<option value="pending">Pending</option>
<option value="assigned">Assigned</option>
<option value="completed">Completed</option>

</select>

</div>



{/* TASK LIST */}

<div className="grid md:grid-cols-2 gap-6">

{filtered.map(task=>(

<motion.div
key={task.id}
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
whileHover={{scale:1.03}}
className="bg-white border rounded-xl p-6 shadow-sm space-y-4"
>

<div className="flex justify-between">

<h3 className="font-semibold text-lg">

{task.service}

</h3>



<span className={`px-3 py-1 text-xs rounded-full

${task.status==="pending" && "bg-yellow-100 text-yellow-600"}
${task.status==="assigned" && "bg-blue-100 text-blue-600"}
${task.status==="completed" && "bg-green-100 text-green-600"}

`}>

{task.status}

</span>

</div>



<p className="text-gray-500 text-sm">

Customer: {task.customer}

</p>



<p className="text-gray-500 text-sm">

Date: {new Date(task.created_at).toLocaleDateString()}

</p>



{/* ACTIONS */}

<div className="flex gap-3 pt-2">

{task.status==="pending" && (

<button
onClick={()=>updateStatus(task.id,"assigned")}
className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
>

Accept Job

</button>

)}



{task.status==="assigned" && (

<button
onClick={()=>updateStatus(task.id,"completed")}
className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
>

Mark Complete

</button>

)}



<button
onClick={()=>setSelected(task)}
className="border px-4 py-2 rounded-lg text-sm"
>

Details

</button>

</div>

</motion.div>

))}

</div>



{/* TASK DETAILS MODAL */}

{selected && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center">

<div className="bg-white rounded-xl p-8 w-full max-w-lg space-y-6">

<h2 className="text-xl font-bold">

Service Details

</h2>



<div className="space-y-2 text-sm">

<p>

<b>Service:</b> {selected.service}

</p>

<p>

<b>Customer:</b> {selected.customer}

</p>

<p>

<b>Status:</b> {selected.status}

</p>

<p>

<b>Date:</b>

{new Date(selected.created_at).toLocaleDateString()}

</p>

</div>



<button
onClick={()=>setSelected(null)}
className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
>

Close

</button>

</div>

</div>

)}

</div>

)

}