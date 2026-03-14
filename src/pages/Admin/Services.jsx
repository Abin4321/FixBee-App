import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getAllServices, addService } from "../../services/adminService.js";

export default function AdminServices(){

  const [services,setServices] = useState([])
  const [filtered,setFiltered] = useState([])
  const [search,setSearch] = useState("")

  const [name,setName] = useState("")
  const [price,setPrice] = useState("")

  const [loading,setLoading] = useState(true)



  /* LOAD SERVICES */

  useEffect(()=>{

    async function load(){

      const data = await getServices()

      if(data){

        setServices(data)
        setFiltered(data)

      }

      setLoading(false)

    }

    load()

  },[])



  /* SEARCH */

  useEffect(()=>{

    if(!search){

      setFiltered(services)
      return

    }

    const temp = services.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase())
    )

    setFiltered(temp)

  },[search,services])



  /* ADD SERVICE */

  async function createService(){

    if(!name || !price) return

    const newService = {
      name,
      price:parseInt(price),
      active:true
    }

    const data = await addService(newService)

    if(data){

      setServices([...services,data[0]])

      setName("")
      setPrice("")

    }

  }



  /* TOGGLE SERVICE */

  async function toggleService(service){

    const { data } = await supabase
      .from("services")
      .update({active:!service.active})
      .eq("id",service.id)
      .select()

    if(data){

      const updated = services.map(s =>
        s.id === service.id ? data[0] : s
      )

      setServices(updated)

    }

  }



  const activeCount = services.filter(s=>s.active).length
  const inactiveCount = services.filter(s=>!s.active).length



  return(

    <div className="space-y-10">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">

          Service Management

        </h1>

        <p className="text-gray-500 mt-2">

          Create and manage services available on FixBee

        </p>

      </div>



      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white border p-6 rounded-xl shadow-sm">

          <p className="text-gray-500 text-sm">

            Total Services

          </p>

          <p className="text-3xl font-bold mt-2">

            {services.length}

          </p>

        </div>

        <div className="bg-white border p-6 rounded-xl shadow-sm">

          <p className="text-gray-500 text-sm">

            Active Services

          </p>

          <p className="text-3xl font-bold mt-2">

            {activeCount}

          </p>

        </div>

        <div className="bg-white border p-6 rounded-xl shadow-sm">

          <p className="text-gray-500 text-sm">

            Disabled Services

          </p>

          <p className="text-3xl font-bold mt-2">

            {inactiveCount}

          </p>

        </div>

      </div>



      {/* CREATE SERVICE */}

      <div className="bg-white border rounded-xl shadow-sm p-6 space-y-4">

        <h2 className="font-semibold">

          Add New Service

        </h2>

        <div className="flex gap-4 flex-wrap">

          <input
            placeholder="Service Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          />

          <input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          />

          <button
            onClick={createService}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
          >

            Add Service

          </button>

        </div>

      </div>



      {/* SEARCH */}

      <div>

        <input
          placeholder="Search service..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-72"
        />

      </div>



      {/* SERVICES GRID */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filtered.map((service,index)=>(

          <motion.div
            key={service.id}
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}
            transition={{delay:index*0.05}}
            className="bg-white border rounded-xl shadow-sm p-6 space-y-4"
          >

            <div className="flex justify-between items-center">

              <h3 className="font-semibold">

                {service.name}

              </h3>

              <span className={`text-xs px-3 py-1 rounded-full
                ${service.active
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"}
              `}>

                {service.active ? "Active" : "Disabled"}

              </span>

            </div>



            <p className="text-2xl font-bold">

              ₹{service.price}

            </p>



            <div className="flex gap-3">

              <button
                onClick={()=>toggleService(service)}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm"
              >

                {service.active ? "Disable" : "Enable"}

              </button>

              <button className="flex-1 border py-2 rounded-lg text-sm">

                Edit

              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </div>

  )

}