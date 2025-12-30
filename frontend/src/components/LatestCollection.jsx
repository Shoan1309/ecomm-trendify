import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import BestSellerSkeleton from "./BestSellerSkeleton";

const LatestCollection = () => {
  const { products, loading, currentPage, setCurrentPage, totalPages } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="py-8 text-3xl text-center">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs text-gray-600 sm:text-sm md:text-base">
          Step into a world of style with our newest collections, carefully
          curated to bring you the best in fashion, home decor, and more.
        </p>
      </div>

      {/* Rendering Product Items */}
      {loading ? (
        <BestSellerSkeleton count={10} />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6">
            {latestProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Previous
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded ${
                      currentPage === page
                        ? "bg-black text-white"
                        : "border border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LatestCollection;
