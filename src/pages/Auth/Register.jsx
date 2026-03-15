import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import { signUp } from "../../services/auth.js";

export default function Register(){

const navigate = useNavigate()

/* FORM STATES */

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [confirmPassword,setConfirmPassword] = useState("")
const [role,setRole] = useState("customer")
const [skills,setSkills] = useState("")
const [avatar,setAvatar] = useState(null)
const [preview,setPreview] = useState(null)
const [terms,setTerms] = useState(false)

const [loading,setLoading] = useState(false)
const [error,setError] = useState("")
const [success,setSuccess] = useState("")



/* PASSWORD STRENGTH */

function passwordStrength(){

if(password.length < 6) return "weak"
if(password.length < 10) return "medium"
return "strong"

}



/* AVATAR UPLOAD */

function handleAvatar(e){

const file = e.target.files[0]

if(file){

setAvatar(file)

const reader = new FileReader()

reader.onload = () => setPreview(reader.result)

reader.readAsDataURL(file)

}

}



/* REGISTER FUNCTION */

async function handleRegister(e){

e.preventDefault()

setError("")
setSuccess("")

if(!email || !password){

setError("Please fill required fields")
return

}

if(password !== confirmPassword){

setError("Passwords do not match")
return

}

if(!terms){

setError("You must accept the terms")
return

}

try{

setLoading(true)

await signUp(email, password, {
  role,
  skills: skills.split(",").map(s => s.trim())
});

setSuccess("Account created successfully!")

setTimeout(()=>{
navigate("/login")
},1500)

}catch(err){

setError(err.message)

}

setLoading(false)

}



/* UI */

return(

<div className="min-h-screen flex bg-gradient-to-br from-indigo-50 to-blue-100">



{/* LEFT SIDE */}

<div className="hidden lg:flex w-1/2 items-center justify-center p-12">

<motion.div
initial={{opacity:0,x:-40}}
animate={{opacity:1,x:0}}
transition={{duration:0.7}}
className="max-w-md"
>

<h1 className="text-5xl font-bold text-indigo-600 mb-6">

Join FixBee

</h1>

<p className="text-gray-600 mb-10">

Create your account and start booking
trusted home service professionals.

</p>

<div className="space-y-6">

<div className="flex gap-4">

<div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">

✓

</div>

<p>

Quick service booking

</p>

</div>

<div className="flex gap-4">

<div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">

✓

</div>

<p>

Verified technicians

</p>

</div>

<div className="flex gap-4">

<div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">

✓

</div>

<p>

Secure payments and notifications

</p>

</div>

<div className="flex gap-4">

<div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">

✓

</div>

<p>

Track service progress live

</p>

</div>

</div>

</motion.div>

</div>



{/* REGISTER FORM */}

<div className="flex flex-1 items-center justify-center p-8">

<motion.div
initial={{opacity:0,scale:0.95}}
animate={{opacity:1,scale:1}}
transition={{duration:0.5}}
className="bg-white shadow-xl rounded-2xl w-full max-w-md p-10"
>

<h2 className="text-3xl font-bold mb-2">

Create Account

</h2>

<p className="text-gray-500 mb-8">

Register to start using FixBee

</p>



{error && (

<div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-4 text-sm">

{error}

</div>

)}



{success && (

<div className="bg-green-50 border border-green-200 text-green-600 p-3 rounded-lg mb-4 text-sm">

{success}

</div>

)}



<form onSubmit={handleRegister} className="space-y-5">



{/* AVATAR */}

<div className="flex items-center gap-4">

<div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">

{preview ? (

<img src={preview} alt="avatar"/>

) : (

<span className="text-gray-400 text-sm">

Avatar

</span>

)}

</div>

<input type="file" onChange={handleAvatar} />

</div>



{/* EMAIL */}

<div>

<label className="text-sm text-gray-600">

Email

</label>

<input
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full border px-4 py-2 rounded-lg"
/>

</div>



{/* PASSWORD */}

<div>

<label className="text-sm text-gray-600">

Password

</label>

<input
type="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full border px-4 py-2 rounded-lg"
/>

{/* PASSWORD STRENGTH */}

<div className="mt-2 text-xs">

Strength: 

<span className={`ml-1 ${
passwordStrength()==="weak"?"text-red-500":
passwordStrength()==="medium"?"text-yellow-500":
"text-green-600"
}`}>

{passwordStrength()}

</span>

</div>

</div>



{/* CONFIRM PASSWORD */}

<div>

<label className="text-sm text-gray-600">

Confirm Password

</label>

<input
type="password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
className="w-full border px-4 py-2 rounded-lg"
/>

</div>



{/* ROLE */}

<div>

<label className="text-sm text-gray-600">

Account Type

</label>

<select
value={role}
onChange={(e)=>setRole(e.target.value)}
className="w-full border px-4 py-2 rounded-lg"
>

<option value="customer">

Customer

</option>

<option value="technician">

Technician

</option>

</select>

</div>



{/* TECHNICIAN SKILLS */}

{role === "technician" && (

<div>

<label className="text-sm text-gray-600">

Skills (comma separated)

</label>

<input
placeholder="Plumbing, Electrical..."
value={skills}
onChange={(e)=>setSkills(e.target.value)}
className="w-full border px-4 py-2 rounded-lg"
/>

</div>

)}



{/* TERMS */}

<label className="flex items-center gap-2 text-sm">

<input
type="checkbox"
checked={terms}
onChange={()=>setTerms(!terms)}
/>

I agree to the Terms & Privacy Policy

</label>



{/* SUBMIT */}

<motion.button
whileHover={{scale:1.03}}
whileTap={{scale:0.97}}
disabled={loading}
className="w-full bg-indigo-600 text-white py-3 rounded-lg"
>

{loading ? "Creating account..." : "Create Account"}

</motion.button>



</form>



<p className="text-center text-sm text-gray-500 mt-6">

Already have an account?

<Link to="/login" className="text-indigo-600 ml-1">

Login

</Link>

</p>



</motion.div>

</div>

</div>

)

}