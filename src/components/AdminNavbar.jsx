import { NavLink } from "react-router-dom";
import { Bell, LayoutDashboard, Users, Wrench, BarChart, Settings } from "lucide-react";

export default function AdminNavbar(){

  const links = [

    {name:"Dashboard",path:"/admin",icon:<LayoutDashboard size={18}/>},

    {name:"Bookings",path:"/admin/bookings",icon:<LayoutDashboard size={18}/>},

    {name:"Customers",path:"/admin/customers",icon:<Users size={18}/>},

    {name:"Technicians",path:"/admin/technicians",icon:<Users size={18}/>},

    {name:"Services",path:"/admin/services",icon:<Wrench size={18}/>},

    {name:"Analytics",path:"/admin/analytics",icon:<BarChart size={18}/>},

    {name:"Settings",path:"/admin/settings",icon:<Settings size={18}/>}

  ]

  return(

    <div className="bg-white shadow">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-xl font-bold text-blue-600">
          FixBee Admin
        </h1>

        <div className="flex gap-6">

          {links.map(link=>(
            <NavLink
              key={link.name}
              to={link.path}
              className={({isActive})=>
                `flex items-center gap-1 text-sm
                ${isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600"}`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}

        </div>

        <Bell size={20}/>

      </div>

    </div>

  )

}