import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getAllBookings } from "../../services/adminService.js";

export default function AdminBookings(){

  const [bookings,setBookings] = useState([])
  const [filtered,setFiltered] = useState([])

  const [search,setSearch] = useState("")
  const [statusFilter,setStatusFilter] = useState("all")



  useEffect(()=>{

    async function load(){

      const data = await getAllBookings()

      if(data){

        setBookings(data)
        setFiltered(data)

      }

    }

    load()

  },[])



  useEffect(()=>{

    let temp = [...bookings]



    if(statusFilter !== "all"){

      temp = temp.filter(b => b.status === statusFilter)

    }



    if(search){

      temp = temp.filter(b =>
        b.service.toLowerCase().includes(search.toLowerCase())
      )

    }

    setFiltered(temp)

  },[search,statusFilter,bookings])



  function changeStatus(id,newStatus){

    const updated = bookings.map(b =>
      b.id === id ? {...b,status:newStatus} : b
    )

    setBookings(updated)

  }



  const pending = bookings.filter(b => b.status === "pending").length
  const assigned = bookings.filter(b => b.status === "assigned").length
  const completed = bookings.filter(b => b.status === "completed").length



  return(

    <div className="space-y-8">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">

          Booking Management

        </h1>

        <p className="text-gray-500 mt-2">

          Monitor and manage all customer bookings

        </p>

      </div>



      {/* FILTERS */}

      <div className="flex flex-wrap gap-4">

        <input
          type="text"
          placeholder="Search service..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-64"
        />

        <select
          value={statusFilter}
          onChange={(e)=>setStatusFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >

          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="completed">Completed</option>

        </select>

      </div>



      {/* BOOKINGS TABLE */}

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Service</th>
              <th className="p-4 text-left">Customer ID</th>
              <th className="p-4 text-left">Technician</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>

            </tr>

          </thead>



          <tbody>

            {filtered.map((b)=>(

              <motion.tr
                key={b.id}
                initial={{opacity:0}}
                animate={{opacity:1}}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4 font-medium">

                  {b.service}

                </td>



                <td className="p-4 text-gray-600">

                  {b.user_id}

                </td>



                <td className="p-4">

                  {b.technician_id || "Not Assigned"}

                </td>



                <td className="p-4">

                  ₹{b.price}

                </td>



                <td className="p-4">

                  {b.service_date}

                </td>



                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${b.status === "pending" && "bg-yellow-100 text-yellow-700"}
                    ${b.status === "assigned" && "bg-blue-100 text-blue-700"}
                    ${b.status === "completed" && "bg-green-100 text-green-700"}
                    `}
                  >

                    {b.status}

                  </span>

                </td>



                <td className="p-4 flex gap-2">

                  <button
                    onClick={()=>changeStatus(b.id,"assigned")}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-xs"
                  >

                    Assign

                  </button>

                  <button
                    onClick={()=>changeStatus(b.id,"completed")}
                    className="px-3 py-1 bg-green-600 text-white rounded text-xs"
                  >

                    Complete

                  </button>

                </td>



              </motion.tr>

            ))}

          </tbody>

        </table>

      </div>



      {/* SUMMARY */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white border rounded-xl p-6">

          <p className="text-gray-500">

            Pending Bookings

          </p>

          <h2 className="text-3xl font-bold mt-2">

            {pending}

          </h2>

        </div>



        <div className="bg-white border rounded-xl p-6">

          <p className="text-gray-500">

            Assigned

          </p>

          <h2 className="text-3xl font-bold mt-2">

            {assigned}

          </h2>

        </div>



        <div className="bg-white border rounded-xl p-6">

          <p className="text-gray-500">

            Completed

          </p>

          <h2 className="text-3xl font-bold mt-2">

            {completed}

          </h2>

        </div>

      </div>

    </div>

  )

}