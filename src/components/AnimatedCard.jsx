import { motion } from "framer-motion";

export default function AnimatedCard({
  title,
  value,
  icon,
  color="blue",
  children
}) {

  const colors = {
    blue:"bg-blue-50 text-blue-600",
    green:"bg-green-50 text-green-600",
    purple:"bg-purple-50 text-purple-600",
    orange:"bg-orange-50 text-orange-600"
  }

  return (

    <motion.div
      whileHover={{scale:1.03}}
      className="bg-white rounded-xl shadow p-6 space-y-4"
    >

      <div className="flex justify-between items-center">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-2xl font-bold">
            {value}
          </h2>

        </div>

        <div className={`p-3 rounded-lg ${colors[color]}`}>

          {icon}

        </div>

      </div>

      {children}

    </motion.div>

  )

}