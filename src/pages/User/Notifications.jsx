import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { getNotifications, markAsRead } from "../../services/notifications.js";
import { getCurrentUser } from "../../services/auth.js";
import { Search, Wrench, Calendar, Clock, MapPin, IndianRupee, MessageCircle, Bell } from "lucide-react";

export default function Notifications() {

  const [user,setUser] = useState(null);
  const [notifications,setNotifications] = useState([]);
  const [filtered,setFiltered] = useState([]);
  const [loading,setLoading] = useState(true);
  const [filter,setFilter] = useState("all");

  /* -------------------------
     GET USER
  ------------------------- */

  useEffect(()=>{
    getUser()
  },[])

  async function getUser(){

    const {data} = await supabase.auth.getUser()

    if(data.user){
      setUser(data.user)
      fetchNotifications(data.user.id)
      subscribeNotifications(data.user.id)
    }

  }

  /* -------------------------
     FETCH NOTIFICATIONS
  ------------------------- */

  async function fetchNotifications(userId){

    const {data,error} = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id",userId)
    .order("created_at",{ascending:false})

    if(error){
      console.log(error)
      return
    }

    setNotifications(data)
    setFiltered(data)
    setLoading(false)

  }

  /* -------------------------
     REALTIME SUBSCRIBE
  ------------------------- */

  function subscribeNotifications(userId){

    const channel = supabase
    .channel("notifications")

    .on(
      "postgres_changes",
      {
        event:"INSERT",
        schema:"public",
        table:"notifications",
        filter:`user_id=eq.${userId}`
      },
      payload => {

        setNotifications(prev=>[payload.new,...prev])

      }
    )

    .subscribe()

    return ()=>supabase.removeChannel(channel)

  }

  /* -------------------------
     FILTER LOGIC
  ------------------------- */

  useEffect(()=>{

    if(filter==="all"){
      setFiltered(notifications)
      return
    }

    if(filter==="unread"){
      setFiltered(notifications.filter(n=>!n.is_read))
      return
    }

    if(filter==="read"){
      setFiltered(notifications.filter(n=>n.is_read))
      return
    }

  },[filter,notifications])

  /* -------------------------
     MARK AS READ
  ------------------------- */

  async function markAsRead(id){

    await supabase
    .from("notifications")
    .update({is_read:true})
    .eq("id",id)

    setNotifications(prev =>
      prev.map(n =>
        n.id===id ? {...n,is_read:true} : n
      )
    )

  }

  /* -------------------------
     MARK ALL READ
  ------------------------- */

  async function markAllRead(){

    if(!user) return

    await supabase
    .from("notifications")
    .update({is_read:true})
    .eq("user_id",user.id)

    setNotifications(prev =>
      prev.map(n => ({...n,is_read:true}))
    )

  }

  /* -------------------------
     ICON SELECTOR
  ------------------------- */

  function NotificationIcon({type}){

    switch(type){

      case "booking":
        return <Calendar size={20}/>

      case "message":
        return <MessageCircle size={20}/>

      case "success":
        return <CheckCircle size={20}/>

      default:
        return <AlertCircle size={20}/>

    }

  }

  /* -------------------------
     LOADING
  ------------------------- */

  if(loading){
    return(
      <div className="p-10 text-center text-gray-500">
        Loading notifications...
      </div>
    )
  }

  return (

    <div className="p-8 space-y-8">

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-3">

          <Bell size={28}/>

          <div>

            <h1 className="text-3xl font-bold">
              Notifications
            </h1>

            <p className="text-gray-500">
              Stay updated with your activity
            </p>

          </div>

        </div>

        <button
          onClick={markAllRead}
          className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Mark All Read
        </button>

      </div>

      {/* FILTER */}

      <div className="flex gap-3">

        {["all","unread","read"].map(f=>(
          <button
            key={f}
            onClick={()=>setFilter(f)}
            className={`px-4 py-2 rounded-lg capitalize text-sm
            ${filter===f
            ? "bg-blue-500 text-white"
            : "bg-gray-100"}
            `}
          >
            {f}
          </button>
        ))}

      </div>

      {/* EMPTY STATE */}

      {filtered.length===0 && (

        <div className="text-center py-20 text-gray-400">

          <Bell size={40} className="mx-auto mb-3"/>

          <p>No notifications yet</p>

        </div>

      )}

      {/* NOTIFICATION LIST */}

      <div className="space-y-4">

        {filtered.map(n => (

          <motion.div
            key={n.id}
            initial={{opacity:0,y:10}}
            animate={{opacity:1,y:0}}
            className={`p-5 rounded-xl shadow flex items-start gap-4
            ${n.is_read ? "bg-white" : "bg-blue-50"}
            `}
          >

            {/* ICON */}

            <div className="text-blue-500">

              <NotificationIcon type={n.type}/>

            </div>

            {/* CONTENT */}

            <div className="flex-1">

              <h3 className="font-semibold">
                {n.title}
              </h3>

              <p className="text-sm text-gray-500">
                {n.message}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {new Date(n.created_at).toLocaleString()}
              </p>

            </div>

            {/* ACTION */}

            {!n.is_read && (

              <button
                onClick={()=>markAsRead(n.id)}
                className="text-green-600"
              >

                <Check size={18}/>

              </button>

            )}

          </motion.div>

        ))}

      </div>

    </div>

  )

}