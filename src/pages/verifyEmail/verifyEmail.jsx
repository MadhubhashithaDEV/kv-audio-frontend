import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Mail, CheckCircle, ArrowLeft } from "lucide-react"

export default function VerifyEmail() {
    const token = localStorage.getItem("token")
    const [otp, setOtp] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [resendLoading, setResendLoading] = useState(false)
    const [countdown, setCountdown] = useState(0)
    const navigate = useNavigate()

    const sendOTP = () => {
        setResendLoading(true)
        axios.get("http://localhost:3000/api/users/sendOTP", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            toast.success("OTP sent to your email")
            setCountdown(60) // Start 60 second countdown
        }).catch((err) => {
            console.error(err)
            toast.error("Failed to send OTP")
        }).finally(() => {
            setResendLoading(false)
        })
    }

    useEffect(() => {
        sendOTP()
        
        // Countdown timer
        let interval
        if (countdown > 0) {
            interval = setInterval(() => {
                setCountdown(prev => prev - 1)
            }, 1000)
        }
        
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        let interval
        if (countdown > 0) {
            interval = setInterval(() => {
                setCountdown(prev => prev - 1)
            }, 1000)
        }
        
        return () => clearInterval(interval)
    }, [countdown])

    function handleVerifyEmail() {
        if (!otp) {
            toast.error("Please enter OTP")
            return
        }
        
        setIsLoading(true)
        axios.post("http://localhost:3000/api/users/verifyEmail", {
            code: parseInt(otp)
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            toast.success("Email Verified Successfully")
            navigate("/")
        }).catch((err) => {
            console.error(err)
            toast.error("Invalid OTP. Please try again.")
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: 0.6,
                when: "beforeChildren",
                staggerChildren: 0.12
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
    }

    return (
        <div className="min-h-screen w-full flex justify-center items-center p-4 relative overflow-hidden" 
             style={{
                backgroundImage: "url('/images/audio-background.jpg')", 
                backgroundSize: "cover",
                backgroundPosition: "center"
             }}>
            {/* Dark overlay for better readability */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-indigo-600/10 backdrop-blur-3xl"
                        style={{
                            width: `${Math.random() * 300 + 100}px`,
                            height: `${Math.random() * 300 + 100}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            x: [0, Math.random() * 50 - 25],
                            y: [0, Math.random() * 50 - 25],
                        }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: Math.random() * 10 + 10,
                        }}
                    />
                ))}
            </div>

            <motion.div 
                className="w-full max-w-md z-10"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div 
                    className="bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-indigo-500/20"
                    variants={itemVariants}
                >
                    <div className="p-8">
                        <motion.div 
                            className="flex justify-center mb-8"
                            variants={itemVariants}
                        >
                            <div className="relative">
                                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-70 blur-md"></div>
                                <div className="relative h-20 w-20 flex items-center justify-center bg-indigo-600 rounded-full">
                                    <Mail className="h-10 w-10 text-white" />
                                </div>
                            </div>
                        </motion.div>
                        
                        <motion.h2 
                            className="text-3xl font-bold text-center text-white mb-2"
                            variants={itemVariants}
                        >
                            Verify Your Email
                        </motion.h2>
                        
                        <motion.p 
                            className="text-center text-indigo-200/70 mb-8"
                            variants={itemVariants}
                        >
                            We've sent a verification code to your email address. Please enter it below.
                        </motion.p>
                        
                        <motion.div 
                            className="space-y-6"
                            variants={itemVariants}
                        >
                            <div className="space-y-5">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Enter verification code"
                                        className="w-full bg-gray-800/50 border border-indigo-500/30 rounded-lg py-4 px-4 text-center text-white text-xl tracking-widest placeholder:text-indigo-200/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-300"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                                        maxLength={6}
                                    />
                                </div>
                                
                                <motion.button
                                    onClick={handleVerifyEmail}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 disabled:opacity-70 relative overflow-hidden group"
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                                    {isLoading ? (
                                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <CheckCircle className="h-5 w-5" />
                                            <span>Verify Email</span>
                                        </>
                                    )}
                                </motion.button>
                                
                                <div className="relative flex items-center justify-center my-6">
                                    <div className="border-t border-indigo-500/20 absolute "></div>
                                    <span className="bg-transparent px-3 text-indigo-200/60 text-sm relative">Didn't receive the code?</span>
                                </div>
                                
                                <motion.button
                                    onClick={sendOTP}
                                    disabled={countdown > 0 || resendLoading}
                                    className="w-full bg-gray-800/50 border border-indigo-500/30 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-700/50 transition-all duration-300 disabled:opacity-50 relative overflow-hidden"
                                    whileHover={countdown > 0 ? {} : { scale: 1.02 }}
                                    whileTap={countdown > 0 ? {} : { scale: 0.98 }}
                                >
                                    {resendLoading ? (
                                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                    ) : null}
                                    {countdown > 0 ? `Resend code in ${countdown}s` : "Resend verification code"}
                                </motion.button>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            className="mt-8 text-center"
                            variants={itemVariants}
                        >
                            <motion.a 
                                href="/login" 
                                className="text-indigo-400 font-medium hover:text-white inline-flex items-center gap-1 transition-colors duration-300"
                                whileHover={{ scale: 1.05 }}
                            >
                                <ArrowLeft className="inline h-4 w-4" /> Back to login
                            </motion.a>
                        </motion.div>
                    </div>
                </motion.div>
                
                <motion.div 
                    className="text-center mt-6 text-white/70 text-sm"
                    variants={itemVariants}
                >
                    © {new Date().getFullYear()} KV Audio. All rights reserved.
                </motion.div>
            </motion.div>
        </div>
    )
}
