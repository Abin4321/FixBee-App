import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import { login } from "../../services/auth.js";


export default function Login(){

const navigate = useNavigate()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [showPassword,setShowPassword] = useState(false)
const [remember,setRemember] = useState(false)
const [loading,setLoading] = useState(false)
const [error,setError] = useState("")



/* LOGIN FUNCTION */

async function handleLogin(e) {
  e.preventDefault();

  setError("");

  if (!email || !password) {
    setError("Please enter email and password");
    return;
  }

  try {
    setLoading(true);

    const user = await login(email, password);

    if (user) {
      navigate("/user/dashboard");
    }

  } catch (err) {
    setError(err.message);
  }

  setLoading(false);
}



/* UI */

return(

<div className="min-h-screen flex bg-gradient-to-br from-indigo-50 to-blue-100">

{/* LEFT PANEL */}

<div className="hidden lg:flex w-1/2 items-center justify-center p-12">

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.7}}
className="max-w-md text-center"
>

<h1 className="text-5xl font-bold text-indigo-600 mb-6">

FixBee

</h1>

<p className="text-gray-600 text-lg mb-10">

Your smart home service platform.
Book technicians, manage repairs,
and track services all in one place.

</p>

<div className="space-y-6 text-left">

<div className="flex items-center gap-4">

<div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">

✓

</div>

<p className="text-gray-700">

Easy service booking

</p>

</div>

<div className="flex items-center gap-4">

<div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">

✓

</div>

<p className="text-gray-700">

Professional technicians

</p>

</div>

<div className="flex items-center gap-4">

<div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">

✓

</div>

<p className="text-gray-700">

Live booking updates

</p>

</div>

<div className="flex items-center gap-4">

<div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">

✓

</div>

<p className="text-gray-700">

Secure payments

</p>

</div>

</div>

</motion.div>

</div>



{/* RIGHT PANEL */}

<div className="flex flex-1 items-center justify-center p-8">

<motion.div
initial={{opacity:0,scale:0.95}}
animate={{opacity:1,scale:1}}
transition={{duration:0.5}}
className="bg-white shadow-xl rounded-2xl w-full max-w-md p-10"
>

<h2 className="text-3xl font-bold text-gray-800 mb-2">

Welcome Back

</h2>

<p className="text-gray-500 mb-8">

Login to continue to FixBee

</p>



{/* ERROR */}

{error && (

<div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4">

{error}

</div>

)}



<form onSubmit={handleLogin} className="space-y-5">



{/* EMAIL */}

<div>

<label className="block text-sm text-gray-600 mb-1">

Email

</label>

<input
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
placeholder="you@email.com"
className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
/>

</div>



{/* PASSWORD */}

<div>

<label className="block text-sm text-gray-600 mb-1">

Password

</label>

<div className="relative">

<input
type={showPassword ? "text" : "password"}
value={password}
onChange={(e)=>setPassword(e.target.value)}
placeholder="Enter password"
className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 focus:outline-none focus:border-indigo-500"
/>

<button
type="button"
onClick={()=>setShowPassword(!showPassword)}
className="absolute right-3 top-2 text-gray-500 text-sm"
>

{showPassword ? "Hide" : "Show"}

</button>

</div>

</div>



{/* OPTIONS */}

<div className="flex items-center justify-between text-sm">

<label className="flex items-center gap-2">

<input
type="checkbox"
checked={remember}
onChange={()=>setRemember(!remember)}
/>

Remember me

</label>

<Link
to="/forgot-password"
className="text-indigo-600 hover:underline"
>

Forgot password?

</Link>

</div>



{/* LOGIN BUTTON */}

<motion.button
whileHover={{scale:1.03}}
whileTap={{scale:0.97}}
disabled={loading}
className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
>

{loading ? "Signing in..." : "Login"}

</motion.button>



</form>



{/* DIVIDER */}

<div className="flex items-center gap-3 my-6">

<div className="flex-1 h-px bg-gray-200"></div>

<span className="text-gray-400 text-sm">

OR

</span>

<div className="flex-1 h-px bg-gray-200"></div>

</div>



{/* SOCIAL LOGIN PLACEHOLDER */}

<div className="space-y-3">

<button className="w-full border py-2 rounded-lg hover:bg-gray-50">

Continue with Google

</button>

<button className="w-full border py-2 rounded-lg hover:bg-gray-50">

Continue with GitHub

</button>

</div>



{/* REGISTER LINK */}

<p className="text-center text-sm text-gray-500 mt-6">

Don't have an account?

<Link
to="/register"
className="text-indigo-600 font-semibold ml-1"
>

Create account

</Link>

</p>



</motion.div>

</div>

</div>

)

}