import { toast } from "react-toastify";
import { plans, assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.js";
import { motion } from "motion/react";

const BuyCredit = () => {
  const { user, axios, loadCreditData, token, setShowLogin, navigate } = useAppContext();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      // razorpay payment validation handler
      handler: async (response) => {
        try {
          const { data } = await axios.post("/api/v1/payments/verify-razor", 
            response,
            { headers: { Authorization: `${token}` } }
          );

          if ( data?.success ) {
            loadCreditData();
            navigate("/");
            toast.success("Credite Added Successfully.");
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    }

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  const paymentRazorpay = async (planId) => {
    try {
      if ( !user ) {
        setShowLogin(true);
      }

      const { data } = await axios.post("/api/v1/payments/pay-razor", 
        { planId },
        { headers: { Authorization: `${token}` } }
      );
      
      if ( data?.success ) {
        initPay(data?.order);
      }
    } catch (error) {
      console.log("Error :: paymentRazorpay", error);
      toast.error(error.message);
    }
  }

  return (
    <motion.div 
      className="flex flex-col items-center justify-center text-center min-h-[80vh]"
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.button
        type="button"
        className="uppercase border border-gray-300 text-sm text-gray-500 font-medium px-8 py-2 rounded-full mt-15"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        Our Plans
      </motion.button>

      <motion.h1 
        className="text-3xl sm:text-4xl font-medium mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Choose the plan
      </motion.h1>

      <motion.div 
        className="flex justify-center flex-wrap gap-6 mt-15 text-left w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {plans.map((plan) => (

          // plan cards ---------
          <motion.div 
            key={plan.id} 
            className="bg-white drop-shadow-sm border border-gray-300 rounded-lg py-16 px-8 text-gray-600 min-w-[20rem]"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <img src={assets.logo_icon} alt="logo_icon" className="w-10 mb-4" />

            <p className="text-lg font-semibold mt-3 mb-1">{plan.id}</p>
            <p className="text-sm">{plan.desc}</p>
            <p className="mt-6">
              <span className="text-4xl font-semibold">${plan.price} </span>
              <span className="text-base font-medium">/{plan.credits} credits</span>
            </p>

            <motion.button
              onClick={() => (paymentRazorpay(plan.id))}
              className="w-full bg-gray-800 text-white font-medium rounded-md px-4 py-2.5 mt-6 cursor-pointer"
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {user ? "Purchase Now" :  "Get Started"}
            </motion.button>
          </motion.div>

        ))}
      </motion.div>
    </motion.div>
  );
};

export default BuyCredit;
