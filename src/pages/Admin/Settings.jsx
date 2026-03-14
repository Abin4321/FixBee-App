import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getCurrentUser } from "../../services/auth.js";

export default function AdminSettings(){

  const [profile,setProfile] = useState(null)

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [notifications,setNotifications] = useState(true)

  const [platformName,setPlatformName] = useState("FixBee")
  const [supportEmail,setSupportEmail] = useState("support@fixbee.com")

  const [saving,setSaving] = useState(false)



  /* LOAD ADMIN PROFILE */

  useEffect(()=>{

    loadProfile()

  },[])



  async function loadProfile(){

    const { data:user } = await supabase.auth.getUser()

    if(!user?.user) return

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id",user.user.id)
      .single()

    if(data){

      setProfile(data)

      setEmail(data.email)

      setName(data.name || "")

    }

  }



  /* SAVE PROFILE */

  async function saveProfile(){

    if(!profile) return

    setSaving(true)

    await supabase
      .from("profiles")
      .update({
        email,
        name
      })
      .eq("id",profile.id)

    setSaving(false)

  }



  /* SAVE PLATFORM SETTINGS */

  async function savePlatform(){

    alert("Platform settings saved (demo UI)")

  }



  return(

    <div className="space-y-10">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">

          System Settings

        </h1>

        <p className="text-gray-500 mt-2">

          Manage platform configuration and admin profile

        </p>

      </div>



      {/* ADMIN PROFILE */}

      <motion.div
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        className="bg-white border rounded-xl shadow-sm p-6 space-y-4"
      >

        <h2 className="font-semibold text-lg">

          Admin Profile

        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div>

            <label className="text-sm text-gray-500">

              Name

            </label>

            <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="border px-4 py-2 rounded-lg w-full"
            />

          </div>

          <div>

            <label className="text-sm text-gray-500">

              Email

            </label>

            <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="border px-4 py-2 rounded-lg w-full"
            />

          </div>

        </div>

        <button
          onClick={saveProfile}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
        >

          {saving ? "Saving..." : "Save Profile"}

        </button>

      </motion.div>



      {/* PLATFORM SETTINGS */}

      <motion.div
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        className="bg-white border rounded-xl shadow-sm p-6 space-y-4"
      >

        <h2 className="font-semibold text-lg">

          Platform Settings

        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div>

            <label className="text-sm text-gray-500">

              Platform Name

            </label>

            <input
              value={platformName}
              onChange={(e)=>setPlatformName(e.target.value)}
              className="border px-4 py-2 rounded-lg w-full"
            />

          </div>

          <div>

            <label className="text-sm text-gray-500">

              Support Email

            </label>

            <input
              value={supportEmail}
              onChange={(e)=>setSupportEmail(e.target.value)}
              className="border px-4 py-2 rounded-lg w-full"
            />

          </div>

        </div>

        <button
          onClick={savePlatform}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
        >

          Save Settings

        </button>

      </motion.div>



      {/* NOTIFICATION SETTINGS */}

      <motion.div
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        className="bg-white border rounded-xl shadow-sm p-6"
      >

        <h2 className="font-semibold text-lg mb-4">

          Notification Preferences

        </h2>

        <div className="flex items-center justify-between">

          <div>

            <p className="font-medium">

              Email Notifications

            </p>

            <p className="text-sm text-gray-500">

              Receive updates about bookings and system alerts

            </p>

          </div>

          <input
            type="checkbox"
            checked={notifications}
            onChange={()=>setNotifications(!notifications)}
            className="w-5 h-5"
          />

        </div>

      </motion.div>



      {/* SECURITY */}

      <motion.div
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        className="bg-white border rounded-xl shadow-sm p-6 space-y-4"
      >

        <h2 className="font-semibold text-lg">

          Security

        </h2>

        <div className="flex gap-4">

          <button className="bg-gray-900 text-white px-6 py-2 rounded-lg">

            Change Password

          </button>

          <button className="border px-6 py-2 rounded-lg">

            Enable 2FA

          </button>

        </div>

      </motion.div>

    </div>

  )

}