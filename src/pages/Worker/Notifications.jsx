import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getNotifications, markAsRead } from "../../services/notifications.js";
import { getCurrentUser } from "../../services/auth.js";

export default function WorkerNotifications(){

const [notifications,setNotifications] = useState([])
const [filter,setFilter] = useState("all")



useEffect(()=>{

/* MOCK DATA (replace with supabase later) */

const data=[

{
id:1,
title:"New Job Assigned",
message:"You have been assigned an AC Repair job",
type:"job",
read:false,
time:"5 min ago"
},

{
id:2,
title:"Customer Message",
message:"Customer asked about arrival time",
type:"message",
read:false,
time:"10 min ago"
},

{
id:3,
title:"Job Completed",
message:"You successfully completed Plumbing job",
type:"system",
read:true,
time:"1 hour ago"
},

{
id:4,
title:"System Update",
message:"New service categories added",
type:"system",
read:true,
time:"Yesterday"
}

]

setNotifications(data)

},[])



function markRead(id){

setNotifications(

notifications.map(n=>

n.id===id ? {...n,read:true} : n

)

)

}



const filtered = filter==="all"
?notifications
:notifications.filter(n=>n.type===filter)



return(

<div className="space-y-8">

{/* HEADER */}

<div>

<h1 className="text-3xl font-bold text-gray-800">

Notifications

</h1>

<p className="text-gray-500 mt-2">

Stay updated with job alerts and messages

</p>

</div>



{/* FILTER */}

<div className="flex gap-4">

<button
onClick={()=>setFilter("all")}
className="px-4 py-2 border rounded-lg"
>

All

</button>

<button
onClick={()=>setFilter("job")}
className="px-4 py-2 border rounded-lg"
>

Jobs

</button>

<button
onClick={()=>setFilter("message")}
className="px-4 py-2 border rounded-lg"
>

Messages

</button>

<button
onClick={()=>setFilter("system")}
className="px-4 py-2 border rounded-lg"
>

System

</button>

</div>



{/* NOTIFICATION LIST */}

<div className="space-y-4">

{filtered.map(n=>(

<motion.div
key={n.id}
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
whileHover={{scale:1.02}}
className={`p-5 rounded-xl border shadow-sm flex justify-between

${!n.read ? "bg-indigo-50":"bg-white"}

`}
>

<div>

<h3 className="font-semibold">

{n.title}

</h3>

<p className="text-sm text-gray-500 mt-1">

{n.message}

</p>

<p className="text-xs text-gray-400 mt-2">

{n.time}

</p>

</div>



{!n.read && (

<button
onClick={()=>markRead(n.id)}
className="text-indigo-600 text-sm"
>

Mark Read

</button>

)}

</motion.div>

))}

</div>



{/* EMPTY STATE */}

{filtered.length===0 && (

<div className="text-center text-gray-400 py-10">

No notifications

</div>

)}

</div>

)

}