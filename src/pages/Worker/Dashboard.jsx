import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function WorkerDashboard(){

  const [tasks,setTasks] = useState([]);
  const [stats,setStats] = useState({
    assigned:0,
    pending:0,
    completed:0
  });

  useEffect(()=>{
    loadTasks();
  },[]);


  async function loadTasks(){

    const {data:userData} = await supabase.auth.getUser();

    if(!userData?.user) return;

    const workerId = userData.user.id;

    const {data,error} = await supabase
      .from("bookings")
      .select("*")
      .eq("technician_id",workerId)
      .order("created_at",{ascending:false});

    if(error){
      console.error(error);
      return;
    }

    setTasks(data);

    calculateStats(data);
  }


  function calculateStats(data){

    const assigned = data.length;

    const pending = data.filter(b=>b.status==="assigned").length;

    const completed = data.filter(b=>b.status==="completed").length;

    setStats({assigned,pending,completed});
  }


  return(

    <div className="space-y-8">

      <h1 className="text-2xl font-bold">
        Technician Dashboard
      </h1>


      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6">

        <StatCard title="Total Jobs" value={stats.assigned}/>
        <StatCard title="Pending" value={stats.pending}/>
        <StatCard title="Completed" value={stats.completed}/>

      </div>


      {/* TASK LIST */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="font-semibold mb-4">
          Assigned Jobs
        </h2>

        <div className="space-y-3">

          {tasks.slice(0,5).map(task=>(
            <div
              key={task.id}
              className="flex justify-between border p-4 rounded"
            >

              <div>

                <p className="font-medium">
                  {task.service}
                </p>

                <p className="text-sm text-gray-500">
                  {task.service_date}
                </p>

              </div>

              <span className="text-xs bg-blue-100 px-2 py-1 rounded">

                {task.status}

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