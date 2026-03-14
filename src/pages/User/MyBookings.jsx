import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { getUserBookings } from "../../services/bookingService.js";
import { getCurrentUser } from "../../services/auth.js";
import { Search, Wrench, Calendar, Clock, MapPin, IndianRupee, MessageCircle } from "lucide-react";

export default function MyBookings() {

  const navigate = useNavigate();

  const [user,setUser] = useState(null);
  const [bookings,setBookings] = useState([]);
  const [filtered,setFiltered] = useState([]);
  const [loading,setLoading] = useState(true);

  const [statusFilter,setStatusFilter] = useState("all");
  const [search,setSearch] = useState("");

  const [selectedBooking,setSelectedBooking] = useState(null);

  /* --------------------------
     GET USER
  ---------------------------*/

  useEffect(()=>{
    getUser();
  },[])

  async function getUser(){

    const {data} = await supabase.auth.getUser();

    if(data.user){
      setUser(data.user);
      fetchBookings(data.user.id);
    }

  }

  /* --------------------------
     FETCH BOOKINGS
  ---------------------------*/

  async function fetchBookings(userId){

    const {data,error} = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id",userId)
    .order("created_at",{ascending:false})

    if(error){
      console.log(error)
      return
    }

    setBookings(data);
    setFiltered(data);

    setLoading(false)

  }

  /* --------------------------
     FILTER LOGIC
  ---------------------------*/

  useEffect(()=>{

    let result = bookings;

    if(statusFilter !== "all"){
      result = result.filter(
        b => b.status === statusFilter
      )
    }

    if(search){
      result = result.filter(
        b => b.service
        ?.toLowerCase()
        .includes(search.toLowerCase())
      )
    }

    setFiltered(result)

  },[statusFilter,search,bookings])

  /* --------------------------
     STATUS BADGE
  ---------------------------*/

  function StatusBadge({status}){

    const colors = {
      pending:"bg-yellow-100 text-yellow-700",
      completed:"bg-green-100 text-green-700",
      cancelled:"bg-red-100 text-red-700"
    }

    return(
      <span className={`text-xs px-3 py-1 rounded-full font-medium ${colors[status]}`}>
        {status}
      </span>
    )
  }

  /* --------------------------
     LOADING STATE
  ---------------------------*/

  if(loading){
    return(
      <div className="p-10 text-center text-gray-500">
        Loading bookings...
      </div>
    )
  }

  return (

    <div className="p-8 space-y-8">

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            My Bookings
          </h1>
          <p className="text-gray-500">
            Manage your service appointments
          </p>
        </div>

      </div>

      {/* SEARCH + FILTER */}

      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex items-center border rounded-lg px-4 py-2 flex-1">

          <Search size={18}/>

          <input
            type="text"
            placeholder="Search services..."
            className="ml-2 outline-none w-full"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>

        <div className="flex gap-2">

          {["all","pending","completed","cancelled"].map((status)=>(
            <button
              key={status}
              onClick={()=>setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm capitalize
                ${statusFilter===status
                ? "bg-blue-500 text-white"
                : "bg-gray-100"}
              `}
            >
              {status}
            </button>
          ))}

        </div>

      </div>

      {/* BOOKINGS GRID */}

      {filtered.length === 0 && (

        <div className="text-center py-20">

          <p className="text-gray-400 text-lg">
            No bookings found
          </p>

        </div>

      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filtered.map((booking)=>{

          return(

            <motion.div
              key={booking.id}
              whileHover={{scale:1.03}}
              className="bg-white p-6 rounded-xl shadow space-y-4"
            >

              {/* SERVICE */}

              <div className="flex justify-between items-center">

                <h3 className="font-semibold text-lg">
                  {booking.service}
                </h3>

                <StatusBadge status={booking.status}/>

              </div>

              {/* DATE */}

              <div className="flex items-center text-gray-500 text-sm gap-2">

                <Calendar size={16}/>
                {booking.service_date}

              </div>

              {/* TIME */}

              <div className="flex items-center text-gray-500 text-sm gap-2">

                <Clock size={16}/>
                {booking.service_time}

              </div>

              {/* LOCATION */}

              <div className="flex items-center text-gray-500 text-sm gap-2">

                <MapPin size={16}/>
                {booking.address}

              </div>

              {/* PRICE */}

              <div className="flex items-center text-gray-700 gap-2">

                <IndianRupee size={18}/>

                <span className="font-semibold">
                  {booking.price}
                </span>

                {booking.paid && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    Paid
                  </span>
                )}

              </div>

              {/* ACTIONS */}

              <div className="flex justify-between items-center pt-2">

                <button
                  onClick={()=>setSelectedBooking(booking)}
                  className="text-blue-500 text-sm"
                >
                  View Details
                </button>

                <button
                  onClick={()=>navigate(`/user/chat/${booking.id}`)}
                  className="flex items-center gap-1 text-sm bg-blue-500 text-white px-3 py-1 rounded-lg"
                >
                  <MessageCircle size={14}/>
                  Chat
                </button>

              </div>

            </motion.div>

          )

        })}

      </div>

      {/* DETAILS MODAL */}

      {selectedBooking && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-8 rounded-xl w-[400px] space-y-4">

            <h2 className="text-xl font-semibold">
              Booking Details
            </h2>

            <p><b>Service:</b> {selectedBooking.service}</p>

            <p><b>Date:</b> {selectedBooking.service_date}</p>

            <p><b>Time:</b> {selectedBooking.service_time}</p>

            <p><b>Address:</b> {selectedBooking.address}</p>

            <p><b>Notes:</b> {selectedBooking.notes || "None"}</p>

            <p><b>Price:</b> ₹{selectedBooking.price}</p>

            <button
              onClick={()=>setSelectedBooking(null)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  )

}