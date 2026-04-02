import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound(){
    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
            <div className="max-w-3xl w-full text-center space-y-10">

                {/* ANIMATED 404 */}
                <motion.div
                initial={{opacity:0,y:-40}}
                animate={{opacity:1,y:0}}
                transition={{duration:0.6}}
                className="text-8xl font-extrabold text-indigo-600"
                >
                    404
                </motion.div>
        
                {/* MESSAGE */}
                <motion.div
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{delay:0.3}}
                className="space-y-4"
                >
                    <h1 className="text-3xl font-bold text-gray-800">
                        Oops! Page Not Found
                    </h1>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        The page you’re looking for doesn’t exist or may have been moved. Let’s help you get back to the right place.
                    </p>
                </motion.div>

                {/* ACTION BUTTONS */}
                <motion.div
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{delay:0.6}}
                className="flex flex-wrap justify-center gap-4"
                >
                    <Link to="/login" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
                         Go to Home Page
                    </Link>
                </motion.div>

                {/* HELP CARDS */}
                <div className="grid md:grid-cols-1 gap-6 pt-10">
                    <motion.div
                    whileHover={{scale:1.05}}
                    className="bg-white p-6 rounded-xl shadow-sm border"
                    >
                        <h3 className="font-semibold mb-2">
                            Need Help?
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Contact support if you think this is a mistake.
                        </p>
                        <Link to="/chat" className="text-indigo-600 text-sm font-medium">
                            Contact Support →
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}