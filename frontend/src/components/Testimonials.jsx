import { testimonialsData } from "../assets/assets.js";
import TestimonialCard from "./TestimonialCard.jsx";
import { motion } from "motion/react";

const Testimonials = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center my-24 py-12"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >

      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-2">Customer testimonials</h1>
        <p className="text-gray-500 mb-12">What Our Users Are Saying</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {testimonialsData.map((item, index) => (
          <TestimonialCard key={index} data={item} />
        ))}
      </div>

    </motion.div>
  );
};

export default Testimonials;
