import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Unauthorized(){

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-6">

<div className="max-w-3xl w-full text-center space-y-10">

{/* ICON */}

<motion.div
initial={{scale:0}}
animate={{scale:1}}
transition={{duration:0.5}}
className="w-28 h-28 bg-red-100 rounded-full flex items-center justify-center mx-auto text-4xl"
>

🔒

</motion.div>



{/* TITLE */}

<motion.h1
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:0.2}}
className="text-4xl font-bold text-gray-800"
>

Access Denied

</motion.h1>



{/* MESSAGE */}

<motion.p
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:0.4}}
className="text-gray-500 max-w-xl mx-auto"
>

You don't have permission to access this page.
This area may be restricted to administrators
or specific user roles.

</motion.p>



{/* ACTION BUTTONS */}

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:0.6}}
className="flex flex-wrap justify-center gap-4"
>

<Link
to="/dashboard"
className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
>

Go to Dashboard

</Link>

<Link
to="/services"
className="border px-6 py-3 rounded-lg hover:bg-gray-50 transition"
>

Browse Services

</Link>

<Link
to="/"
className="border px-6 py-3 rounded-lg hover:bg-gray-50 transition"
>

Back Home

</Link>

</motion.div>



{/* HELP CARDS */}

<div className="grid md:grid-cols-3 gap-6 pt-10">

<motion.div
whileHover={{scale:1.05}}
className="bg-white p-6 rounded-xl shadow-sm border"
>

<h3 className="font-semibold mb-2">

Customer Area

</h3>

<p className="text-sm text-gray-500 mb-4">

Book services and track technician visits.

</p>

<Link
to="/services"
className="text-indigo-600 text-sm font-medium"
>

Explore →

</Link>

</motion.div>



<motion.div
whileHover={{scale:1.05}}
className="bg-white p-6 rounded-xl shadow-sm border"
>

<h3 className="font-semibold mb-2">

Technician Panel

</h3>

<p className="text-sm text-gray-500 mb-4">

View assigned bookings and manage jobs.

</p>

<Link
to="/worker/dashboard"
className="text-indigo-600 text-sm font-medium"
>

Technician Dashboard →

</Link>

</motion.div>



<motion.div
whileHover={{scale:1.05}}
className="bg-white p-6 rounded-xl shadow-sm border"
>

<h3 className="font-semibold mb-2">

Need Help?

</h3>

<p className="text-sm text-gray-500 mb-4">

Contact support if you think this is a mistake.

</p>

<Link
to="/chat"
className="text-indigo-600 text-sm font-medium"
>

Contact Support →

</Link>

</motion.div>

</div>



{/* BACKGROUND SECURITY ANIMATION */}

<motion.div
animate={{rotate:360}}
transition={{repeat:Infinity,duration:25,linear:true}}
className="absolute top-24 left-10 w-24 h-24 border border-red-200 rounded-full"
/>

<motion.div
animate={{rotate:-360}}
transition={{repeat:Infinity,duration:30,linear:true}}
className="absolute bottom-24 right-10 w-32 h-32 border border-indigo-200 rounded-full"
/>

</div>

</div>

)

}