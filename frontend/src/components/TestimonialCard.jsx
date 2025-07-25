import { assets } from "../assets/assets.js";

const TestimonialCard = ({ data }) => {
  const { image, name, role, stars, text } = data;

  return (
    <div className="max-w-80 bg-white/20 p-12 flex flex-col items-center text-center gap-4 shadow-md border border-gray-200 rounded-lg hover:scale-102 transition-all duration-300 cursor-pointer">
      <img src={image} alt="image" className="rounded-full w-14" />

      <div>
        <h2 className="text-xl font-medium">{name}</h2>
        <p className="text-gray-500 text-sm font-medium">{role}</p>
      </div>

      <div className="flex items-center gap-1">
        {Array(stars).fill("").map((_, index) => (
          <img key={index} src={assets.rating_star} alt="rating_star" />
        ))}
      </div>

      <p className="text-gray-500">{text}</p>
    </div>
  );
};

export default TestimonialCard;
