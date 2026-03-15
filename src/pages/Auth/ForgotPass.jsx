import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import { sendPasswordResetEmail } from "../../services/auth.js";

export default function ForgotPassword(){

const [email,setEmail] = useState("")
const [loading,setLoading] = useState(false)
const [error,setError] = useState("")
const [success,setSuccess] = useState(false)



/* RESET FUNCTION */

async function handleReset(e){

e.preventDefault()

setError("")

if(!email){

setError("Please enter your email")
return

}

try{

setLoading(true)

await sendPasswordResetEmail(email)

setSuccess(true)

}catch(err){

setError(err.message)

}

setLoading(false)

}



/* SUCCESS SCREEN */

if(success){

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-6">

<motion.div
initial={{opacity:0,scale:0.9}}
animate={{opacity:1,scale:1}}
className="bg-white rounded-2xl shadow-xl max-w-md w-full p-10 text-center"
>

<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">

✓

</div>

<h2 className="text-2xl font-bold mb-3">

Check Your Email

</h2>

<p className="text-gray-500 mb-6">

If an account exists for <b>{email}</b>,
a password reset link has been sent.

</p>

<p className="text-sm text-gray-400 mb-8">

Please check your inbox and follow the
instructions to reset your password.

</p>

<div className="space-y-3">

<Link
to="/login"
className="block w-full bg-indigo-600 text-white py-3 rounded-lg"
>

Back to Login

</Link>

<button
onClick={()=>setSuccess(false)}
className="w-full border py-3 rounded-lg"
>

Send Again

</button>

</div>

</motion.div>

</div>

)

}



/* MAIN UI */

return(

<div className="min-h-screen flex bg-gradient-to-br from-indigo-50 to-blue-100">



{/* LEFT INFO PANEL */}

<div className="hidden lg:flex w-1/2 items-center justify-center p-12">

<motion.div
initial={{opacity:0,x:-40}}
animate={{opacity:1,x:0}}
transition={{duration:0.7}}
className="max-w-md"
>

<h1 className="text-5xl font-bold text-indigo-600 mb-6">

FixBee

</h1>

<p className="text-gray-600 mb-10">

Forgot your password?  
No worries. We’ll help you recover your account
and get back to managing your services.

</p>



<div className="space-y-6">

<div className="flex gap-4">

<div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">

✓

</div>

<p>

Secure password recovery

</p>

</div>

<div className="flex gap-4">

<div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">

✓

</div>

<p>

Quick reset instructions

</p>

</div>

<div className="flex gap-4">

<div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">

✓

</div>

<p>

Account security protection

</p>

</div>

</div>

</motion.div>

</div>



{/* FORM */}

<div className="flex flex-1 items-center justify-center p-8">

<motion.div
initial={{opacity:0,scale:0.95}}
animate={{opacity:1,scale:1}}
transition={{duration:0.5}}
className="bg-white shadow-xl rounded-2xl w-full max-w-md p-10"
>

<h2 className="text-3xl font-bold mb-2">

Reset Password

</h2>

<p className="text-gray-500 mb-8">

Enter your email and we’ll send a reset link.

</p>



{error && (

<div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-4 text-sm">

{error}

</div>

)}



<form onSubmit={handleReset} className="space-y-5">

<div>

<label className="text-sm text-gray-600">

Email Address

</label>

<input
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
placeholder="you@email.com"
className="w-full border px-4 py-2 rounded-lg"
/>

</div>



<motion.button
whileHover={{scale:1.03}}
whileTap={{scale:0.97}}
disabled={loading}
className="w-full bg-indigo-600 text-white py-3 rounded-lg"
>

{loading ? "Sending..." : "Send Reset Link"}

</motion.button>

</form>



<div className="mt-6 text-center text-sm text-gray-500">

Remember your password?

<Link
to="/login"
className="text-indigo-600 ml-1"
>

Back to Login

</Link>

</div>



</motion.div>

</div>

</div>

)

}