import { motion } from "motion/react";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.js";

const GenerateButton = () => {
  const { user, setShowLogin, navigate } = useAppContext();
  
  const handelClick = () => {
    if ( user ) navigate("/result");
    else setShowLogin(true);
  }

  return (
    <motion.div 
      className="flex flex-col items-center justify-center text-center pb-20"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-3xl font-semibold mb-2">See the magic. Try now</h1>

      <motion.button 
        className="flex items-center gap-2 bg-black text-white font-medium mt-10 px-10 py-4 rounded-full cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handelClick}
      >
        Generate Images
        <img src={assets.star_group} alt="star_group" className="w-6" />
      </motion.button>
    </motion.div>
  );
};

export default GenerateButton;
