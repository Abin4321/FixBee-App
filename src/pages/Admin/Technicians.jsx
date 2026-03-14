import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getAllTechnicians } from "../../services/adminService.js";

export default function AdminTechnicians(){

  const [technicians,setTechnicians] = useState([])
  const [filtered,setFiltered] = useState([])
  const [search,setSearch] = useState("")
  const [loading,setLoading] = useState(true)



  useEffect(()=>{

    loadTechnicians()

  },[])



  async function loadTechnicians(){

    const data = await getTechnicians()

    if(data){

      const techWithStats = await Promise.all(

        data.map(async tech => {

          const { count } = await supabase
            .from("bookings")
            .select("*",{count:"exact",head:true})
            .eq("technician_id",tech.id)

          return {
            ...tech,
            jobs:count || 0
          }

        })

      )

      setTechnicians(techWithStats)
      setFiltered(techWithStats)

    }

    setLoading(false)

  }



  /* SEARCH */

  useEffect(()=>{

    if(!search){

      setFiltered(technicians)
      return

    }

    const temp = technicians.filter(t =>
      t.email.toLowerCase().includes(search.toLowerCase())
    )

    setFiltered(temp)

  },[search,technicians])



  const total = technicians.length

  const activeTech = technicians.filter(t => t.jobs > 0).length



  return(

    <div className="space-y-10">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">

          Technician Management

        </h1>

        <p className="text-gray-500 mt-2">

          Manage technicians and monitor their workload

        </p>

      </div>



      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white border p-6 rounded-xl shadow-sm">

          <p className="text-gray-500 text-sm">

            Total Technicians

          </p>

          <p className="text-3xl font-bold mt-2">

            {total}

          </p>

        </div>

        <div className="bg-white border p-6 rounded-xl shadow-sm">

          <p className="text-gray-500 text-sm">

            Active Technicians

          </p>

          <p className="text-3xl font-bold mt-2">

            {activeTech}

          </p>

        </div>

        <div className="bg-white border p-6 rounded-xl shadow-sm">

          <p className="text-gray-500 text-sm">

            Idle Technicians

          </p>

          <p className="text-3xl font-bold mt-2">

            {total - activeTech}

          </p>

        </div>

      </div>



      {/* SEARCH */}

      <div>

        <input
          placeholder="Search technician..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-72"
        />

      </div>



      {/* TECHNICIAN GRID */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filtered.map((tech,index)=>(

          <motion.div
            key={tech.id}
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}
            transition={{delay:index*0.05}}
            className="bg-white border rounded-xl shadow-sm p-6 space-y-4"
          >

            {/* HEADER */}

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">

                {tech.email.charAt(0).toUpperCase()}

              </div>

              <div>

                <p className="font-semibold">

                  {tech.email}

                </p>

                <p className="text-xs text-gray-500">

                  Technician ID

                </p>

              </div>

            </div>



            {/* SKILLS */}

            <div>

              <p className="text-sm text-gray-500 mb-2">

                Skills

              </p>

              <div className="flex flex-wrap gap-2">

                {tech.skills?.map((skill,i)=>(

                  <span
                    key={i}
                    className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full"
                  >

                    {skill}

                  </span>

                ))}

              </div>

            </div>



            {/* JOBS */}

            <div className="flex justify-between items-center">

              <p className="text-sm text-gray-500">

                Completed Jobs

              </p>

              <p className="font-semibold">

                {tech.jobs}

              </p>

            </div>



            {/* ACTIONS */}

            <div className="flex gap-3">

              <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm">

                View Profile

              </button>

              <button className="flex-1 border py-2 rounded-lg text-sm">

                Assign Job

              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </div>

  )

}