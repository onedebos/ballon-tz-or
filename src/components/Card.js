const Card = ({ playerName, onClick, votes }) => {
  return (
    <div className="bg-gray-800 hover:bg-gray-700 ease-in-out duration-200 py-10 w-1/2 rounded-md">
      <p className="text-center text-xl font-semibold">{playerName}</p>

      <div className="flex justify-center mt-2">
        <div
          onClick={onClick}
          className="cursor-pointer bg-violet-500 hover:bg-violet-600 px-5 py-1 rounded-full shadow-md text-sm mt-3 flex items-center justify-center"
        >
          <div className="mr-1">Vote</div>
          <div className="rounded-full bg-purple-500 w-5 h-5 text-center text-sm">
            {votes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
