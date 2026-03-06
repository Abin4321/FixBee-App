import { motion } from "framer-motion";

export default function AdminAnalytics() {
  return (
    <div>
      <h1 className="text-2xl mb-6">Analytics</h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/5 border border-white/10 p-6 rounded-xl"
      >
        Analytics charts will appear here.
      </motion.div>
    </div>
  );
}