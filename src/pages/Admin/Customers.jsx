import { motion } from "framer-motion";

export default function AdminCustomers() {
  return (
    <div>
      <h1 className="text-2xl mb-6">Customers</h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/5 border border-white/10 p-6 rounded-xl"
      >
        Customer data will appear here.
      </motion.div>
    </div>
  );
}