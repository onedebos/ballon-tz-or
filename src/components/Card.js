const Card = ({ playerName, onClick }) => {
  return (
    <div className="bg-gray-800 py-10 w-1/2 rounded-md">
      <p className="text-center text-xl">{playerName}</p>
      <div className="flex justify-center items-center">
        <button
          onClick={onClick}
          class="bg-violet-500 hover:bg-violet-600 px-5 py-1 rounded-full text-sm mt-3"
        >
          Vote Now
        </button>
      </div>
    </div>
  );
};

export default Card;
