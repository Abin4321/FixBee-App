import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function UserDashboard(){

  const [stats,setStats] = useState({
    total:0,
    pending:0,
    completed:0,
    paid:0
  });

  const [bookings,setBookings] = useState([]);
  const [chartData,setChartData] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    loadDashboard();
  },[]);


  async function loadDashboard(){

    const {data:userData} = await supabase.auth.getUser();

    if(!userData?.user) return;

    const userId = userData.user.id;

    const {data,error} = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id",userId)
      .order("created_at",{ascending:false});

    if(error){
      console.error(error);
      return;
    }

    setBookings(data);

    calculateStats(data);
    prepareChart(data);

    setLoading(false);
  }


  function calculateStats(data){

    const total = data.length;
    const pending = data.filter(b=>b.status==="pending").length;
    const completed = data.filter(b=>b.status==="completed").length;
    const paid = data.filter(b=>b.paid===true).length;

    setStats({total,pending,completed,paid});
  }


  function prepareChart(data){

    const grouped={};

    data.forEach(b=>{

      const date = b.service_date;

      if(!grouped[date]){
        grouped[date]=0;
      }

      grouped[date]++;

    });

    const formatted = Object.keys(grouped).map(date=>({
      date,
      bookings:grouped[date]
    }));

    setChartData(formatted);
  }


  if(loading){
    return <div className="p-8">Loading dashboard...</div>
  }


  return(

    <div className="space-y-8">

      <h1 className="text-2xl font-bold">
        Customer Dashboard
      </h1>


      {/* STATS */}

      <div className="grid md:grid-cols-4 gap-6">

        <StatCard title="Total Bookings" value={stats.total}/>
        <StatCard title="Pending" value={stats.pending}/>
        <StatCard title="Completed" value={stats.completed}/>
        <StatCard title="Paid" value={stats.paid}/>

      </div>


      {/* CHART */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="font-semibold mb-4">
          Booking Activity
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="date"/>

            <YAxis/>

            <Tooltip/>

            <Line
              type="monotone"
              dataKey="bookings"
              stroke="#6366f1"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>


      {/* RECENT BOOKINGS */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="font-semibold mb-4">
          Recent Bookings
        </h2>

        <div className="space-y-3">

          {bookings.slice(0,5).map(b=>(
            <div
              key={b.id}
              className="flex justify-between border p-4 rounded"
            >

              <div>
                <p className="font-medium">
                  {b.service}
                </p>

                <p className="text-sm text-gray-500">
                  {b.service_date}
                </p>
              </div>

              <div className="text-right">

                <p className="font-semibold">
                  ₹{b.price}
                </p>

                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {b.status}
                </span>

              </div>

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