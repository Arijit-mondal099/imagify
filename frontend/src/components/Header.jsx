import { assets } from "../assets/assets.js";
import { motion } from "motion/react";
import { useAppContext } from "../context/AppContext.js";

const Header = () => {
  const { user, setShowLogin, navigate } = useAppContext();

  const handelClick = () => {
    if ( user ) navigate("/result");
    else setShowLogin(true);
  }

  return (
    <motion.div 
      className="flex flex-col items-center text-center mx-auto mt-15 sm:mt-25 min-h-[90vh]"
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1 }}
      animate={{ opacity: 1, y: 0 }}
    >

      <motion.div 
        className="flex items-center gap-2 border rounded-full text-stone-500 text-center px-6 py-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <p className="text-sm font-medium">Best text to image generator</p>
        <img src={assets.star_icon} alt="star_icon" />
      </motion.div>

      <motion.h1 
        className="max-w-[300px] sm:max-w-[590px] mx-auto mt-10 text-4xl sm:text-7xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Turn text to <br/> 
        <span className="text-blue-600">image</span>
        , in seconds.
      </motion.h1>

      <motion.p 
        className="max-w-xl mx-auto mt-5 text-stone-500 font-medium"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Unleash your creativity with AI. Trun your imagination into visual art in seconds - just type, and watch the magic happen.
      </motion.p>

      <motion.button 
        className="flex items-center gap-2 bg-black text-white font-medium mt-10 px-10 py-4 rounded-full cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ default: { duration: 0.2 }, opacity: { delay: 0.8, duration: 1 } }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handelClick}
      >
        Generate Images
        <img src={assets.star_group} alt="star_group" className="w-6" />
      </motion.button>

      <motion.div 
        className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-16"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1.2 }}
      >
        {Array(6).fill("").map((_, index) => (
          <motion.img 
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2} 
            className="w-12 sm:w-20 rounded-md"
            key={index} 
            alt="image"
          />
        ))}
      </motion.div>

      <motion.p 
        className="text-stone-500 mt-2.5"
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1.4 }}
      >
        Generated images from imagify
      </motion.p>
      
    </motion.div>
  );
};

export default Header;
