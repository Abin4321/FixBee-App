import { Navigate, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../services/supabase"

export default function ProtectedRoute(){

const [user,setUser] = useState(null)
const [loading,setLoading] = useState(true)

useEffect(()=>{

async function checkUser(){

const { data } = await supabase.auth.getUser()

setUser(data?.user ?? null)
setLoading(false)

}

checkUser()

},[])



if(loading){

return <div className="p-10 text-center">Loading...</div>

}



if(!user){

return <Navigate to="/login"/>

}



return <Outlet/>

}