import { useEffect, useState } from "react"
import { assets } from "../assets/assets.js"
import { useAppContext } from "../context/AppContext.js";
import { motion } from "motion/react";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setShowLogin, axios, setToken, setUser } = useAppContext();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if ( state === "Login" ) {
        const { data } = await axios.post("/api/v1/users/login", { email, password });

        if ( data?.success ) {
          setShowLogin(false);
          setUser(data?.user);
          setToken(data?.token);
          localStorage.setItem("token", data?.token);
          toast.success("User login successfully.");
        } else {
          toast.error(data?.message);
        }
      } else if ( state === "Sign up" ) {
        const { data } = await axios.post("/api/v1/users/register", { name, email, password });

        if ( data?.success ) {
          setShowLogin(false);
          setUser(data?.user);
          setToken(data?.token);
          localStorage.setItem("token", data?.token);
          toast.success("User register successfully.");
        } else {
          toast.error(data?.message);
        }
      }
    } catch (error) {
      console.log("Error :: While user login/register", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    }
  }, []);
  
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      
      <motion.form
        onSubmit={handleFormSubmit}
        className="relative bg-white p-10 rounded-xl text-slate-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-center text-neutral-700 font-medium text-2xl">{state}</h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>

        {state === "Sign up" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.profile_icon} alt="profile_icon" className="w-5.5 opacity-40" />
            <input 
              type="text" 
              placeholder="Full name" 
              className="outline-none text-sm" 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="profile_icon" className="w-5 opacity-70" />
          <input 
            type="email" 
            placeholder="Email id" 
            className="outline-none text-sm" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="profile_icon" className="w-3.5 opacity-70" />
          <input 
            type="password" 
            placeholder="Password" 
            className="outline-none text-sm" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <p className="inline-block text-sm text-blue-600 my-4 cursor-pointer hover:underline">
          Forgot password?
        </p>

        <button 
          className="bg-blue-600 text-white py-2.5 px-4 w-full rounded-full cursor-pointer hover:bg-blue-500 transition-all duration-100"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="mr-3 size-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              {state === "Login" ? "Login..." : "Createing..."}
            </div>
          ) : (
            state === "Login" ? "Login" : "Create Account"
          )}
        </button>

        {state === "Login" && (
          <p className="mt-5 text-center" onClick={() => (setState("Sign up"))}>
            Don't have an account?{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">Sign up</span>
          </p>
        )}

        {state === "Sign up" && (
          <p className="mt-5 text-center" onClick={() => (setState("Login"))}>
            Already have an account?{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">Login</span>
          </p>
        )}

        <img 
          src={assets.cross_icon} 
          alt="cross_icon" 
          className="absolute top-5 right-5 cursor-pointer" 
          onClick={() => (setShowLogin(false))}
        />
      </motion.form>

    </div>
  )
}

export default Login
