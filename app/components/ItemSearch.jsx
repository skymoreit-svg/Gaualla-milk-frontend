import { IoClose } from "react-icons/io5";

const ItemSearch = ({setSearchToogle}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="w-[90%] md:w-[50%] lg:w-[40%] bg-background p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-text">Search Products</h2>
          <button onClick={()=>setSearchToogle(false)}>
            <IoClose className="text-2xl text-gray-700 hover:text-text" />
          </button>
        </div>
        <input
          type="text"
          placeholder="Search for a product..."
          className="w-full px-4 py-2 border border-highlight rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4845A] focus:border-transparent text-text"
        />
      </div>
    </div>
  );
};

export default ItemSearch;
