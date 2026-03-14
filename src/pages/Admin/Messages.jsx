import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getMessages, sendMessage } from "../../services/chatService.js";
export default function AdminMessages(){

  const [conversations,setConversations] = useState([])
  const [selected,setSelected] = useState(null)
  const [messages,setMessages] = useState([])
  const [newMessage,setNewMessage] = useState("")
  const [loading,setLoading] = useState(true)



  /* LOAD CONVERSATIONS */

  useEffect(()=>{

    async function load(){

      const { data } = await supabase
        .from("messages")
        .select("*")
        .order("created_at",{ascending:false})

      if(data){

        const grouped = {}

        data.forEach(m=>{

          if(!grouped[m.booking_id]){

            grouped[m.booking_id] = []

          }

          grouped[m.booking_id].push(m)

        })

        const conv = Object.keys(grouped).map(id=>({

          booking_id:id,
          lastMessage:grouped[id][0]?.message,
          messages:grouped[id]

        }))

        setConversations(conv)

      }

      setLoading(false)

    }

    load()

  },[])



  /* SELECT CONVERSATION */

  function openConversation(conv){

    setSelected(conv.booking_id)
    setMessages(conv.messages)

  }



  /* SEND MESSAGE */

  async function sendMessage(){

    if(!newMessage) return

    const msg = {

      booking_id:selected,
      sender_role:"admin",
      message:newMessage,
      sender_id:null

    }

    const { data,error } = await supabase
      .from("messages")
      .insert([msg])
      .select()

    if(!error){

      setMessages([...messages,data[0]])
      setNewMessage("")

    }

  }



  return(

    <div className="grid lg:grid-cols-3 gap-6 h-[80vh]">

      {/* CONVERSATIONS LIST */}

      <div className="bg-white border rounded-xl shadow-sm flex flex-col">

        <div className="p-4 border-b font-semibold">

          Conversations

        </div>

        <div className="flex-1 overflow-y-auto">

          {conversations.map((conv,index)=>(

            <motion.div
              key={conv.booking_id}
              initial={{opacity:0,y:10}}
              animate={{opacity:1,y:0}}
              transition={{delay:index*0.05}}
              onClick={()=>openConversation(conv)}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 
              ${selected === conv.booking_id ? "bg-gray-100":""}`}
            >

              <p className="text-sm font-medium">

                Booking #{conv.booking_id.slice(0,6)}

              </p>

              <p className="text-xs text-gray-500 truncate">

                {conv.lastMessage}

              </p>

            </motion.div>

          ))}

        </div>

      </div>



      {/* CHAT WINDOW */}

      <div className="lg:col-span-2 bg-white border rounded-xl shadow-sm flex flex-col">

        {selected ? (

          <>

            {/* CHAT HEADER */}

            <div className="p-4 border-b font-semibold">

              Booking #{selected.slice(0,8)} Chat

            </div>



            {/* MESSAGES */}

            <div className="flex-1 overflow-y-auto p-6 space-y-4">

              {messages.map((m,index)=>{

                const isAdmin = m.sender_role === "admin"

                return(

                  <motion.div
                    key={m.id || index}
                    initial={{opacity:0,y:10}}
                    animate={{opacity:1,y:0}}
                    className={`flex ${isAdmin ? "justify-end":"justify-start"}`}
                  >

                    <div className={`max-w-xs px-4 py-2 rounded-xl text-sm
                      ${isAdmin
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-800"
                      }`}
                    >

                      {m.message}

                    </div>

                  </motion.div>

                )

              })}

            </div>



            {/* MESSAGE INPUT */}

            <div className="border-t p-4 flex gap-3">

              <input
                value={newMessage}
                onChange={(e)=>setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-lg px-4 py-2"
              />

              <button
                onClick={sendMessage}
                className="bg-indigo-600 text-white px-6 rounded-lg"
              >

                Send

              </button>

            </div>

          </>

        ) : (

          <div className="flex items-center justify-center h-full text-gray-500">

            Select a conversation

          </div>

        )}

      </div>

    </div>

  )

}