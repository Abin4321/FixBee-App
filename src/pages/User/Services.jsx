import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { getAllServices } from "../../services/adminService.js";
import { getCurrentUser } from "../../services/auth.js";
import { Search, Wrench, IndianRupee } from "lucide-react";

export default function Services() {

  const navigate = useNavigate();

  const [services,setServices] = useState([]);
  const [filtered,setFiltered] = useState([]);
  const [loading,setLoading] = useState(true);
  const [search,setSearch] = useState("");

  /* ---------------------------
     FETCH SERVICES
  ----------------------------*/

  useEffect(()=>{
    fetchServices()
  },[])

  async function fetchServices(){

    const {data,error} = await supabase
    .from("services")
    .select("*")
    .eq("active",true)

    if(error){
      console.log(error)
      return
    }

    setServices(data)
    setFiltered(data)
    setLoading(false)

  }

  /* ---------------------------
     SEARCH FILTER
  ----------------------------*/

  useEffect(()=>{

    if(!search){
      setFiltered(services)
      return
    }

    const result = services.filter(
      s => s.name
      .toLowerCase()
      .includes(search.toLowerCase())
    )

    setFiltered(result)

  },[search,services])

  /* ---------------------------
     LOADING
  ----------------------------*/

  if(loading){
    return(
      <div className="p-10 text-center text-gray-500">
        Loading services...
      </div>
    )
  }

  return (

    <div className="p-8 space-y-8">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold">
          Services
        </h1>

        <p className="text-gray-500">
          Browse and book professional services
        </p>

      </div>

      {/* SEARCH BAR */}

      <div className="flex items-center border rounded-lg px-4 py-2 max-w-md">

        <Search size={18}/>

        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="ml-2 w-full outline-none"
        />

      </div>

      {/* EMPTY STATE */}

      {filtered.length===0 && (

        <div className="text-center py-20 text-gray-400">

          <Wrench size={40} className="mx-auto mb-3"/>

          <p>No services available</p>

        </div>

      )}

      {/* SERVICES GRID */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filtered.map(service => (

          <motion.div
            key={service.id}
            whileHover={{scale:1.05}}
            className="bg-white p-6 rounded-xl shadow space-y-4"
          >

            {/* ICON */}

            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">

              <Wrench size={22}/>

            </div>

            {/* NAME */}

            <h3 className="text-lg font-semibold">
              {service.name}
            </h3>

            {/* PRICE */}

            <div className="flex items-center gap-1 text-gray-700">

              <IndianRupee size={16}/>

              <span className="font-semibold">
                {service.price}
              </span>

            </div>

            {/* DESCRIPTION */}

            <p className="text-sm text-gray-500">
              Professional {service.name.toLowerCase()} service by
              verified technicians.
            </p>

            {/* BOOK BUTTON */}

            <button
              onClick={()=>navigate("/user/book")}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Book Service
            </button>

          </motion.div>

        ))}

      </div>

    </div>

  )

}