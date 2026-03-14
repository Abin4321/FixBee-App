import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getCurrentUser } from "../../services/auth.js";
export default function WorkerProfile(){

const [editing,setEditing] = useState(false)

const [profile,setProfile] = useState({

name:"Arjun Kumar",
email:"arjun.tech@example.com",
phone:"9876543210",
city:"Bangalore",
experience:"5 Years",
skills:"AC Repair, Electrical, Plumbing",
bio:"Experienced technician specializing in home repair services.",
availability:true

})



function updateField(field,value){

setProfile({
...profile,
[field]:value
})

}



return(

<div className="space-y-10">

{/* HEADER */}

<div>

<h1 className="text-3xl font-bold text-gray-800">

Technician Profile

</h1>

<p className="text-gray-500 mt-2">

Manage your professional technician information

</p>

</div>



{/* PROFILE CARD */}

<motion.div
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
className="bg-white border rounded-xl p-8 shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start"
>

<div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center text-4xl">

👨‍🔧

</div>

<div className="flex-1 text-center md:text-left">

<h2 className="text-xl font-semibold">

{profile.name}

</h2>

<p className="text-gray-500">

{profile.email}

</p>

<p className="text-sm text-gray-400 mt-1">

{profile.city}

</p>

</div>

<button
onClick={()=>setEditing(!editing)}
className="border px-4 py-2 rounded-lg hover:bg-gray-50"
>

{editing ? "Cancel":"Edit Profile"}

</button>

</motion.div>



{/* PROFILE FORM */}

<div className="grid md:grid-cols-2 gap-6">

{/* PHONE */}

<div className="bg-white border rounded-xl p-6">

<label className="text-sm text-gray-500">

Phone

</label>

<input
value={profile.phone}
disabled={!editing}
onChange={(e)=>updateField("phone",e.target.value)}
className="mt-2 w-full border rounded-lg px-4 py-2"
/>

</div>



{/* CITY */}

<div className="bg-white border rounded-xl p-6">

<label className="text-sm text-gray-500">

City

</label>

<input
value={profile.city}
disabled={!editing}
onChange={(e)=>updateField("city",e.target.value)}
className="mt-2 w-full border rounded-lg px-4 py-2"
/>

</div>



{/* EXPERIENCE */}

<div className="bg-white border rounded-xl p-6">

<label className="text-sm text-gray-500">

Experience

</label>

<input
value={profile.experience}
disabled={!editing}
onChange={(e)=>updateField("experience",e.target.value)}
className="mt-2 w-full border rounded-lg px-4 py-2"
/>

</div>



{/* SKILLS */}

<div className="bg-white border rounded-xl p-6">

<label className="text-sm text-gray-500">

Skills

</label>

<input
value={profile.skills}
disabled={!editing}
onChange={(e)=>updateField("skills",e.target.value)}
className="mt-2 w-full border rounded-lg px-4 py-2"
/>

</div>

</div>



{/* BIO */}

<div className="bg-white border rounded-xl p-6">

<label className="text-sm text-gray-500">

About Technician

</label>

<textarea
value={profile.bio}
disabled={!editing}
onChange={(e)=>updateField("bio",e.target.value)}
className="mt-2 w-full border rounded-lg px-4 py-2 h-28"
/>

</div>



{/* AVAILABILITY */}

<div className="bg-white border rounded-xl p-6 flex items-center justify-between">

<div>

<p className="font-medium">

Availability Status

</p>

<p className="text-sm text-gray-500">

Toggle if you are available for jobs

</p>

</div>

<button
onClick={()=>updateField("availability",!profile.availability)}
className={`px-5 py-2 rounded-lg text-white

${profile.availability ? "bg-green-600":"bg-gray-400"}

`}
>

{profile.availability ? "Available":"Offline"}

</button>

</div>



{/* SAVE BUTTON */}

{editing && (

<div>

<button className="bg-indigo-600 text-white px-6 py-3 rounded-lg">

Save Changes

</button>

</div>

)}



{/* PERFORMANCE STATS */}

<div className="grid md:grid-cols-3 gap-6">

<motion.div
whileHover={{scale:1.05}}
className="bg-white border rounded-xl p-6 shadow-sm"
>

<p className="text-gray-500 text-sm">

Completed Jobs

</p>

<p className="text-3xl font-bold mt-2">

146

</p>

</motion.div>



<motion.div
whileHover={{scale:1.05}}
className="bg-white border rounded-xl p-6 shadow-sm"
>

<p className="text-gray-500 text-sm">

Rating

</p>

<p className="text-3xl font-bold mt-2">

4.9 ⭐

</p>

</motion.div>



<motion.div
whileHover={{scale:1.05}}
className="bg-white border rounded-xl p-6 shadow-sm"
>

<p className="text-gray-500 text-sm">

Years Experience

</p>

<p className="text-3xl font-bold mt-2">

5

</p>

</motion.div>

</div>



{/* REVIEWS */}

<div className="bg-white border rounded-xl p-6">

<h3 className="text-lg font-semibold mb-4">

Recent Customer Reviews

</h3>

<div className="space-y-4">

<div className="border p-4 rounded-lg">

<p className="font-medium">

Rahul Sharma

</p>

<p className="text-sm text-gray-500">

Great service and very professional.

</p>

</div>

<div className="border p-4 rounded-lg">

<p className="font-medium">

Priya Patel

</p>

<p className="text-sm text-gray-500">

Quick repair and polite technician.

</p>

</div>

</div>

</div>

</div>

)

}