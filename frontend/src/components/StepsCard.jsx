const StepsCard = ({ data }) => {
  const { title, description, icon } = data;

  return (
    <div className="flex gap-4 items-cente py-6 sm:py-10 px-8 bg-white/50 shadow-md rounded-md border border-gray-200 cursor-pointer hover:scale-102 transition-all duration-300">
      <img src={icon} alt="icon" width={40} className="w-10 sm:w-15" />

      <div className="flex flex-col justify-center items-start">
        <h2 className="text-xl sm:2xl font-medium">{title}</h2>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default StepsCard;
