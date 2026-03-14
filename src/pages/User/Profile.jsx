import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { getCurrentUser } from "../../services/auth.js";
import { Camera, Mail, Shield, Wrench, Save } from "lucide-react";

export default function Profile() {

  const [user,setUser] = useState(null);
  const [profile,setProfile] = useState(null);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);

  const [skills,setSkills] = useState("");

  /* ----------------------------
     GET USER
  ---------------------------- */

  useEffect(()=>{
    getUser()
  },[])

  async function getUser(){

    const {data} = await supabase.auth.getUser()

    if(data.user){

      setUser(data.user)
      fetchProfile(data.user.id)

    }

  }

  /* ----------------------------
     FETCH PROFILE
  ---------------------------- */

  async function fetchProfile(userId){

    const {data,error} = await supabase
    .from("profiles")
    .select("*")
    .eq("id",userId)
    .single()

    if(error){
      console.log(error)
      return
    }

    setProfile(data)

    if(data.skills){
      setSkills(data.skills.join(", "))
    }

    setLoading(false)

  }

  /* ----------------------------
     UPDATE PROFILE
  ---------------------------- */

  async function updateProfile(e){

    e.preventDefault()

    if(!profile) return

    setSaving(true)

    const skillsArray =
      skills
      .split(",")
      .map(s=>s.trim())
      .filter(Boolean)

    const updates = {
      id:user.id,
      skills:skillsArray
    }

    const {error} = await supabase
    .from("profiles")
    .update(updates)
    .eq("id",user.id)

    if(error){
      console.log(error)
    }

    setSaving(false)

  }

  /* ----------------------------
     LOADING
  ---------------------------- */

  if(loading){

    return(
      <div className="p-10 text-center text-gray-500">
        Loading profile...
      </div>
    )

  }

  return (

    <div className="p-8 space-y-8 max-w-5xl mx-auto">

      {/* HEADER CARD */}

      <motion.div
        initial={{opacity:0,y:10}}
        animate={{opacity:1,y:0}}
        className="bg-white shadow rounded-xl p-8 flex items-center gap-6"
      >

        {/* AVATAR */}

        <div className="relative">

          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">

            {profile.email?.charAt(0).toUpperCase()}

          </div>

          <button
            className="absolute bottom-0 right-0 bg-white shadow rounded-full p-1"
          >
            <Camera size={16}/>
          </button>

        </div>

        {/* USER INFO */}

        <div>

          <h2 className="text-2xl font-bold">
            {profile.email}
          </h2>

          <p className="text-gray-500 capitalize">
            Role: {profile.role}
          </p>

        </div>

      </motion.div>

      {/* PROFILE FORM */}

      <motion.form
        onSubmit={updateProfile}
        initial={{opacity:0}}
        animate={{opacity:1}}
        className="bg-white p-8 rounded-xl shadow space-y-6"
      >

        <h3 className="text-xl font-semibold">
          Edit Profile
        </h3>

        {/* EMAIL */}

        <div className="space-y-2">

          <label className="text-sm text-gray-500">
            Email
          </label>

          <div className="flex items-center border rounded-lg px-4 py-2">

            <Mail size={16}/>

            <input
              type="text"
              value={profile.email}
              disabled
              className="ml-2 w-full outline-none bg-transparent"
            />

          </div>

        </div>

        {/* ROLE */}

        <div className="space-y-2">

          <label className="text-sm text-gray-500">
            Account Role
          </label>

          <div className="flex items-center border rounded-lg px-4 py-2">

            <Shield size={16}/>

            <input
              type="text"
              value={profile.role}
              disabled
              className="ml-2 w-full outline-none bg-transparent capitalize"
            />

          </div>

        </div>

        {/* SKILLS */}

        <div className="space-y-2">

          <label className="text-sm text-gray-500">
            Skills (comma separated)
          </label>

          <div className="flex items-center border rounded-lg px-4 py-2">

            <Wrench size={16}/>

            <input
              type="text"
              placeholder="AC Repair, Plumbing, Electrical"
              value={skills}
              onChange={(e)=>setSkills(e.target.value)}
              className="ml-2 w-full outline-none"
            />

          </div>

        </div>

        {/* SAVE BUTTON */}

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >

          <Save size={16}/>

          {saving ? "Saving..." : "Save Changes"}

        </button>

      </motion.form>

      {/* ACCOUNT STATS */}

      <div className="grid md:grid-cols-3 gap-6">

        <StatCard
          title="Account Status"
          value="Active"
        />

        <StatCard
          title="Role"
          value={profile.role}
        />

        <StatCard
          title="Member Since"
          value={
            new Date(profile.created_at)
            .toLocaleDateString()
          }
        />

      </div>

    </div>

  )

}

/* --------------------------------
   STAT CARD
-------------------------------- */

function StatCard({title,value}){

  return(

    <motion.div
      whileHover={{scale:1.05}}
      className="bg-white p-6 rounded-xl shadow"
    >

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="text-xl font-bold capitalize">
        {value}
      </h3>

    </motion.div>

  )

}