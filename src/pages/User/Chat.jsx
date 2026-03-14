import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { getMessages, sendMessage } from "../../services/chatService.js";
import { getCurrentUser } from "../../services/auth.js";
export default function Chat() {
  const { bookingId } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const bottomRef = useRef(null);

  /* -------------------------------
     GET CURRENT USER
  --------------------------------*/

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }

    getUser();
  }, []);

  /* -------------------------------
     FETCH MESSAGES
  --------------------------------*/

  useEffect(() => {
    if (!bookingId) return;

    fetchMessages();
    subscribeMessages();
  }, [bookingId]);

  async function fetchMessages() {
    setLoading(true);

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("booking_id", bookingId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setMessages(data);
    }

    setLoading(false);
  }

  /* -------------------------------
     REALTIME SUBSCRIPTION
  --------------------------------*/

  function subscribeMessages() {
    const channel = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `booking_id=eq.${bookingId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  /* -------------------------------
     AUTO SCROLL
  --------------------------------*/

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* -------------------------------
     SEND MESSAGE
  --------------------------------*/

  async function sendMessage(e) {
    e.preventDefault();

    if (!newMessage.trim()) return;
    if (!user) return;

    const messageData = {
      booking_id: bookingId,
      sender_id: user.id,
      sender_role: "customer",
      message: newMessage,
    };

    const { error } = await supabase
      .from("messages")
      .insert([messageData]);

    if (error) {
      console.error(error);
      return;
    }

    setNewMessage("");
  }

  /* -------------------------------
     LOADING STATE
  --------------------------------*/

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p>Loading chat...</p>
      </div>
    );
  }

  /* -------------------------------
     UI
  --------------------------------*/

  return (
    <div className="flex flex-col h-[90vh] max-w-4xl mx-auto p-6">

      {/* HEADER */}

      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <h2 className="text-xl font-bold">
          Booking Chat
        </h2>
        <p className="text-gray-500 text-sm">
          Booking ID: {bookingId}
        </p>
      </div>

      {/* MESSAGES AREA */}

      <div className="flex-1 overflow-y-auto bg-gray-50 rounded-lg p-4 space-y-3 shadow-inner">

        {messages.length === 0 && (
          <p className="text-center text-gray-400">
            No messages yet
          </p>
        )}

        {messages.map((msg) => {
          const isMine = msg.sender_id === user?.id;

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >

              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow ${
                  isMine
                    ? "bg-blue-500 text-white"
                    : "bg-white border"
                }`}
              >

                <p className="text-sm">{msg.message}</p>

                <div className="text-xs mt-1 opacity-70">
                  {msg.sender_role}
                </div>

              </div>
            </motion.div>
          );
        })}

        <div ref={bottomRef}></div>

      </div>

      {/* MESSAGE INPUT */}

      <form
        onSubmit={sendMessage}
        className="flex gap-2 mt-4"
      >

        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) =>
            setNewMessage(e.target.value)
          }
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow"
        >
          Send
        </button>

      </form>

    </div>
  );
}