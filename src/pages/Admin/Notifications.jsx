import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getNotifications, markAsRead } from "../../services/notifications.js";

export default function AdminNotifications(){

  const [notifications,setNotifications] = useState([])
  const [title,setTitle] = useState("")
  const [message,setMessage] = useState("")
  const [type,setType] = useState("system")
  const [loading,setLoading] = useState(true)



  useEffect(()=>{

    async function load(){

      const { data } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at",{ascending:false})

      if(data) setNotifications(data)

      setLoading(false)

    }

    load()

  },[])



  async function sendNotification(){

    if(!title || !message) return

    const newNotification = {

      title,
      message,
      type,
      is_read:false,
      user_id:null

    }

    const { data,error } = await supabase
      .from("notifications")
      .insert([newNotification])
      .select()

    if(!error){

      setNotifications([data[0],...notifications])

      setTitle("")
      setMessage("")

    }

  }



  async function markRead(id){

    await supabase
      .from("notifications")
      .update({is_read:true})
      .eq("id",id)

    setNotifications(
      notifications.map(n =>
        n.id === id ? {...n,is_read:true}:n
      )
    )

  }



  return(

    <div className="space-y-10">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">

          Notification Center

        </h1>

        <p className="text-gray-500 mt-2">

          Broadcast system updates and manage platform alerts

        </p>

      </div>



      {/* SEND PANEL */}

      <div className="bg-white border rounded-xl shadow-sm p-6 space-y-4">

        <h2 className="font-semibold">

          Send Notification

        </h2>

        <input
          placeholder="Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full"
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full h-24"
        />

        <select
          value={type}
          onChange={(e)=>setType(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >

          <option value="system">System</option>
          <option value="booking">Booking</option>
          <option value="promotion">Promotion</option>

        </select>

        <button
          onClick={sendNotification}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
        >

          Send Notification

        </button>

      </div>



      {/* NOTIFICATION LIST */}

      <div className="bg-white border rounded-xl shadow-sm">

        <div className="p-6 border-b font-semibold">

          Notification History

        </div>

        <div className="divide-y">

          {notifications.map((n,index)=>(

            <motion.div
              key={n.id}
              initial={{opacity:0,y:10}}
              animate={{opacity:1,y:0}}
              transition={{delay:index*0.05}}
              className="p-6 flex justify-between items-center"
            >

              <div>

                <p className="font-medium">

                  {n.title}

                </p>

                <p className="text-sm text-gray-500">

                  {n.message}

                </p>

                <p className="text-xs text-gray-400 mt-1">

                  {new Date(n.created_at).toLocaleString()}

                </p>

              </div>

              <div className="flex items-center gap-3">

                <span className={`px-3 py-1 text-xs rounded-full
                  ${n.type === "system" ? "bg-blue-100 text-blue-700":
                  n.type === "booking" ? "bg-green-100 text-green-700":
                  "bg-purple-100 text-purple-700"}
                `}>

                  {n.type}

                </span>

                {!n.is_read && (

                  <button
                    onClick={()=>markRead(n.id)}
                    className="text-xs bg-gray-200 px-3 py-1 rounded"
                  >

                    Mark Read

                  </button>

                )}

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </div>

  )

}