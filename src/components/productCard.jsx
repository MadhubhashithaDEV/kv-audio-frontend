export default function ProductCard({ item }) {
  return (
    <div className=" bg-white hover:bg-gray-50 shadow-2xl rounded-2xl p-5 w-[300px] flex flex-col items-center gap-6 transform transition-all duration-500 hover:-translate-y-3 hover:scale-105 m-5">
      <div className="relative w-full">
        <div className="absolute top-4 right-4 z-10">
          {item.avilability ? (
            <span className="bg-green-100 text-green-600 text-sm font-medium px-4 py-2 rounded-full shadow-lg">
              In Stock
            </span>
          ) : (
            <span className="bg-red-100 text-red-600 text-sm font-medium px-4 py-2 rounded-full shadow-lg">
              Out of Stock
            </span>
          )}
        </div>
        <div className="overflow-hidden rounded-xl">
          <img 
            src={item.image[0]} 
            alt={item.name} 
            className="w-full h-64 object-cover rounded-xl shadow-md group-hover:shadow-xl transition-all duration-500 group-hover:scale-110"
          />
        </div>
      </div>
      
      <div className="space-y-4 w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center line-clamp-1 hover:text-yellow-600 transition-colors duration-300">
          {item.name}
        </h2>
        
        <p className="text-gray-600 text-base text-center line-clamp-2 px-2">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between w-full px-2 py-3 bg-gray-50 rounded-xl">
          <span className="text-yellow-500 font-bold text-3xl">
            Rs.{item.price.toLocaleString()}
          </span>
          <span className="text-gray-500 text-sm bg-white px-3 py-1 rounded-lg shadow-sm">
            {item.dimentions}
          </span>
        </div>

        <button 
          className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${
            item.avilability 
              ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-xl hover:shadow-yellow-200/50 hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!item.avilability}
        >
          {item.avilability ? (
            <div className="flex items-center justify-center gap-3">
              <span>View Details</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          ) : 'Unavailable'}
        </button>
      </div>
    </div>
  );
}