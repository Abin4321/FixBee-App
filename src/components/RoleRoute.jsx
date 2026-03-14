import { Navigate, Outlet } from "react-router-dom"
import { useEffect,useState } from "react"
import { supabase } from "../services/supabase"

export default function RoleRoute({ role }){

const [allowed,setAllowed] = useState(null)



useEffect(()=>{

async function checkRole(){

const { data:{ user } } = await supabase.auth.getUser()

if(!user){

setAllowed(false)
return

}



const { data } = await supabase

.from("profiles")

.select("role")

.eq("id",user.id)

.single()



if(data?.role === role){

setAllowed(true)

}else{

setAllowed(false)

}

}



checkRole()

},[role])



if(allowed === null){

return <div className="p-10 text-center">Loading...</div>

}



if(!allowed){

return <Navigate to="/unauthorized"/>

}



return <Outlet/>

}