import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import AdminNavbar from "../../components/AdminNavbar";
import Container from "../../components/Container";
import Footer from "../../components/Footer";

 export default function AdminLayout() {

  return (

    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">

      {/* BACKGROUND VISUAL EFFECTS */}

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">

        <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-300 opacity-20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-300 opacity-20 blur-3xl rounded-full"></div>

        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-300 opacity-20 blur-3xl rounded-full"></div>

      </div>



      {/* NAVBAR */}

      <div className="relative z-10">

        <AdminNavbar />

      </div>



      {/* MAIN CONTENT AREA */}

      <main className="flex-1 relative z-10">

        <Container>

          <div className="py-10 space-y-10">



            {/* PAGE HEADER AREA */}

            <motion.div
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.4 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row md:items-center md:justify-between"
            >

              <div>

                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">

                  FixBee Admin Panel

                </h1>

                <p className="text-gray-500 mt-2">

                  Manage bookings, technicians, services and platform analytics

                </p>

              </div>



              <div className="mt-6 md:mt-0 flex items-center gap-4">

                <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-medium">

                  Platform Status: Active

                </div>

                <div className="bg-green-50 text-green-600 px-4 py-2 rounded-xl text-sm font-medium">

                  Server Healthy

                </div>

              </div>

            </motion.div>



            {/* ADMIN DASHBOARD STATS STRIP */}

            <motion.div
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.1, duration:0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >

              {/* CARD 1 */}

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">

                <p className="text-sm text-gray-500">

                  Total Platform Users

                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-2">

                  1,284

                </h2>

                <p className="text-xs text-green-500 mt-2">

                  +12% this month

                </p>

              </div>



              {/* CARD 2 */}

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">

                <p className="text-sm text-gray-500">

                  Active Technicians

                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-2">

                  64

                </h2>

                <p className="text-xs text-green-500 mt-2">

                  +5 new this week

                </p>

              </div>



              {/* CARD 3 */}

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">

                <p className="text-sm text-gray-500">

                  Monthly Bookings

                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-2">

                  2,941

                </h2>

                <p className="text-xs text-indigo-500 mt-2">

                  Peak demand growing

                </p>

              </div>



              {/* CARD 4 */}

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">

                <p className="text-sm text-gray-500">

                  Revenue This Month

                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-2">

                  ₹1,24,000

                </h2>

                <p className="text-xs text-green-500 mt-2">

                  +18% growth

                </p>

              </div>

            </motion.div>



            {/* PAGE CONTENT AREA */}

            <motion.div
              initial={{ opacity:0, y:10 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.2, duration:0.3 }}
              className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8"
            >

              {/* CHILD PAGE RENDER */}

              <Outlet />

            </motion.div>



            {/* SYSTEM INFO PANEL */}

            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ delay:0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >

              <div className="bg-white rounded-xl border p-6">

                <h3 className="font-semibold text-gray-700">

                  Platform Version

                </h3>

                <p className="text-sm text-gray-500 mt-2">

                  FixBee v1.0 Production

                </p>

              </div>



              <div className="bg-white rounded-xl border p-6">

                <h3 className="font-semibold text-gray-700">

                  Database

                </h3>

                <p className="text-sm text-gray-500 mt-2">

                  Supabase Cloud Database Connected

                </p>

              </div>



              <div className="bg-white rounded-xl border p-6">

                <h3 className="font-semibold text-gray-700">

                  System Uptime

                </h3>

                <p className="text-sm text-gray-500 mt-2">

                  99.98% Reliability

                </p>

              </div>

            </motion.div>



          </div>

        </Container>

      </main>



      {/* FOOTER */}

      <div className="relative z-10">

        <Footer />

      </div>



    </div>

  )

}