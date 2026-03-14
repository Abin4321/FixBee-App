import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getDashboardStats, getRecentBookings } from "../../services/adminService.js";

export default function Dashboard(){

  const [stats,setStats] = useState({
    bookings:0,
    customers:0,
    technicians:0,
    services:0
  })

  const [recentBookings,setRecentBookings] = useState([])
  const [loading,setLoading] = useState(true)



  useEffect(()=>{

    async function load(){

      try{

        const statData = await getDashboardStats()
        const bookingData = await getRecentBookings()

        if(statData) setStats(statData)
        if(bookingData) setRecentBookings(bookingData)

      }catch(err){

        console.error(err)

      }finally{

        setLoading(false)

      }

    }

    load()

  },[])



  const statCards = [

    {
      title:"Total Bookings",
      value:stats.bookings,
      gradient:"from-indigo-500 to-blue-500"
    },

    {
      title:"Customers",
      value:stats.customers,
      gradient:"from-purple-500 to-pink-500"
    },

    {
      title:"Technicians",
      value:stats.technicians,
      gradient:"from-green-500 to-emerald-500"
    },

    {
      title:"Services",
      value:stats.services,
      gradient:"from-orange-500 to-red-500"
    }

  ]



  return(

    <div className="space-y-10">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">

          Admin Dashboard

        </h1>

        <p className="text-gray-500 mt-2">

          Monitor FixBee platform analytics and system activity

        </p>

      </div>



      {/* STAT CARDS */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {statCards.map((card,index)=>(

          <motion.div
            key={index}
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}
            transition={{delay:index*0.1}}
            whileHover={{scale:1.05}}
            className={`p-6 rounded-2xl bg-gradient-to-r ${card.gradient} text-white shadow-lg`}
          >

            <p className="text-sm opacity-90">

              {card.title}

            </p>

            <h2 className="text-3xl font-bold mt-3">

              {card.value}

            </h2>

          </motion.div>

        ))}

      </div>



      {/* MAIN GRID */}

      <div className="grid lg:grid-cols-3 gap-8">

        {/* RECENT BOOKINGS */}

        <div className="lg:col-span-2 bg-white border rounded-xl shadow-sm">

          <div className="p-6 border-b">

            <h2 className="text-lg font-semibold">

              Recent Bookings

            </h2>

          </div>



          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-gray-50">

                <tr>

                  <th className="text-left p-4">Service</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Price</th>

                </tr>

              </thead>

              <tbody>

                {recentBookings.map((b)=>{

                  const statusColor =
                    b.status === "pending"
                      ? "bg-yellow-500"
                      : b.status === "assigned"
                      ? "bg-blue-500"
                      : "bg-green-500"

                  return(

                    <tr
                      key={b.id}
                      className="border-b hover:bg-gray-50 transition"
                    >

                      <td className="p-4 font-medium">

                        {b.service}

                      </td>

                      <td className="p-4">

                        <span className={`px-3 py-1 text-xs text-white rounded-full ${statusColor}`}>

                          {b.status}

                        </span>

                      </td>

                      <td className="p-4">

                        {new Date(b.created_at).toLocaleDateString()}

                      </td>

                      <td className="p-4 font-semibold">

                        ₹{b.price}

                      </td>

                    </tr>

                  )

                })}

              </tbody>

            </table>

          </div>

        </div>



        {/* ACTIVITY PANEL */}

        <div className="bg-white border rounded-xl shadow-sm p-6">

          <h2 className="text-lg font-semibold mb-4">

            System Activity

          </h2>

          <div className="space-y-3">

            <motion.div
              initial={{opacity:0,x:20}}
              animate={{opacity:1,x:0}}
              className="p-3 rounded-lg bg-gray-50"
            >
              New booking created
            </motion.div>

            <motion.div
              initial={{opacity:0,x:20}}
              animate={{opacity:1,x:0}}
              transition={{delay:0.1}}
              className="p-3 rounded-lg bg-gray-50"
            >
              Technician assigned
            </motion.div>

            <motion.div
              initial={{opacity:0,x:20}}
              animate={{opacity:1,x:0}}
              transition={{delay:0.2}}
              className="p-3 rounded-lg bg-gray-50"
            >
              Customer registered
            </motion.div>

            <motion.div
              initial={{opacity:0,x:20}}
              animate={{opacity:1,x:0}}
              transition={{delay:0.3}}
              className="p-3 rounded-lg bg-gray-50"
            >
              Service completed
            </motion.div>

          </div>

        </div>

      </div>



      {/* QUICK ACTIONS */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white border p-6 rounded-xl shadow-sm">

          <h3 className="font-semibold">

            Add New Service

          </h3>

          <p className="text-gray-500 text-sm mt-2">

            Create new services customers can book

          </p>

          <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg">

            Add Service

          </button>

        </div>



        <div className="bg-white border p-6 rounded-xl shadow-sm">

          <h3 className="font-semibold">

            Assign Technician

          </h3>

          <p className="text-gray-500 text-sm mt-2">

            Assign technicians to pending bookings

          </p>

          <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg">

            Assign

          </button>

        </div>



        <div className="bg-white border p-6 rounded-xl shadow-sm">

          <h3 className="font-semibold">

            Send Notification

          </h3>

          <p className="text-gray-500 text-sm mt-2">

            Notify customers about updates

          </p>

          <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg">

            Send

          </button>

        </div>

      </div>



      {/* SERVICE PERFORMANCE */}

      <div className="bg-white border rounded-xl shadow-sm p-6">

        <h2 className="text-lg font-semibold mb-6">

          Service Performance

        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="p-4 rounded-lg bg-gray-50">

            <p className="text-sm text-gray-500">Plumbing</p>
            <p className="text-2xl font-bold">45</p>

          </div>

          <div className="p-4 rounded-lg bg-gray-50">

            <p className="text-sm text-gray-500">Electrical</p>
            <p className="text-2xl font-bold">32</p>

          </div>

          <div className="p-4 rounded-lg bg-gray-50">

            <p className="text-sm text-gray-500">AC Repair</p>
            <p className="text-2xl font-bold">27</p>

          </div>

          <div className="p-4 rounded-lg bg-gray-50">

            <p className="text-sm text-gray-500">Cleaning</p>
            <p className="text-2xl font-bold">21</p>

          </div>

        </div>

      </div>

    </div>

  )

}