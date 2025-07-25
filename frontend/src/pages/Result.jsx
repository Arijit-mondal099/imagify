import { useState } from "react";
import { assets } from "../assets/assets.js";
import { motion } from "motion/react";
import { useAppContext } from "../context/AppContext.js";
import { toast } from "react-toastify";

const Result = () => {
  const [image, setImage] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loader, setLoader] = useState(false);
  const [prompt, setPrompt] = useState("");
  const { generateImage } = useAppContext();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      if ( prompt ) {
        const image = await generateImage(prompt);
        setImage(image);
      } else {
        toast.error("Plase provide a prompt");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsImageLoaded(true);
      setLoader(false);
    }
  }

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[90vh]"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      
      {/* image render section */}
      <div className="mt-15 w-full flex flex-col justify-center items-center">
        {loader ? (
          <div className="animate-pulse w-full max-w-xs sm:max-w-sm aspect-square rounded-sm bg-gray-400" />
        ) : (
          image ? 
            <img src={image} alt="image" className="w-full max-w-xs sm:max-w-sm aspect-square object-cover rounded-sm" /> 
          : 
            <h1 className="text-2xl sm:text-4xl font-semibold text-gray-500 mb-30 text-center">How can I help you today?</h1>
        )}

        {loader && (
          <p className="text-sm font-medium text-gray-500 mt-2">Generating...</p>
        )}
      </div>

      {/* prompt input section */}
      {!isImageLoaded && (
        <form 
          onSubmit={onSubmitHandler}
          className="flex justify-between w-full max-w-xl mx-auto p-0.5 mt-15 text-sm text-white bg-zinc-500 border rounded-2xl"
        >
          <input 
            type="text" 
            placeholder="Describe what you want to generate" 
            className="flex-1 w-full outline-none ml-2 sm:ml-8 placeholder-color" 
            value={prompt}
            onChange={(e) => (setPrompt(e.target.value))}
          />

          <button 
            type="submit" 
            className="bg-zinc-900 text-white px-4 sm:px-10 py-4 rounded-2xl cursor-pointer hover:bg-zinc-800 transition-all duration-300"
          >
            Generate
          </button>
        </form>
      )}

      {/* image generation & download button */}
      {isImageLoaded && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-15 rounded-2xl">
          <button 
            type="button" 
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full hover:bg-zinc-900 hover:text-white cursor-pointer transition-all duration-300"
            onClick={() => setIsImageLoaded(false)}
          >
            Generate Another
          </button>

          <a href={image} download className="border border-zinc-900 text-white bg-zinc-900 px-8 py-3 rounded-full hover:bg-white hover:text-black cursor-pointer transition-all duration-300">Download</a>
        </div>
      )}

    </motion.div>
  );
};

export default Result;
