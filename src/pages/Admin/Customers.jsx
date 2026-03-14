import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getAllCustomers } from "../../services/adminService.js";

export default function AdminCustomers(){

  const [customers,setCustomers] = useState([])
  const [filtered,setFiltered] = useState([])
  const [search,setSearch] = useState("")



  useEffect(()=>{

    async function load(){

      const data = await getCustomers()

      if(data){

        setCustomers(data)
        setFiltered(data)

      }

    }

    load()

  },[])



  useEffect(()=>{

    if(!search){

      setFiltered(customers)
      return

    }

    const temp = customers.filter(c =>
      c.email.toLowerCase().includes(search.toLowerCase())
    )

    setFiltered(temp)

  },[search,customers])



  const totalCustomers = customers.length

  const newCustomers = customers.filter(c => {

    const created = new Date(c.created_at)
    const now = new Date()

    const diff = (now - created) / (1000*60*60*24)

    return diff <= 30

  }).length



  return(

    <div className="space-y-10">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">

          Customer Management

        </h1>

        <p className="text-gray-500 mt-2">

          View and manage platform customers

        </p>

      </div>



      {/* SEARCH */}

      <div>

        <input
          type="text"
          placeholder="Search customer email..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-72"
        />

      </div>



      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white border rounded-xl p-6 shadow-sm">

          <p className="text-gray-500">

            Total Customers

          </p>

          <h2 className="text-3xl font-bold mt-2">

            {totalCustomers}

          </h2>

        </div>



        <div className="bg-white border rounded-xl p-6 shadow-sm">

          <p className="text-gray-500">

            New Customers (30 days)

          </p>

          <h2 className="text-3xl font-bold mt-2">

            {newCustomers}

          </h2>

        </div>



        <div className="bg-white border rounded-xl p-6 shadow-sm">

          <p className="text-gray-500">

            Active Platform Users

          </p>

          <h2 className="text-3xl font-bold mt-2">

            {totalCustomers}

          </h2>

        </div>

      </div>



      {/* CUSTOMER GRID */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filtered.map((customer,index)=>(

          <motion.div
            key={customer.id}
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}
            transition={{delay:index*0.05}}
            className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >

            {/* AVATAR */}

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">

                {customer.email.charAt(0).toUpperCase()}

              </div>

              <div>

                <p className="font-semibold">

                  {customer.email}

                </p>

                <p className="text-xs text-gray-500">

                  Customer ID

                </p>

              </div>

            </div>



            {/* INFO */}

            <div className="mt-6 space-y-2 text-sm">

              <div className="flex justify-between">

                <span className="text-gray-500">

                  Role

                </span>

                <span className="font-medium">

                  {customer.role}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">

                  Joined

                </span>

                <span className="font-medium">

                  {new Date(customer.created_at).toLocaleDateString()}

                </span>

              </div>

            </div>



            {/* ACTIONS */}

            <div className="flex gap-3 mt-6">

              <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm">

                View Profile

              </button>

              <button className="flex-1 border py-2 rounded-lg text-sm">

                Message

              </button>

            </div>

          </motion.div>

        ))}

      </div>



      {/* EMPTY STATE */}

      {filtered.length === 0 && (

        <div className="text-center text-gray-500 py-20">

          No customers found

        </div>

      )}

    </div>

  )

}