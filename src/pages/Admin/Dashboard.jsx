import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function AdminDashboard(){

  const [stats,setStats] = useState({
    users:0,
    technicians:0,
    bookings:0,
    services:0
  });

  const [recentBookings,setRecentBookings] = useState([]);


  useEffect(()=>{
    loadDashboard();
  },[]);


  async function loadDashboard(){

    const {count:users} = await supabase
      .from("profiles")
      .select("*",{count:"exact",head:true})
      .eq("role","customer");

    const {count:technicians} = await supabase
      .from("profiles")
      .select("*",{count:"exact",head:true})
      .eq("role","technician");

    const {count:bookings} = await supabase
      .from("bookings")
      .select("*",{count:"exact",head:true});

    const {count:services} = await supabase
      .from("services")
      .select("*",{count:"exact",head:true});


    setStats({
      users,
      technicians,
      bookings,
      services
    });


    const {data} = await supabase
      .from("bookings")
      .select("*")
      .order("created_at",{ascending:false})
      .limit(5);

    setRecentBookings(data || []);
  }


  return(

    <div className="space-y-8">

      <h1 className="text-2xl font-bold">
        Admin Dashboard
      </h1>


      {/* STATS */}

      <div className="grid md:grid-cols-4 gap-6">

        <StatCard title="Customers" value={stats.users}/>
        <StatCard title="Technicians" value={stats.technicians}/>
        <StatCard title="Bookings" value={stats.bookings}/>
        <StatCard title="Services" value={stats.services}/>

      </div>


      {/* RECENT BOOKINGS */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="font-semibold mb-4">
          Recent Bookings
        </h2>

        <div className="space-y-3">

          {recentBookings.map(b=>(
            <div
              key={b.id}
              className="flex justify-between border p-4 rounded"
            >

              <div>

                <p className="font-medium">
                  {b.service}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(b.created_at).toLocaleDateString()}
                </p>

              </div>

              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {b.status}
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>

  );

}



function StatCard({title,value}){

  return(

    <div className="bg-white p-6 rounded-xl shadow">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="text-2xl font-bold">
        {value}
      </h2>

    </div>

  );
}