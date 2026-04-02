import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";

export default function Analytics()
{
  
  const [bookings,setBookings] = useState([]);
  const [chartData,setChartData] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    loadAnalytics()

  },[])


  async function loadAnalytics(){

    const { data:bookings } = await supabase
      .from("bookings")
      .select("*")

    if(!bookings) return;

    if(error){
      console.error(error);
      return;
    }


    setBookings(data);

    prepareChart(data);

    setLoading(false);


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
  }

 return(    

  <div className="space-y-10">
  
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
    </div>
    
    
    );

}