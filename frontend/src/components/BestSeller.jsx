import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import BestSellerSkeleton from "./BestSellerSkeleton";

const BestSeller = () => {
  const { products, loading, currentPage, setCurrentPage, totalPages } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSeller(bestProduct.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="py-8 text-3xl text-center">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs text-gray-600 sm:text-sm md:text-base">
          Our best sellers are a curated selection of top-rated items that have
          won over shoppers with their quality, style, and value.
        </p>
      </div>
      {loading ? (
        <BestSellerSkeleton count={5} />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6">
            {bestSeller.map((item, index) => (
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

export default BestSeller;
