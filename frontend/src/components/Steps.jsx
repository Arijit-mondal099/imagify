import { stepsData } from "../assets/assets.js";
import StepsCard from "./StepsCard.jsx";
import { motion } from "motion/react";

const Steps = () => {
  return (
    <motion.div 
      className="flex flex-col justify-center items-center mt-0"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >

      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2">How it works</h1>
        <p className="text-gray-500 mb-12">Transform Words Into Stunning Images</p>
      </div>

      <div className="space-y-4 w-full max-w-3xl text-sm">
        {stepsData.map((item) => (
          <StepsCard key={item.title} data={item} />
        ))}
      </div>

    </motion.div>
  );
};

export default Steps;
