import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getAllBookings } from "../../services/adminService.js";

import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
  BarChart, Bar, PieChart, Pie
} from "recharts";

export default function Analytics(){

  const [bookingData,setBookingData] = useState([])
  const [serviceData,setServiceData] = useState([])
  const [revenueData,setRevenueData] = useState([])



  useEffect(()=>{

    loadAnalytics()

  },[])



  async function loadAnalytics(){

    const { data:bookings } = await supabase
      .from("bookings")
      .select("*")



    if(!bookings) return



    /* BOOKINGS PER MONTH */

    const monthly = {}

    bookings.forEach(b=>{

      const date = new Date(b.created_at)
      const month = date.toLocaleString("default",{month:"short"})

      if(!monthly[month]) monthly[month] = 0

      monthly[month]++

    })



    const bookingChart = Object.keys(monthly).map(m=>({

      month:m,
      bookings:monthly[m]

    }))

    setBookingData(bookingChart)



    /* SERVICE POPULARITY */

    const services = {}

    bookings.forEach(b=>{

      if(!services[b.service]) services[b.service] = 0

      services[b.service]++

    })



    const serviceChart = Object.keys(services).map(s=>({

      name:s,
      value:services[s]

    }))

    setServiceData(serviceChart)



    /* REVENUE */

    const revenue = {}

    bookings.forEach(b=>{

      const date = new Date(b.created_at)
      const month = date.toLocaleString("default",{month:"short"})

      if(!revenue[month]) revenue[month] = 0

      revenue[month] += Number(b.price || 0)

    })



    const revenueChart = Object.keys(revenue).map(m=>({

      month:m,
      revenue:revenue[m]

    }))

    setRevenueData(revenueChart)

  }



  const colors = [
    "#6366F1",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6"
  ]



  return(

    <div className="space-y-10">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">

          Platform Analytics

        </h1>

        <p className="text-gray-500 mt-2">

          Monitor bookings, revenue and service performance

        </p>

      </div>



      {/* BOOKING CHART */}

      <motion.div
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        className="bg-white border rounded-xl shadow-sm p-6"
      >

        <h2 className="font-semibold mb-6">

          Booking Growth

        </h2>

        <div className="h-72">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={bookingData}>

              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis dataKey="month"/>

              <YAxis/>

              <Tooltip/>

              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#6366F1"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </motion.div>



      {/* CHART GRID */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* SERVICE POPULARITY */}

        <motion.div
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          className="bg-white border rounded-xl shadow-sm p-6"
        >

          <h2 className="font-semibold mb-6">

            Service Popularity

          </h2>

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={serviceData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                >

                  {serviceData.map((entry,index)=>(
                    <Cell
                      key={index}
                      fill={colors[index % colors.length]}
                    />
                  ))}

                </Pie>

                <Tooltip/>

              </PieChart>

            </ResponsiveContainer>

          </div>

        </motion.div>



        {/* REVENUE */}

        <motion.div
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          className="bg-white border rounded-xl shadow-sm p-6"
        >

          <h2 className="font-semibold mb-6">

            Revenue Analytics

          </h2>

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={revenueData}>

                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis dataKey="month"/>

                <YAxis/>

                <Tooltip/>

                <Bar
                  dataKey="revenue"
                  fill="#10B981"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </motion.div>

      </div>

    </div>

  )

}