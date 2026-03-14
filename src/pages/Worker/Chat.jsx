import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

import { getMessages, sendMessage } from "../../services/chatService.js";
import { getCurrentUser } from "../../services/auth.js";
export default function WorkerChat(){

const [conversations,setConversations] = useState([])
const [selected,setSelected] = useState(null)
const [messages,setMessages] = useState([])
const [text,setText] = useState("")
const messagesEndRef = useRef(null)



/* MOCK DATA (replace with Supabase later) */

useEffect(()=>{

const demo = [

{
id:1,
customer:"Rahul Sharma",
service:"AC Repair",
unread:2
},

{
id:2,
customer:"Anita Verma",
service:"Plumbing",
unread:0
},

{
id:3,
customer:"Rohit Patel",
service:"Electrical",
unread:1
}

]

setConversations(demo)

},[])



/* AUTO SCROLL */

useEffect(()=>{

messagesEndRef.current?.scrollIntoView({behavior:"smooth"})

},[messages])



function openChat(conv){

setSelected(conv)

const demoMessages = [

{
id:1,
sender:"customer",
text:"Hello technician, when will you arrive?",
time:"10:30 AM"
},

{
id:2,
sender:"worker",
text:"I will reach in 30 minutes.",
time:"10:32 AM"
}

]

setMessages(demoMessages)

}



function sendMessage(){

if(!text.trim()) return

const newMsg = {

id:Date.now(),
sender:"worker",
text,
time:new Date().toLocaleTimeString()

}

setMessages([...messages,newMsg])
setText("")

}



return(

<div className="grid lg:grid-cols-4 gap-6 h-[80vh]">

{/* SIDEBAR */}

<div className="bg-white border rounded-xl overflow-hidden">

<div className="p-4 border-b">

<h2 className="font-semibold">

Conversations

</h2>

</div>



<div className="overflow-y-auto h-full">

{conversations.map(c=>(

<motion.div
key={c.id}
whileHover={{background:"#f9fafb"}}
onClick={()=>openChat(c)}
className={`p-4 border-b cursor-pointer flex justify-between

${selected?.id===c.id && "bg-indigo-50"}

`}
>

<div>

<p className="font-medium">

{c.customer}

</p>

<p className="text-xs text-gray-500">

{c.service}

</p>

</div>



{c.unread>0 && (

<span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">

{c.unread}

</span>

)}

</motion.div>

))}

</div>

</div>



{/* CHAT AREA */}

<div className="lg:col-span-3 flex flex-col bg-white border rounded-xl overflow-hidden">

{!selected && (

<div className="flex flex-1 items-center justify-center text-gray-400">

Select a conversation

</div>

)}



{selected && (

<>

{/* CHAT HEADER */}

<div className="p-4 border-b flex justify-between items-center">

<div>

<p className="font-semibold">

{selected.customer}

</p>

<p className="text-xs text-gray-500">

{selected.service}

</p>

</div>

</div>



{/* MESSAGES */}

<div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">

{messages.map(msg=>(

<motion.div
key={msg.id}
initial={{opacity:0,y:5}}
animate={{opacity:1,y:0}}
className={`flex

${msg.sender==="worker" ? "justify-end":"justify-start"}

`}
>

<div
className={`max-w-xs p-3 rounded-lg text-sm

${msg.sender==="worker"
?"bg-indigo-600 text-white"
:"bg-white border"}

`}
>

<p>

{msg.text}

</p>

<span className="block text-xs opacity-70 mt-1">

{msg.time}

</span>

</div>

</motion.div>

))}

<div ref={messagesEndRef}></div>

</div>



{/* INPUT */}

<div className="p-4 border-t flex gap-3">

<input
type="text"
placeholder="Type message..."
value={text}
onChange={(e)=>setText(e.target.value)}
className="flex-1 border rounded-lg px-4 py-2"
/>

<button
onClick={sendMessage}
className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
>

Send

</button>

</div>

</>

)}

</div>

</div>

)

}