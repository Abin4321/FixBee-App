import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { motion, AnimatePresence } from "framer-motion";

import { FiMenu, FiX, FiLogOut } from "react-icons/fi";

export default function Navbar() {

  const navigate = useNavigate();

  const [user,setUser] = useState(null);
  const [role,setRole] = useState(null);
  const [menuOpen,setMenuOpen] = useState(false);


  /* ---------------------------
     GET USER
  --------------------------- */

  useEffect(()=>{

    loadUser();

  },[]);


  async function loadUser(){

    const {data:userData} = await supabase.auth.getUser();

    if(!userData?.user) return;

    setUser(userData.user);

    const {data:profile} = await supabase
      .from("profiles")
      .select("role")
      .eq("id",userData.user.id)
      .single();

    setRole(profile?.role || "customer");

  }


  /* ---------------------------
     LOGOUT
  --------------------------- */

  async function handleLogout(){

    await supabase.auth.signOut();

    navigate("/login");

  }


  /* ---------------------------
     ROLE TABS
  --------------------------- */

  const customerTabs = [

    {name:"Dashboard",path:"/user/dashboard"},
    {name:"Book Service",path:"/user/book-service"},
    {name:"My Bookings",path:"/user/mybookings"},
    {name:"Services",path:"/user/services"}

  ];

  const workerTabs = [

    {name:"Dashboard",path:"/worker/dashboard"},
    {name:"Tasks",path:"/worker/tasks"},
    {name:"Chat",path:"/worker/chat"},
    {name:"Profile",path:"/worker/profile"}

  ];

  const adminTabs = [

    {name:"Dashboard",path:"/admin/dashboard"},
    {name:"Bookings",path:"/admin/bookings"},
    {name:"Customers",path:"/admin/customers"},
    {name:"Technicians",path:"/admin/technicians"},
    {name:"Services",path:"/admin/services"},
    {name:"Analytics",path:"/admin/analytics"}

  ];

  const tabs =
    role==="admin"
      ? adminTabs
      : role==="technician"
      ? workerTabs
      : customerTabs;


  /* ---------------------------
     DASHBOARD LINK
  --------------------------- */

  function getDashboardLink(){

    if(role==="admin") return "/admin/dashboard";

    if(role==="technician") return "/worker/dashboard";

    return "/user/dashboard";

  }


  /* ---------------------------
     USER NAME DISPLAY
  --------------------------- */

  function getUserText(){

    if(role==="admin") return "Admin";

    if(role==="technician") return "Technician";

    return "Customer";

  }


  return (

    <nav className="bg-white shadow-md border-b sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">


        {/* LEFT SIDE */}

        <Link
          to={getDashboardLink()}
          className="flex items-center gap-2 font-bold text-lg"
        >

          <img
            src="/logo.png"
            alt="Fixbee"
            className="w-10 h-10"
          />

          FIXBEE

        </Link>


        {/* DESKTOP NAV */}

        <div className="hidden md:flex items-center gap-6">

          {tabs.map(tab=>(
            <motion.div
              key={tab.path}
              whileHover={{scale:1.05}}
            >

              <Link
                to={tab.path}
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >

                {tab.name}

              </Link>

            </motion.div>
          ))}

        </div>


        {/* RIGHT SIDE */}

        <div className="flex items-center gap-4">

  {/* HI USER (VISIBLE BOTH DESKTOP + MOBILE) */}

  <span className="text-gray-600 text-sm md:text-base">

    Hi {getUserText()}

  </span>


  {/* DESKTOP LOGOUT */}

  <button
    onClick={handleLogout}
    className="hidden md:flex items-center gap-2 text-red-600 hover:text-red-700"
  >

    <FiLogOut />

    Logout

  </button>


  {/* MOBILE LOGOUT ICON */}

  <button
    onClick={handleLogout}
    className="md:hidden text-red-600 text-xl"
  >

    <FiLogOut />

  </button>


  {/* HAMBURGER */}

  <button
    onClick={()=>setMenuOpen(true)}
    className="md:hidden text-2xl"
  >

    <FiMenu />

  </button>

</div>

      </div>


      {/* MOBILE MENU */}

      <AnimatePresence>

        {menuOpen && (

          <motion.div
            initial={{x:"100%"}}
            animate={{x:0}}
            exit={{x:"100%"}}
            transition={{duration:0.3}}
            className="fixed top-0 right-0 w-full h-full bg-white z-50 p-6 flex flex-col"
          >


            {/* HEADER */}

            <div className="flex justify-between items-center mb-8">

              <button
                onClick={()=>setMenuOpen(false)}
                className="text-2xl"
              >

                <FiX />

              </button>

            </div>


            {/* MENU ITEMS */}

            <div className="flex flex-col gap-4">

              {tabs.map(tab=>(
                <Link
                  key={tab.path}
                  to={tab.path}
                  onClick={()=>setMenuOpen(false)}
                  className="border p-4 rounded-lg hover:bg-gray-100 transition"
                >

                  {tab.name}

                </Link>
              ))}

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </nav>

  );

}